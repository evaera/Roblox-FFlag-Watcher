import './http'
import { parseAllFlags, migrateFlags } from './parser'

async function main () {
  await migrateFlags()
  await parseAllFlags()

  setInterval(parseAllFlags, 5 * 60 * 1000)
}

main().catch(e => {
  throw e
})
