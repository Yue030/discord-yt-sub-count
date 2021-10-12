const config = require('./config.json')

module.exports = {
    url() {
        return config['google-api']
            .replace("{id}", config['yt-channel-id'])
            .replace("{key}", config['google-api-key']);
    }
}