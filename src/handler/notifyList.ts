import FS from 'fs';

import { NotifyListItem as Notify } from '@/types';

const notifyListFilePath = './secret/server.json';

export const getNotifyList = (): Notify[] => {
  const str = FS.readFileSync(notifyListFilePath, { encoding: 'ascii' });
  const notifyList: Notify[] = JSON.parse(str);
  return notifyList;
};

const setNotifyList = (notifyList: Notify[]): void => {
  FS.writeFileSync(notifyListFilePath, JSON.stringify(notifyList, null, 2));
};

// TODO: we may need this operation to be atomic!!
export const updateNotifyList = (notify: Notify): Notify => {
  const notifyList = getNotifyList();
  let target = notifyList.find(s => s.server_id === notify.server_id);
  if (target) target.notify_count = notify.notify_count;
  else target = notifyList[notifyList.push(notify) - 1];
  setNotifyList(notifyList);
  return target;
};

// TODO: we may need this operation to be atomic!!
export const cancelNotify = (notify: Notify): Notify => {
  const notifyList = getNotifyList();
  const index = notifyList.findIndex(s => s.server_id === notify.server_id && s.notify_count === notify.notify_count);
  let target: Notify;
  if (index >= 0) [target] = notifyList.splice(index, 1);
  else throw 'notifyItem not found in notifyList!';
  setNotifyList(notifyList);
  return target;
};
