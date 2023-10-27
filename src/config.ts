import dotenv from 'dotenv';
import fs from 'fs';

const configPath = process.platform === 'win32' ? '.env.win' : '.env';
const envConfig = null;

const buffer = envConfig
  ? Buffer.concat([
      fs.readFileSync(configPath),
      Buffer.from('\n'),
      fs.readFileSync(envConfig),
    ])
  : fs.readFileSync(configPath);

const config = dotenv.parse(buffer);

for (const key in config) {
  process.env[key] = config[key];
}

export const PORT = Number(process.env.PORT);
