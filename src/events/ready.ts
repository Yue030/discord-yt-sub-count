import { Client } from '@typeit/discord';

import checkYoutubeCount from '../actions/checkYoutubeCount';

const ready = (client: Client): void => {
  console.log('Connected');
  console.log('Logged in as: ');
  console.log(
    `${client.user?.username || 'Unknown username'}(${
      client.user?.id || 'Unknown ID'
    })`,
  );

  checkYoutubeCount(client);
  setInterval(() => checkYoutubeCount(client), 10000);
};

export default ready;
