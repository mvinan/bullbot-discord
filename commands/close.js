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
    .setName('tp')
    .setDescription('Order de toma de profit!')
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
    const embed = new EmbedBuilder()
      .setColor(0x0074ba)
      .setTitle(`TOMAR PROFIT - ${currency.toUpperCase()}!`)
      .setDescription(`${interaction?.user?.username} creo una orden de tomar profit, para ${currency.toUpperCase()}!`);

    await interaction.guild.channels.cache.get('1034283172936036372').send({ content: `🔵 TOMAR PROFIT! ${currency.toUpperCase()} 🔵`, embeds: [embed] });
    await interaction.reply({ content: `${currentDate} ${interaction?.user?.username} creo una orden de tomar profit!!`, embeds: [embed] })
  },
};
