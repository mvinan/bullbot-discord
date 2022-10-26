const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const currencies = require('../currencies.js')

const getCurrentHour = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}h${minutes}`
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('v')
    .setDescription('Crea una venta!')
    .addStringOption(option =>
      option.setName('currency')
        .setDescription('Seleciona la divisa')
        .setRequired(true)
        .addChoices(...currencies)
    )
  ,
  async execute(interaction) {
    const currency = interaction.options.getString('currency')
    const currentDate = getCurrentHour()
    const title = `VENDER - ${currency.toUpperCase()}!`
    const embed = new EmbedBuilder()
      .setColor(0xd52b41)
      .setTitle(title)
      .setDescription(`${interaction?.user?.username} creo una orden de venta, para ${currency.toUpperCase()}!`);

    await interaction.guild.channels.cache.get('1034283172936036372').send({ content: `🔴 VENDER - ${currency.toUpperCase()}! 🔴`, embeds: [embed] });
    await interaction.reply({ content: `${currentDate} ${interaction?.user?.username} creo una orden de compra!!`, embeds: [embed] })
  },
};
