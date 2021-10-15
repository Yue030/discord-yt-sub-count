import config from '~/secret/config.json';

export default {
  current_count: 0,
  channel_name: '',
  url() {
    return config['google-api']
      .replace('{id}', config['yt-channel-id'])
      .replace('{key}', config['google-api-key']);
  },
};
