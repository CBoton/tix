import mongoose from "mongoose"

import { app } from "./app";


const start = async () => {
  if(!process.env.jwt_key){
    throw new Error("jwt_key must be defined")
  }
  try {
  await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  console.log("Connected to the Mongos");
  } catch(err) {
   console.log(err);
  }
  app.listen(3000, () => {
    console.log("Listnening on port 3000");
  });
}

start();