import { MongoClient } from "mongodb"
import { MONGO_URI } from "../config"


let client: MongoClient | null = null

export async function getMongoClient() {
  if (!client) {
    client = new MongoClient(MONGO_URI)
    await client.connect()
    console.log("Connected to MongoDB")
  }
  return client
}

export async function getDb(dbName: string) {
  const client = await getMongoClient()
  return client.db(dbName)
}