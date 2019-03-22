import querystring from 'querystring'

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : 'http://localhost:8080/'

const endpoint = (str: string) => BASE_URL + str

export const allSeries = [
  'ClientAppSettings',
  'MacClientAppSettings',
  'StudioAppSettings',
  'WindowsBootstrapperSettings',
  'MacBootstrapperSettings',
  'AndroidAppSettings',
  'iOSAppSettings',
  'XboxAppSettings',
  'RCCService'
]

export enum HistoryEventType {
  Created = 'Created',
  Removed = 'Removed',
  Changed = 'Changed'
}

export interface Flag {
  flag: string
  currentValue?: string
  lastUpdated?: number
}

export interface HistoryEvent {
  time: number
  type: HistoryEventType
  flag: string
  series: string
  value?: string
}

const stripUndefined = (obj: {[index: string]: any}) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined) {
      delete obj[key]
    }
  })

  return obj
}

export async function getFlags (series: string): Promise<Flag[]> {
  return (await fetch(endpoint(`flags/${series}`))).json()
}

export async function getHistory (series?: string, flag?: string): Promise<HistoryEvent[]> {
  const query = querystring.stringify(stripUndefined({
    series, flag
  }))

  return (await fetch(endpoint(`events?${query}`))).json()
}
