import fastify from "fastify"
import fastifyCors from "fastify-cors"
import { database } from "./db"
import { allSeries, HistoryEventType, parseFlags } from "./parser"

const app = fastify({ logger: true })

app.register(fastifyCors, {
  origin: "*",
})

app.get(
  "/flags/:series",
  {
    schema: {
      params: {
        series: {
          type: "string",
          enum: allSeries,
        },
      },
    },
  },
  async (request, reply) => {
    try {
      const db = await database
      if (request.query.fresh) {
        await parseFlags(request.params.series)
        reply.header("Cache-Control", "private")
      } else {
        reply.header("Cache-Control", "s-maxage=86400, max-age=86400")
      }

      return db
        .collection("flags")
        .find({
          currentValue: {
            $exists: true,
          },
          series: request.params.series,
        })
        .toArray()
    } catch (e) {
      console.error(e)
      return e
    }
  }
)

const stripUndefined = (obj: { [index: string]: any }) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined) {
      delete obj[key]
    }
  })

  return obj
}

app.get("/events", async (req, reply) => {
  const db = await database

  reply.header("Cache-Control", "private")

  return db
    .collection("history")
    .find(
      stripUndefined({
        series: req.query.series,
        flag: req.query.flag,
        type: req.query.series
          ? undefined
          : { $ne: HistoryEventType.TrackingBegan },
      })
    )
    .limit(100)
    .sort({ time: -1 })
    .toArray()
})

app
  .listen(8080, "0.0.0.0")
  .then(() => console.log("FFlag observer server started"))
  .catch(e => console.error(e))
