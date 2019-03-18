import './http'
// import './db'
import { parseAllFlags } from './parser'

setInterval(parseAllFlags, 5 * 60 * 1000)
parseAllFlags()
