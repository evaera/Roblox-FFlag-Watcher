import { database } from './db'
import fetch from 'node-fetch'
import * as config from './config.json'

interface Flags {
  [index: string]: string
}

export const allSeries = config.series

export enum HistoryEventType {
  Created = 'Created',
  Removed = 'Removed',
  Changed = 'Changed'
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

export function parseAllFlags () {
  return Promise.all(config.series.map(series => parseFlags(series)))
}

export async function parseFlags (series: string) {
  const request = await fetch(config.endpoint.replace('SERIES', series))

  const flags = await request.json() as Flags

  const db = await database

  // Remove no longer existing flags from the database
  await Promise.all(await db.collection('flags').find({ currentValue: { $exists: true }, series }).map(async (flag: Flag) => {
    if (!(flag.flag in flags)) {
      await db.collection('history').insertOne({
        series,
        flag: flag.flag,
        time: Date.now(),
        type: HistoryEventType.Removed
      })
      console.log('removed', flag)

      await db.collection('flags').updateOne({ series, flag: flag.flag }, {
        $unset: {
          currentValue: ''
        }
      })
    }
  }).toArray())

  // Update current flags in database
  await Promise.all(Object.entries(flags).map(async ([flag, value]) => {
    const currentFlag: Flag | null = await db.collection('flags').findOne({ flag, series })

    if (!currentFlag || currentFlag.currentValue === undefined) {
      await db.collection('history').insertOne({
        series,
        flag,
        value,
        time: Date.now(),
        type: HistoryEventType.Created
      })
      console.log('created', flag)
    } else if (currentFlag.currentValue !== value) {
      await db.collection('history').insertOne({
        series,
        flag,
        value,
        time: Date.now(),
        type: HistoryEventType.Changed
      })
      console.log('changed', flag)
    }

    return db.collection('flags').updateOne({ flag, series }, {
      $set: {
        currentValue: value
      }
    }, {
      upsert: true
    })
  }))
}
