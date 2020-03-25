import mongodb from "mongodb"

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const database: Promise<mongodb.Db> = new Promise(async resolve => {
  await sleep(1000) // Jank way to wait for mongo to be ready

  mongodb.MongoClient.connect(process.env.MONGO_DB!, (err, client) => {
    if (err) {
      throw err
    }
    resolve(client.db("FFlagObserver"))
  })
})
