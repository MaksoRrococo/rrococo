import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db } from "~/libs/firebase"
import type { IMail, IOrderMail } from "~/types"


export const setMailOrderIsPayed = async (orderId: string ) => {
    const mailsTemp: IMail<IOrderMail>[] = []
    try {
        const q = query(collection(db, "mails"))
        const rezult = await getDocs(q)

        rezult.forEach((doc) => {
            mailsTemp.push({id: doc.id, ...doc.data()} as IMail<IOrderMail>) 
        })

        const mail = mailsTemp.find(m => m.mail.orderId == orderId)

        if(mail) {
            const docRef = doc(db, "mails", mail.id as string)

            const data: Partial<IMail<Partial<IOrderMail>>> = {
                mail: {
                    username: mail.mail.username,
                    email: mail.mail.email,
                    phone: mail.mail.phone,
                    comment: mail.mail.comment,
                    productTitle: mail.mail.productTitle,
                    statusPay: 'Paid',
                    price: mail.mail.price,
                    orderId: mail.mail.orderId,
                    size: mail.mail.size,
                    date: mail.mail.date
                }
            }

            updateDoc(docRef, data).then(() => {
                
            })
        }
    } catch (error) {
        
    }
}