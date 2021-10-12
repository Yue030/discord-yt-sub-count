const config = require('./config.json')

module.exports = {
    current_count : 0,
    channel_name : '',
    url() {
        return config['google-api']
            .replace("{id}", config['yt-channel-id'])
            .replace("{key}", config['google-api-key']);
    }
}