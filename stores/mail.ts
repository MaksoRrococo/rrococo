import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db } from "~/libs/firebase"
import { useNotificationStore } from "./notification"
import type { IMail,IContactMail, IOrderMail } from "~/types"

type TMailType = IOrderMail | IContactMail

interface IMailStore {
    mails: IMail<TMailType>[]
}

export const useMailStore = defineStore('mail', {
    state: (): IMailStore => ({
        mails: []
    }),

    actions: {
        
        async getMailsItems() {
            try {
                const q = query(collection(db, "mails"))
                const rezult = await getDocs(q)

                rezult.forEach((doc) => {
                    this.mails.push({id: doc.id, ...doc.data()} as IMail<TMailType>) 
                })
                
            } catch (error) {
                console.log(error)
            }
        },

        async AddMailItem(item: IMail<TMailType>) {
            const notify = useNotificationStore()
            try {
                const docRef = await addDoc(collection(db, "mails"), item)
                item.id = docRef.id
                this.mails.push(item)
                if(item.type != 'order') {
                    notify.SetNofication("Success", "Message send", "success")
                }          
            } catch (error) {
                notify.SetNofication("Error", `Error add service item. error: ${error}`, "error")
            }
        },

        async deleteMail(item: IMail<TMailType>) {
            const notify = useNotificationStore()
            try {
                const docRef = doc(db, "mails", item.id as string)
                deleteDoc(docRef).then(() => {
                    this.mails = this.mails.filter(s => s.id != item.id)
                    notify.SetNofication("Success", "Mail is successfully deleted", "success")
                })
            } catch (error) {
                notify.SetNofication("Error", `Error delete service item. error: ${error}`, "error")
            }
        },

        async setMailIsRead(item: IMail<TMailType>) {
            const docRef = doc(db, "mails", item.id as string)

            const data: Partial<IMail<TMailType>> = {
                isRead: true
            }

            updateDoc(docRef, data).then(() => {
                this.mails.forEach(m => {
                    if(m.id === item.id) {
                        m.isRead = true
                    }
                })
            })
                
        },

        async setMailOrderIsPayed(invoiceId: string ) {
            const mailsTemp: IMail<IOrderMail>[] = []
            try {
                const q = query(collection(db, "mails"))
                const rezult = await getDocs(q)

                rezult.forEach((doc) => {
                    mailsTemp.push({id: doc.id, ...doc.data()} as IMail<IOrderMail>) 
                })

                const mail = mailsTemp.find(m => m.mail.invoiceId == invoiceId)

                if(mail) {
                    const docRef = doc(db, "mails", mail.id as string)

                    const data: Partial<IMail<Partial<IOrderMail>>> = {
                        mail: {
                            isPay: true
                        }
                    }

                    updateDoc(docRef, data).then(() => {
                        
                    })
                }
            } catch (error) {
                
            }
        }
    }
})