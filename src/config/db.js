// import { Grid } from "gridfs-stream";

const Grid = require('gridfs-stream');
import mongoose from "mongoose";
const MONGODB_URL = process.env.DB_URI;

if (!MONGODB_URL) {
  throw new Error("Set the environmental variable.");
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { con: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection does not exist, we check if a promise is already in progress. If a promise is already in progress, we wait for it to resolve to get the connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
      const conn = mongoose.connection;
      let gfs;
      conn.once("open", () => {
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection("uploads");
      });
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default connectDB;
