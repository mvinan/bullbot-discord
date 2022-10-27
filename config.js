module.exports = {
  token: process.env["token"],
  clientId: process.env["clientId"],
  guildId: process.env["guildId"],
  autoDeployCommands: process.env.AUTO_DEPLOY_COMMANDS || false,
  channelId: process.env.PUBLISH_CHANNEL_ID,
};
