import { database } from './db'
import fetch from 'node-fetch'
import * as config from './config.json'

interface Flags {
  [index: string]: string
}

export enum HistoryEventType {
  Created = 'Created',
  Removed = 'Removed',
  Changed = 'Changed'
}

export interface Flag {
  flag: string
  currentValue?: string
}

export interface HistoryEvent {
  time: number
  type: HistoryEventType
  flag: string
  value?: string
}

export async function parseFlags () {
  const request = await fetch(config.endpoint)

  const flags = await request.json() as Flags

  const db = await database

  // Remove no longer existing flags from the database
  await Promise.all(await db.collection('flags').find({ currentValue: { $exists: true } }).map(async (flag: Flag) => {
    if (!(flag.flag in flags)) {
      await db.collection('history').insertOne({
        flag: flag.flag,
        time: Date.now(),
        type: HistoryEventType.Removed
      })
      console.log('removed', flag)

      await db.collection('flags').updateOne({ flag: flag.flag }, {
        $unset: {
          currentValue: ''
        }
      })
    }
  }).toArray())

  // Update current flags in database
  await Promise.all(Object.entries(flags).map(async ([flag, value]) => {
    const currentFlag: Flag | null = await db.collection('flags').findOne({ flag })

    if (!currentFlag || currentFlag.currentValue === undefined) {
      await db.collection('history').insertOne({
        flag,
        value,
        time: Date.now(),
        type: HistoryEventType.Created
      })
      console.log('created', flag)
    } else if (currentFlag.currentValue !== value) {
      await db.collection('history').insertOne({
        flag,
        value,
        time: Date.now(),
        type: HistoryEventType.Changed
      })
      console.log('changed', flag)
    }

    return db.collection('flags').updateOne({ flag }, {
      $set: {
        currentValue: value
      }
    }, {
      upsert: true
    })
  }))
}
