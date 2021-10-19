import FS from 'fs';

import { Notification, BotData } from '@/types';

import { ytChannelId } from '@/handler/config';

const BotDataFilePath = './secret/data.json';

// TODO: we may need some of these operations to be atomic!!

const getData = (): BotData => {
  if (FS.existsSync(BotDataFilePath)) {
    const str = FS.readFileSync(BotDataFilePath, { encoding: 'utf-8' });
    const botData: BotData = JSON.parse(str);
    return botData;
  } else {
    const newData: BotData = {
      prefix: '!!',
      ytChannelId: ytChannelId,
      ytChannelName: '',
      ytSubCount: 0,
      notifications: [],
    };
    FS.writeFileSync(BotDataFilePath, JSON.stringify(newData, null, 2));
    return newData;
  }
};

const setData = (): void => {
  FS.writeFileSync(BotDataFilePath, JSON.stringify(data, null, 2));
};

const data = getData();

export const getPrefix = (): string => data.prefix;
export const setPrefix = (prefix: string): void => {
  if (/[A-z0-9_]$/.test(prefix)) data.prefix = prefix + '';
  else data.prefix = prefix;
  setData();
};

export const getChannelName = (): string => data.ytChannelName;
export const setChannelName = (name: string): void => {
  data.ytChannelName = name;
  setData();
};

export const getSubCount = (): number => data.ytSubCount;
export const setSubCount = (count: number): void => {
  data.ytSubCount = count;
  setData();
};

export const getNotifications = ({
  dcServerId,
  dcChannelId,
  targetSubCount,
}: Partial<Notification> = {}): Notification[] => {
  let list = data.notifications;
  if (dcServerId) list = list.filter((n) => n.dcServerId === dcServerId);
  if (dcChannelId) list = list.filter((n) => n.dcChannelId === dcChannelId);
  if (targetSubCount)
    list = list.filter((n) => n.targetSubCount === targetSubCount);
  return list;
};

export const updateNotification = (notify: Notification): Notification => {
  const notifications = data.notifications;
  let target = notifications.find(
    (n) =>
      n.dcServerId === notify.dcServerId &&
      n.dcChannelId === notify.dcChannelId,
  );
  if (target) target.targetSubCount = notify.targetSubCount;
  else target = notifications[notifications.push(notify) - 1];
  setData();
  return target;
};

export const removeNotification = (
  notify: Notification,
): Notification | null => {
  const notifications = getNotifications();
  const index = notifications.findIndex(
    (s) =>
      s.dcServerId === notify.dcServerId &&
      s.dcChannelId === notify.dcChannelId &&
      s.targetSubCount === notify.targetSubCount,
  );
  let target: Notification;
  if (index >= 0) [target] = notifications.splice(index, 1);
  else return null;
  setData();
  return target;
};
