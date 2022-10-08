import { NextRouter } from 'next/router';

const redirect = ({
  router, destination,
}: {
  router: NextRouter, destination: string
}) => setTimeout(() => router.push(destination), 2000);

export default redirect;
