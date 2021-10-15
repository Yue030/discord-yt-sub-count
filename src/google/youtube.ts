import authorize, { credentials } from './authorization';
import { Auth, google as Google, youtube_v3 } from 'googleapis';

const useYoutubeApi = <S>(
  apiCallback: (
    api: youtube_v3.Youtube,
    auth: Auth.OAuth2Client,
    res: (ret: S) => void,
    rej: (err: Error) => void
  ) => void,
) =>
    new Promise<S>((res, rej) => {
      authorize(credentials, (auth) => {
        const ytApi = Google.youtube('v3');
        apiCallback(ytApi, auth, res, rej);
      });
    });

type ChannelListParam = youtube_v3.Params$Resource$Channels$List;
type ChannelListRes = youtube_v3.Schema$ChannelListResponse;
export const getChannelList = async (
  options: ChannelListParam,
): Promise<ChannelListRes> => {
  return await useYoutubeApi<ChannelListRes>((api, auth, res, rej) => {
    api.channels.list({ ...options, auth }, (err, response) => {
      if (err) return rej(err);
      if (!response?.data) return rej(new Error('Response Data not found!'));
      res(response.data);
    });
  });
};
