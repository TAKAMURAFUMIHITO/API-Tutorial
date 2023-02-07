import * as dotenv from 'dotenv';
dotenv.config();

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
} as const;

// config.jwt.options.algorithm = "aa"


export default config;
