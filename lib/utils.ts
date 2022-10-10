import { NextRouter } from 'next/router';

export const redirect = ({
  router, destination,
}: {
  router: NextRouter, destination: string
}) => setTimeout(() => router.push(destination), 2000);

export const TEN_MEBIBYTES_LIMIT = 10485760; // 10 MB to Byte conversion
