const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const currencies = require('../currencies.js')
const alerts = require('../type-alerts.js')

const getCurrentHour = () => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}h${minutes}`
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('p')
    .setDescription('Genera un aviso de precaucion!')
    .addStringOption(option =>
      option.setName('currency')
        .setDescription('Seleciona la divisa')
        .setRequired(true)
        .addChoices(...currencies)
    )
    .addStringOption(option =>
      option.setName('type')
        .setDescription('Seleciona el tipo de alerta')
        .setRequired(true)
        .addChoices(...alerts)
    )
  ,
  async execute(interaction) {
    const currency = interaction.options.getString('currency')
    const codeAlert = interaction.options.getString('type')

    const alert = alerts.find(d => d.value === codeAlert)

    let content;
    if(alert.value === 'cp') {
      content = `⚠️⚠️ NO CERRAR! - ${currency.toUpperCase()} ⚠️⚠️`
    } else if (alert.value === 'ocdp') {
      content = `⚠️⚠️ Abrir operacion en contra - ${currency.toUpperCase()} ⚠️⚠️`
    } else if(alert.value === 'ct') {
      content = `⚠️⚠️ Esperar indicaciones - ${currency.toUpperCase()} ⚠️⚠️`
    }

    const currentDate = getCurrentHour()
    const embed = new EmbedBuilder()
      .setColor(0xFFD372)
      .setTitle(`${alert?.name?.toUpperCase()} - ${currency?.toUpperCase()}!`)
      .setDescription(`${interaction?.user?.username} creo una alerta, para ${currency.toUpperCase()}!`);

    await interaction.guild.channels.cache.get('1034283172936036372').send({ content: content, embeds: [embed] });
    await interaction.reply({ content: `${currentDate} ${interaction?.user?.username}  creo una alerta!!`, embeds: [embed] })
  },
};
