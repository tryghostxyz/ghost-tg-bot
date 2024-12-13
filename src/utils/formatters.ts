import { Deposit } from '../types/deposit';

const createAddressLink = (address: string): string => {
  const shortAddr = `${address.slice(0, 8)}...${address.slice(-6)}`;
  return `<a href="https://bartio.beratrail.io/address/${address}">${shortAddr}</a>`;
};

const celebrationGifs = [
  'https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif',
  'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
  'https://media.giphy.com/media/3o6gDWzmAzrpi5DQU8/giphy.gif',
];

export function formatDepositMessage(deposit: Deposit): string {
  const amountInEther = Number(deposit.amount) / 1e18;
  const formattedTime = new Date(deposit.timestamp * 1000).toLocaleString();
  const txLink = `<a href="https://bartio.beratrail.io/tx/${deposit.txHash}">${deposit.txHash.slice(0, 8)}...${deposit.txHash.slice(-6)}</a>`;
  const telegramLink = `<a href="https://t.me/ghostlogsxyz">Ghost Devs Telegram Group</a>`;
  const randomGif =
    celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)];

  return (
    `🎉 <b>New Deposit Detected!</b> 🎉\n\n` +
    `<a href="${randomGif}">​</a>` +
    `💰 <b>Amount:</b> ${amountInEther.toFixed(4)} ETH\n` +
    `👤 <b>User:</b> ${createAddressLink(deposit.userId)}\n` +
    `🏦 <b>Reserve:</b> ${createAddressLink(deposit.reserve)}\n` +
    `🔗 <b>Transaction:</b> ${txLink}\n` +
    `⏰ <b>Time:</b> ${formattedTime}` +
    `\n\n` +
    `❤️ <b>Join ${telegramLink}</b>`
  );
}
