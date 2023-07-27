import dotenv from "dotenv";

dotenv.config();

const MONGO_DB_URI = process.env.DB_URI || "";
const PORT = process.env.PORT ? Number(process.env.PORT) : 1337;

export const config = {
  mongo: {
    url: MONGO_DB_URI,
  },
  server: {
    port: PORT,
  },
};
