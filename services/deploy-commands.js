const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");
const { token, clientId, guildId } = require("../config.js");
const rest = new REST({ version: "10" }).setToken(token);

const deployCommands = async () => {
  const commands = [];

  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {
        body: commands,
      }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = deployCommands;
