import FS from 'fs';

import { NotifyListItem as Notify } from '@/types';

const notifyListFilePath = './secret/server.json';

export const getNotifyList = (): Notify[] => {
  const str = FS.readFileSync(notifyListFilePath, { encoding: 'ascii' });
  const notifyList: Notify[] = JSON.parse(str);
  return notifyList;
};

export const updateNotifyList = (server: Notify): Notify => {
  const str = FS.readFileSync(notifyListFilePath, { encoding: 'ascii' });
  const notifyList: Notify[] = JSON.parse(str);
  let target = notifyList.find(s => s.server_id === server.server_id);
  if (target) target.notify_count = server.notify_count;
  else target = notifyList[notifyList.push(server) - 1];
  FS.writeFileSync(notifyListFilePath, JSON.stringify(notifyList));
  return target;
};
