import FS from 'fs';

import { ServerListItem as Server } from '@/types';

const serverListFilePath = './secret/server.json';

export const getServerList = (): Server[] => {
  const str = FS.readFileSync(serverListFilePath, { encoding: 'ascii' });
  const serverList: Server[] = JSON.parse(str);
  return serverList;
};

const setServerList = (serverList: Server[]): void => {
  FS.writeFileSync(serverListFilePath, JSON.stringify(serverList, null, 2));
};

// TODO: we may need this operation to be atomic!!
export const updateServerList = (server: Server): Server => {
  const serverList = getServerList();
  let target = serverList.find(s => s.server_id === server.server_id);
  if (target) target.channel_id = server.channel_id;
  else target = serverList[serverList.push(server) - 1];
  setServerList(serverList);
  return target;
};
