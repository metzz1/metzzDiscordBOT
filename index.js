const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')
const emoji = require('node-emoji')
require('dotenv').config()

const discordMessage = (title, description) => {
  let embed = new Discord.MessageEmbed()
  embed.setTitle(title)
  embed.setDescription(description)
  return embed
}

const fetchData = async url => {
  try {
    const response = await axios.get(url)
    return response?.data
  } catch (error) {
    console.error(error)
  }
}

const currencyEmbed = (title, currency) => {
  const dTitle = `${emoji.emojify(':currency_exchange:')} ${title} (${currency})!`
  const dDescription = `Cotacao do ${title}: R$${response.results.currencies[currency].buy}`
  return discordMessage(dTitle, dDescription)
}

client.on('ready', () => {
  console.log(`${emoji.emojify('Made w/ :heart:')}\nLogado como: ${client.user.tag}`)
})
// CORONA
client.on('message', async msg => {
  if (msg.content.startsWith('!corona')) {
    const pais = msg.content?.split(' ')?.pop()
    if (pais === 'ajuda' || !pais) {
      return msg.channel.send(
        discordMessage(
          `${emoji.emojify(':sos:')} Ajuda ${emoji.emojify(':sos:')}`,
          '\n!corona (nome do pais em ingles) - Informacoes de um pais\n!corona world - Informacoes do mundo inteiro'
        )
      )
    }
    const coronaData = await fetchData(`https://coronavirus-19-api.herokuapp.com/countries/${pais}`)
    if (!response.cases || !coronaData)
      return msg.channel.send(discordMessage(`${emoji.emojify(':red_circle:')} Erro!`, 'Pais inexistente ou indisponivel'))
    return msg.channel.send(
      discordMessage(
        `${emoji.emojify(':large_blue_circle:')} ${pais.toUpperCase()}`,
        `\n\nCasos: ${response.cases.toLocaleString('de-DE')}\nCasos Hoje: ${response.todayCases.toLocaleString(
          'de-DE'
        )}\nMortes: ${response.deaths.toLocaleString('de-DE')}\nMortes Hoje: ${response.todayDeaths.toLocaleString('de-DE')}`
      )
    )
  }
  // COTACAO
  if (msg.content.startsWith('!cotacao')) {
    const moeda = msg.content?.split(' ')?.pop()
    if (moeda === 'ajuda' || !moeda) {
      return msg.channel.send(
        discordMessage(
          `${emoji.emojify(':sos:')} Ajuda ${emoji.emojify(':sos:')}`,
          '\n!cotacao (moeda) - Cotacao atual da moeda\nMoedas Disponiveis: Dolar, Euro, Peso, Bitcoin e Libra'
        )
      )
    }
    const currencyData = await fetchData(`https://api.hgbrasil.com/finance?key=${process.env.HG_KEY}/`)
    const values = currencyData?.results?.currencies
    if (values) return
    const { USD, GBP, ARS, EUR, BTC } = values
    switch (moeda.toLocaleLowerCase()) {
      case 'dolar':
        msg.channel.send(currencyEmbed('Dolar', 'USD'))
        break
      case 'libra':
        msg.channel.send(currencyEmbed('Libra', 'GBP'))
        break
      case 'peso':
        msg.channel.send(currencyEmbed('Peso Argentino', 'ARS'))
        break
      case 'euro':
        msg.channel.send(currencyEmbed('Euro', 'EUR'))
        break
      case 'bitcoin':
        msg.channel.send(currencyEmbed('Bitcoin', 'BTC'))
        break
      default:
        msg.channel.send(
          discordMessage(
            `${emoji.emojify(':red_circle:')} ERRO!`,
            `A moeda: ${moeda} nao esta disponivel.\nPara checar as moedas disponiveis digite: !cotacao`
          )
        )
    }
  }
})

client.login(process.env.DISCORD_KEY)
