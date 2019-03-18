import mongodb from 'mongodb'

export const database: Promise<mongodb.Db> = new Promise(resolve => {
  mongodb.MongoClient.connect(process.env.MONGO_DB!, (err, client) => {
    if (err) {
      throw err
    }

    resolve(client.db('FFlagObserver'))
  })
})
