import { getUsersBot } from '~/services/bot'
import bot from '~/libs/telegrambot'
import { setMailOrderIsPayed } from '~/services/setPayed'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const botUsers = await getUsersBot()

    if(body.transactionStatus == 'Approved') {

        await setMailOrderIsPayed(body.orderReference)

        if(botUsers) {
            for await (let user of botUsers) {
             bot.sendMessage(user.chatId, `
                 'Пользователь оплатил заказ:'
     
                 Даннные о клиенте:
                 Email:  ${body.email}
                 Tel:    ${body.phone}

                 Общая сумма: ${body.amount}
             `)
            }
         }

         await sendRedirect(event, '/payment/success')
    } else {
        await sendRedirect(event, '/payment/fail')
    }

    
})