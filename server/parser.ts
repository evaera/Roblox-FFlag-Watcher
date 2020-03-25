import memoize from "fast-memoize"
import fetch from "node-fetch"
import * as config from "./config.json"
import { database } from "./db"

interface Flags {
  [index: string]: string
}

export const allSeries = config.series

export enum HistoryEventType {
  Created = "Created",
  Removed = "Removed",
  Changed = "Changed",
  TrackingBegan = "Tracking Began",
}

export interface Flag {
  flag: string
  series: string
  currentValue?: string
}

export interface HistoryEvent {
  time: number
  type: HistoryEventType
  flag: string
  series: string
  value?: string
}

const getFirstEvent = memoize(
  async (): Promise<HistoryEvent | null> =>
    (await database)
      .collection("history")
      .find()
      .limit(1)
      .sort({ time: 1 })
      .next()
)

export function parseAllFlags() {
  return Promise.all(config.series.map(series => parseFlags(series)))
}

// export async function migrateFlags() {
//   const db = await database
//   return Promise.all(
//     Object.entries(config.legacyMigrationTargets).map(
//       async ([before, after]) => {
//         await db
//           .collection("history")
//           .updateMany({ series: before }, { $set: { series: after } })
//         await db
//           .collection("flags")
//           .updateMany({ series: before }, { $set: { series: after } })
//       }
//     )
//   )
// }

export async function migrateFlags() {
  const db = await database
  const cursor = db.collection("flags").find()

  while (await cursor.hasNext()) {
    const row = await cursor.next()

    console.log(`Migrating ${row.series}/${row.flag}`)
    const values = db
      .collection("history")
      .find({ flag: row.flag, series: row.series })
      .limit(1)
      .sort({ time: -1 })

    if (await values.hasNext()) {
      console.log("Writing back change")
      await db
        .collection("flags")
        .update({ _id: row._id }, { lastUpdated: (await values.next()).time })
    }
  }
}

export async function parseFlags(series: string) {
  const request = await fetch(config.endpoint + series)

  const data = await request.json()

  const flags = data.applicationSettings as Flags

  if (!flags) {
    throw new Error("applicationSettings is undefined")
  }

  const db = await database

  const removeCursor = await db
    .collection("flags")
    .find({ currentValue: { $exists: true }, series })

  // Remove no longer existing flags from the database
  while (await removeCursor.hasNext()) {
    const flag = await removeCursor.next()
    if (!(flag.flag in flags)) {
      await db.collection("history").insertOne({
        series,
        flag: flag.flag,
        time: Date.now(),
        type: HistoryEventType.Removed,
      })

      await db.collection("flags").updateOne(
        { series, flag: flag.flag },
        {
          $unset: {
            currentValue: "",
          },
          $set: {
            lastUpdated: Date.now(),
          },
        }
      )
    }
  }

  // Update current flags in database

  for (const [flag, value] of Object.entries(flags)) {
    const currentFlag: Flag | null = await db
      .collection("flags")
      .findOne({ flag, series })

    if (!currentFlag || currentFlag.currentValue === undefined) {
      await db.collection("history").insertOne({
        series,
        flag,
        value,
        time: Date.now(),
        type: HistoryEventType.Created,
      })
    } else if (currentFlag.currentValue !== value) {
      await db.collection("history").insertOne({
        series,
        flag,
        value,
        time: Date.now(),
        type: HistoryEventType.Changed,
      })
    }

    if (
      process.env.RETROACTIVE_TRACKING &&
      (await db
        .collection("history")
        .find({ flag, series })
        .count()) === 0
    ) {
      const firstEvent = await getFirstEvent()
      await db.collection("history").insertOne({
        series,
        flag,
        value,
        time: firstEvent ? firstEvent.time : Date.now(),
        type: HistoryEventType.TrackingBegan,
      })
    }

    if (currentFlag?.currentValue !== value) {
      await db.collection("flags").updateOne(
        { flag, series },
        {
          $set: {
            currentValue: value,
            lastUpdated: Date.now(),
          },
        },
        {
          upsert: true,
        }
      )
    }
  }
}
