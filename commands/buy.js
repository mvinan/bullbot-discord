const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { channelId } = require("../config");
const currencies = require("../currencies.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("c")
    .setDescription("Crea una compra!")
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
      .setColor(0x25f406)
      .setTitle(`COMPRAR - ${currency.toUpperCase()}!`)
      .setDescription(
        `${
          interaction?.user?.username
        } creo una orden de compra, para ${currency.toUpperCase()}!`
      );

    await interaction.reply({
      content: `${interaction?.user?.username} creaste una orden de compra!!`,
      embeds: [embed],
      ephemeral: true,
    });

    await interaction.guild.channels.cache.get(channelId).send({
      content: `@everyone 🟢 COMPRAR!! ${currency.toUpperCase()}! 🟢`,
      embeds: [embed],
    });
  },
};
