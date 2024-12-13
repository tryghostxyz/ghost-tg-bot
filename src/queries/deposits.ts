import { gql } from 'graphql-request';

export const DEPOSITS_QUERY = gql`
  query GetLatestDeposits($timestamp: BigInt!) {
    deposits(
      where: { timestamp_gt: $timestamp }
      orderBy: "timestamp"
      orderDirection: "asc"
    ) {
      items {
        id
        reserve
        userId
        onBehalfOf
        amount
        referral
        timestamp
        txHash
      }
    }
  }
`;
