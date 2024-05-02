import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer : any

const testDbConnect = async () => {
  // await mongoose.disconnect()

  mongoServer = await MongoMemoryServer.create()

  mongoose.connect(mongoServer.getUri(),  { dbName: "syncline" })
}

const testDbClose = async () => {
  await mongoose.disconnect()
}

const testDbClear = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    collections[key].deleteMany({})
  }
}

export { testDbClear, testDbConnect, testDbClose }