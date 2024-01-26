import TelegramBot from 'node-telegram-bot-api'

const API_TOKEN = '6798665186:AAHShLHhqT8N8ZAlZ0CHDGx4LYE_rCm1W_Q'

const bot = new TelegramBot(API_TOKEN, {
    polling: {
        interval: 300,
        autoStart: true
      }
})

// import {Telegraf} from 'telegraf'

// const bot = new Telegraf('6798665186:AAHShLHhqT8N8ZAlZ0CHDGx4LYE_rCm1W_Q')

export default bot