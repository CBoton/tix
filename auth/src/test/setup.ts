import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
 

let mongo: any
beforeAll(async () => {
  process.env.JWT_KEY = "yomamma"
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri)
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});


afterAll(async () => {
  if (mongo) {
    await mongoose.connection.close();
    await mongo.stop();
  }
  
});