import Redis from "ioredis";

// import all password , port and host here
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("server is connected to redis");
});

redis.on("error", (err) => {
  console.log("error occured in redis", err);
});

export default redis;
