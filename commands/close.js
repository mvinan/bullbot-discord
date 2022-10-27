const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const currencies = require("../currencies.js");
const { channelId } = require("../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tp")
    .setDescription("Order de toma de profit!")
    .addStringOption((option) =>
      option
        .setName("currency")
        .setDescription("Seleciona la divisa")
        .setRequired(true)
        .addChoices(...currencies)
    ),
  async execute(interaction) {
    const currency = interaction.options.getString("currency");

    const embed = new EmbedBuilder()
      .setColor(0x0074ba)
      .setTitle(`TOMAR PROFIT - ${currency.toUpperCase()}!`)
      .setDescription(
        `${
          interaction?.user?.username
        } creo una orden de tomar profit, para ${currency.toUpperCase()}!`
      );

    await interaction.guild.channels.cache.get(channelId).send({
      content: `@everyone 🔵 TOMAR PROFIT! ${currency.toUpperCase()} 🔵`,
      embeds: [embed],
    });
    await interaction.reply({
      content: `${interaction?.user?.username} creaste una orden de tomar profit!!`,
      embeds: [embed],
      ephemeral: true,
    });
  },
};
