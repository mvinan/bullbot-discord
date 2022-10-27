const dotenv = require("dotenv");
const { Events } = require("discord.js");
const express = require("express");

const client = require("./client.js");
const { token, autoDeployCommands } = require("./config.js");
const deployCommands = require("./services/deploy-commands.js");
const addCommandsToClient = require("./services/add-commands.js");

const app = express();
const port = process.env.PORT || 8080;

(() => {
  dotenv.config();
  addCommandsToClient();

  if (autoDeployCommands === "on") {
    deployCommands();
  }

  const health = (req, res) => {
    res.status(200).json({ health: "OK" });
  };

  app.use("/healthz", health);

  app.listen(port, () => {
    console.log(`server started on port ${port}`);
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });

  client.once(Events.ClientReady, () => {
    console.log("Ready!");
  });

  client.login(token);
})();
