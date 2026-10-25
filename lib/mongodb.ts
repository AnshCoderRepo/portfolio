import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export interface ConnectionStatus {
  isConnected: boolean;
  mode: "mongodb" | "local_fallback";
  message: string;
}

export async function connectToDatabase(): Promise<ConnectionStatus> {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    return {
      isConnected: false,
      mode: "local_fallback",
      message: "MONGODB_URI is not set in .env.local. Operating in resilient local storage fallback mode.",
    };
  }

  if (cached.conn) {
    return {
      isConnected: true,
      mode: "mongodb",
      message: "Connected to MongoDB via cached connection.",
    };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(uri, opts)
      .then((m) => {
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return {
      isConnected: true,
      mode: "mongodb",
      message: "Successfully connected to MongoDB.",
    };
  } catch (error) {
    cached.promise = null;
    return {
      isConnected: false,
      mode: "local_fallback",
      message: `Failed to connect to MongoDB: ${(error as Error).message}. Operating in resilient local storage fallback mode.`,
    };
  }
}
