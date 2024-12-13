import { request } from 'graphql-request';
import { Bot } from 'grammy';
import { config } from '../config';
import { DEPOSITS_QUERY } from '../queries';
import { DepositsResponse } from '../types';
import { formatDepositMessage } from '../utils';

export class DepositService {
  private lastProcessedTimestamp: number;

  constructor(private bot: Bot) {
    this.lastProcessedTimestamp = Math.floor(Date.now() / 1000);
  }

  async pollDeposits(): Promise<void> {
    try {
      const response = await request<DepositsResponse>(
        config.graphUrl,
        DEPOSITS_QUERY,
        { timestamp: this.lastProcessedTimestamp }
      );

      const deposits = response.deposits.items;

      for (const deposit of deposits) {
        if (deposit.timestamp > this.lastProcessedTimestamp) {
          const message = formatDepositMessage(deposit);
          await Promise.all(
            config.channelIds.map((channelId) =>
              this.bot.api.sendMessage(channelId, message, {
                parse_mode: 'HTML',
              })
            )
          );
          this.lastProcessedTimestamp = deposit.timestamp;
        }
      }
    } catch (error) {
      console.error('Error polling deposits:', error);
    }
  }

  getLastProcessedTimestamp(): number {
    return this.lastProcessedTimestamp;
  }
}
