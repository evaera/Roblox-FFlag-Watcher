const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : 'http://localhost:8080/'

const endpoint = (str: string) => BASE_URL + str

export const allSeries = [
  'ClientAppSettings',
  'StudioAppSettings',
  'WindowsBootstrapperSettings',
  'AndroidAppSettings',
  'iOSAppSettings',
  'XboxAppSettings'
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
  value?: string
}

export async function getFlags (series: string): Promise<Flag[]> {
  return (await fetch(endpoint(`flags/${series}`))).json()
}
