import * as dotenv from 'dotenv';
dotenv.config();

// process.env.secretkeyがstring型に絞る
if (!process.env.secretkey) {
  throw new Error("Please set the environment variable 'secretkey'");
}

const config = {
  jwt: {
    secret: process.env.secretkey,
    options: {
      algorithm: "HS256",
      expiresIn: "1d",
    },
  },
  connection: {
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }
} as const;

export default config;
