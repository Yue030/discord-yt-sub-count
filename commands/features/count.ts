import global from '../../global';

export default {
  name: 'count',
  aliases: [],
  usage: 'count',
  description: 'count',
  execute(msg: any, args: any, client: any) {
    msg.channel.send(
      `${global.channel_name} 的訂閱數: ${global.current_count}`
    );
  },
};
