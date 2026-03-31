import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  node_env: process.env.NODE_ENV || "development",
  mongo_uri: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN || "7d",
  redis_url: process.env.REDIS_URL || "redis://localhost:6379",
  // client_api_key: process.env.CLIENT_API_KEY,
  client_url: process.env.CLIENT_URL || "http://localhost:5173",
  ai_api_key: process.env.AI_API_KEY,
  ai_api_url: process.env.AI_API_URL || "https://api.openai.com/v1",
};
