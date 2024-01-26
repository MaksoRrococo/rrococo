import bot from '~/libs/telegrambot'
import { IBotUser } from '~/types';
import { AddUserToBot, getUsersBot } from '~/services/bot';

const PASSWORD = 'V0SqEIJvvbwaINAchjXV'

export default defineEventHandler((event) => {
    bot.on('text', async msg => {

        try {
            if(msg.text == '/start') {
            
                await bot.sendMessage(msg.chat.id, `Бот запущен! Подпишитесь на уведомления коммандой subscribe <пароль>`);
            } else if(msg.text?.startsWith('subscribe')) {
                const botUsers = await getUsersBot()
                let isUser = false

                botUsers?.forEach(u => {
                    if(u.chatId === msg.chat.id) {
                        isUser = true
                    }
                })

                if(!isUser) {
                    const password = msg.text.slice(10)
                    if(password === PASSWORD) {
                        const user:IBotUser = {
                            username: msg.from?.username as string,
                            chatId: msg.chat.id 
                        }
    
                        await AddUserToBot(user)
                        await bot.sendMessage(msg.chat.id, `Подписка успешно оформлена!`);
    
                    } else {
                        await bot.sendMessage(msg.chat.id, `Неверный пароль!`);
                    }
                } else {
                    await bot.sendMessage(msg.chat.id, `Вы уже успешно подписаны`);
                }
               
            }
        } catch (error) {
            console.log(error)
        }
    
    })
})