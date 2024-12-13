import { Bot } from 'grammy';
import { config } from './config';
import { DepositService } from './services';

const bot = new Bot(config.telegramToken);

bot.catch((err) => {
  console.error('Bot error:', err);
});

const depositService = new DepositService(bot);

bot.command('status', async (ctx) => {
  const timestamp = depositService.getLastProcessedTimestamp();
  await ctx.reply(
    `Bot is running! Last processed timestamp: ${new Date(timestamp * 1000).toLocaleString()}`
  );
});

const main = async () => {
  try {
    bot.start();
    console.log('Bot started!');
    setInterval(() => depositService.pollDeposits(), config.pollInterval);
    console.log('Deposit polling started!');
  } catch (error) {
    console.error('Error starting bot:', error);
  }
};

main().catch(console.error);
