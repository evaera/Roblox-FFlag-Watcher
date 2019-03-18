import './http'
// import './db'
import { parseFlags } from './parser'

setInterval(parseFlags, 5 * 60 * 1000)
parseFlags()
