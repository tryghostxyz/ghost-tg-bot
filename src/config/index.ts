import * as dotenv from 'dotenv';

dotenv.config();

interface RequiredEnvVars {
  TELEGRAM_BOT_TOKEN: string | undefined;
  GHOST_GRAPH_URL: string | undefined;
  CHANNEL_IDS: string | undefined;
}

const requiredEnvVars: RequiredEnvVars = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  GHOST_GRAPH_URL: process.env.GHOST_GRAPH_URL,
  CHANNEL_IDS: process.env.CHANNEL_IDS,
};

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`${key} is required`);
  }
});

// After the check, we can safely assert these values are defined
export const config = {
  telegramToken: requiredEnvVars.TELEGRAM_BOT_TOKEN!,
  graphUrl: requiredEnvVars.GHOST_GRAPH_URL!,
  channelIds: requiredEnvVars.CHANNEL_IDS!.split(','),
  pollInterval: 5000, // 5 seconds
};
