import { verifyKey } from 'discord-interactions';
import { RequestHandler } from 'express';

const CLIENT_PUBLIC_KEY = String(process.env.DISCORD_APPLICATION_PUBLIC_KEY);

export const verifyDiscordKeyMiddleware: RequestHandler = async (
  req,
  res,
  next,
) => {
  const headers = req.headers;
  const signature = headers['x-signature-ed25519']
    ? headers['x-signature-ed25519']
    : headers['X-Signature-Ed25519'];
  const timestamp = headers['x-signature-timestamp']
    ? headers['x-signature-timestamp']
    : headers['X-Signature-Timestamp'];

  const isKeyVerified = await verifyKey(
    JSON.stringify(req.body),
    signature as string,
    timestamp as string,
    CLIENT_PUBLIC_KEY,
  );

  if (!isKeyVerified) {
    return res.status(401).send('Invalid Discord key');
  }

  next();
};
