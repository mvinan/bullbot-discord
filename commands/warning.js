const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const currencies = require("../currencies.js");
const alerts = require("../type-alerts.js");
const { channelId } = require("../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("p")
    .setDescription("Genera un aviso de precaucion!")
    .addStringOption((option) =>
      option
        .setName("currency")
        .setDescription("Seleciona la divisa")
        .setRequired(true)
        .addChoices(...currencies)
    )
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Seleciona el tipo de alerta")
        .setRequired(true)
        .addChoices(...alerts)
    ),
  async execute(interaction) {
    const currency = interaction.options.getString("currency");
    const codeAlert = interaction.options.getString("type");

    const alert = alerts.find((d) => d.value === codeAlert);

    let content;
    if (alert.value === "cp") {
      content = `⚠️⚠️ NO CERRAR! - ${currency.toUpperCase()} ⚠️⚠️`;
    } else if (alert.value === "ocdp") {
      content = `⚠️⚠️ Abrir operacion en contra - ${currency.toUpperCase()} ⚠️⚠️`;
    } else if (alert.value === "ct") {
      content = `⚠️⚠️ Esperar indicaciones - ${currency.toUpperCase()} ⚠️⚠️`;
    }

    const embed = new EmbedBuilder()
      .setColor(0xffd372)
      .setTitle(`${alert?.name?.toUpperCase()} - ${currency?.toUpperCase()}!`)
      .setDescription(
        `${
          interaction?.user?.username
        } creo una alerta, para ${currency.toUpperCase()}!`
      );

    await interaction.guild.channels.cache
      .get(channelId)
      .send({ content: `${content}`, embeds: [embed] });

    await interaction.reply({
      content: `${interaction?.user?.username}  creo una alerta!!`,
      embeds: [embed],
      ephemeral: true,
    });
  },
};
