import querystring from "querystring"

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:8080/"

const endpoint = (str: string) => BASE_URL + str

export const allSeries = [
  "PCDesktopClient",
  "MacDesktopClient",
  "PCStudioBootstrapper",
  "MacStudioBootstrapper",
  "PCClientBootstrapper",
  "MacClientBootstrapper",
  "XboxClient",
  "AndroidApp",
  "iOSApp",
  "StudioApp",
  "UWPApp",
  "PCDesktopClientCJV",
]

export enum HistoryEventType {
  Created = "Created",
  Removed = "Removed",
  Changed = "Changed",
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

const stripUndefined = (obj: { [index: string]: any }) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined) {
      delete obj[key]
    }
  })

  return obj
}

export async function getFlags(
  series: string,
  fresh?: boolean
): Promise<Flag[]> {
  const values = await (
    await fetch(endpoint(`flags/${series}${fresh ? "?fresh=true" : ""}`))
  ).json()

  return values.error ? [] : values
}

export async function getHistory(
  series?: string,
  flag?: string
): Promise<HistoryEvent[]> {
  const query = querystring.stringify(
    stripUndefined({
      series,
      flag,
    })
  )

  const eventHistory: HistoryEvent[] = await (
    await fetch(endpoint(`events?${query}`))
  ).json()

  const mergedEventHistory = []

  for (let i = 0; i < eventHistory.length; i++) {
    const currentEvent = eventHistory[i]

    for (let j = i + 1; j < eventHistory.length; j++) {
      const nextEvent = eventHistory[j]

      if (
        currentEvent.type === nextEvent.type &&
        currentEvent.flag === nextEvent.flag &&
        currentEvent.value === nextEvent.value
      ) {
        i = j + 1
        currentEvent.series += `\n${nextEvent.series}`
      } else {
        break
      }
    }

    mergedEventHistory.push(currentEvent)
  }

  return mergedEventHistory
}

async function fetchCors(url: string, options?: any) {
  return fetch(`https://cors.eryn.io/${encodeURIComponent(url)}`, options)
}

const gameInfoCache: { [index: number]: Promise<any> } = {}

export async function getRobloxGameInfo(placeId: number) {
  if (gameInfoCache[placeId]) {
    return gameInfoCache[placeId]
  }

  return (gameInfoCache[placeId] = (
    await fetchCors(
      `https://economy.roblox.com/v2/assets/${placeId}/details`
    )
  ).json())
}

const thumbnailInfoCache: { [index: number]: Promise<any> } = {}

export async function getThumbnail(assetId: number) {
  if (thumbnailInfoCache[assetId]) {
    return thumbnailInfoCache[assetId]
  }

  return (thumbnailInfoCache[assetId] = (
    await fetchCors(
      `https://thumbnails.roblox.com/v1/assets?assetIds=${assetId}&format=Png&size=420x420`
    )
  ).json())
}

const robloxUserInfoCache: { [index: number]: Promise<any> } = {}
export async function getRobloxUserInfo(userId: number) {
  if (robloxUserInfoCache[userId]) {
    return robloxUserInfoCache[userId]
  }

  return (robloxUserInfoCache[userId] = (
    await fetchCors(`https://users.roblox.com/v1/users/${userId}`)
  ).json())
}
