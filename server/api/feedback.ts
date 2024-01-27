import { getUsersBot } from '~/services/bot'
import bot from '~/libs/telegrambot'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const botUsers = await getUsersBot()

    if(botUsers) {
       for await (let user of botUsers) {
        bot.sendMessage(user.chatId, `
            ${body.text}
            ${body.username}
            ${body.phone}
            ${body.email}
        `)
       }
    }

})