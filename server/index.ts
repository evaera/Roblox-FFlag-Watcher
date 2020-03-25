import { database } from "./db"
import "./http"
import { migrateFlags, parseAllFlags } from "./parser"

async function main() {
  const db = await database

  await db.collection("history").createIndex({ flag: 1, series: 1 })
  await db.collection("history").createIndex({ time: -1 })

  await parseAllFlags()
  await db.collection("history").deleteMany({ time: { $gt: 1585127258000 } })
  await migrateFlags()

  setInterval(parseAllFlags, 5 * 60 * 1000)
}

main().catch(e => {
  throw e
})
