import { getUsersBot } from '~/services/bot'
import bot from '~/libs/telegrambot'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const botUsers = await getUsersBot()

    if(botUsers) {
       for await (let user of botUsers) {
        bot.sendMessage(user.chatId, `
            'Пользователь сделал заказ:'

            Имя: ${body.username}
            Email:  ${body.email}
            Tel:    ${body.phone}
            Пожелания: ${body.comment}
            Товар: ${body.productTitle}
            Цена: ${body.price}
            Размеры: ${body.size}
            Дата: ${body.date}
            ID Заказа : ${body.orderId}
            Статус: Ожидание оплаты 
        `)
       }
    }

})