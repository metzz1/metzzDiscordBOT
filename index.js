const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')
const emoji = require('node-emoji')

require('dotenv').config()
client.on('ready', () => {
  console.log(`${emoji.emojify('Made w/ :heart:')}\nLogado como: ${client.user.tag}`);
});

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
    
    }
    )
client.login(process.env.DISCORD_KEY);