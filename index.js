const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')
const emoji = require('node-emoji')
require('dotenv').config()


client.on('ready', () => {
  console.log(`${emoji.emojify('Made w/ :heart:')}\nLogado como: ${client.user.tag}`);
});
// CORONA
client.on('message', async msg => {
   if (msg.content.startsWith("!corona")) {
    const pais = msg.content.split(' ')[1]
    if (pais === 'ajuda' || typeof pais === 'undefined') {
      let embed = new Discord.MessageEmbed()
      embed.setTitle(`${emoji.emojify(':sos:')} Ajuda ${emoji.emojify(':sos:')}`)
      embed.setDescription("\n!corona (nome do pais em ingles) - Informacoes de um pais\n!corona world - Informacoes do mundo inteiro")
      msg.channel.send(embed)
    } 

    else if (msg.content === `!corona ${pais}`) {
        console.log(pais)
      let getData = async () => {
        let response = await axios.get(`https://coronavirus-19-api.herokuapp.com/countries/${pais}`)
        .then(response => {
          return response
        })
        .catch(error=> {
          console.log(error)
          return error
        })
        return response.data
      }
      await getData ()
        .then(response=> {
          console.log(response)
          if (response.cases === undefined) {
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`${emoji.emojify(':red_circle:')} Erro!`)
            embed.setDescription("Pais inexistente ou indisponivel")
            msg.channel.send(embed)
          }
          else {
         console.log(`Data from ${pais.toUpperCase()} obtained`)
          let embed = new Discord.MessageEmbed()
          embed.setTitle(`${emoji.emojify(':large_blue_circle:')} ${pais.toUpperCase()}`)
          embed.setDescription(`\n\nCasos:${response.cases}\nCasos Hoje:${response.todayCases}\nMortes:${response.deaths}\nMortes Hoje: ${response.todayDeaths}`)
          msg.channel.send(embed)
          }
        })
        .catch(error=> {
          console.log(error);
        })
    }
  }
  // COTACAO
  if (msg.content.startsWith("!cotacao")) {
    const moeda = msg.content.split(' ')[1]
    if (moeda === 'ajuda' || typeof moeda === 'undefined') {
      let embed = new Discord.MessageEmbed()
      embed.setTitle(`${emoji.emojify(':sos:')} Ajuda ${emoji.emojify(':sos:')}`)
      embed.setDescription("\n!cotacao (moeda) - Cotacao atual da moeda\nMoedas Disponiveis: Dolar, Euro, Peso, Bitcoin e Libra")
      msg.channel.send(embed)
    } 

    else if (msg.content === `!cotacao ${moeda}`) {
        console.log(moeda)
      let getData = async () => {
        let response = await axios.get(`https://api.hgbrasil.com/finance?key=${process.env.HG_KEY}/`)
        .then(response => {
          return response
        })
        .catch(error=> {
          console.log(error)
          return error
        })
        return response.data
      }
      await getData ()
        .then(response=> {
          if (moeda.toLocaleLowerCase() === 'dolar') {
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`${emoji.emojify(':currency_exchange:')} Dolar (USD)!`)
            embed.setDescription(`Cotacao do Dolar: R$${response.results.currencies.USD.buy}`)
            msg.channel.send(embed)
          } else if (moeda.toLocaleLowerCase() === 'libra') {
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`${emoji.emojify(':currency_exchange:')} Libra (GBP)!`)
            embed.setDescription(`Cotacao da Libra: R$${response.results.currencies.GBP.buy}`)
            msg.channel.send(embed)
          }
          else if (moeda.toLocaleLowerCase() === 'peso') {
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`${emoji.emojify(':currency_exchange:')} Peso Argentino (ARS)!`)
            embed.setDescription(`Cotacao do Peso: R$${response.results.currencies.ARS.buy}`)
            msg.channel.send(embed)
          }
          else if(moeda.toLocaleLowerCase() === 'euro') {
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`${emoji.emojify(':currency_exchange:')} Euro (EUR)!`)
            embed.setDescription(`Cotacao do Euro: R$${response.results.currencies.EUR.buy}`)
            msg.channel.send(embed)
          }
          else if (moeda.toLocaleLowerCase() === 'bitcoin') {
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`${emoji.emojify(':currency_exchange:')} Bitcoin (BTC)!`)
            embed.setDescription(`Cotacao do Bitcoin: R$${response.results.currencies.BTC.buy}`)
            msg.channel.send(embed)
          }
        
          else {
         console.log(`Erro moeda inexistente`)
          let embed = new Discord.MessageEmbed()
          embed.setTitle(`${emoji.emojify(':red_circle:')} ERRO!`)
          embed.setDescription(`A moeda: ${moeda} nao esta disponivel.\nPara checar as moedas disponiveis digite: !cotacao`)
          msg.channel.send(embed)
          }
        })
        .catch(error=> {
          console.log(error);
        })
    }
  }
    
    }
    )
client.login(process.env.DISCORD_KEY);