import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import { verifyDiscordKeyMiddleware } from './middlewares';
import { updateDiscordGlobalCommands } from './useCases';

import discordRouter from './routers/discord';

const port = 3000;
const app = express();

app.use(express.json());

app.use('/discord', verifyDiscordKeyMiddleware, discordRouter);

app.listen(port, async () => {
  await updateDiscordGlobalCommands();

  console.log(`App listening on port [${port}]`);
});

process
  .on('warning', e => console.error(e))
  .on('unhandledRejection', e => console.error(e))
  .on('uncaughtException', e => console.error(e));
