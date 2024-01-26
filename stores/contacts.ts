import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db } from "~/libs/firebase"
import { useNotificationStore } from "./notification"
import type { IAdditionalInfo, ISocialsContacts } from "~/types"

interface IContactsStore {
    socials: ISocialsContacts[]
    additionalInfo: IAdditionalInfo | null
}

export const useContactsStore = defineStore('contacts', {
    state: (): IContactsStore => ({
        socials: [],
        additionalInfo: null
    }),

    actions: {
        async getAdditionalInfo() {
            try {
                const q = query(collection(db, "additionalInfo"))
                const rezult = await getDocs(q)

                rezult.forEach((doc) => {
                    this.additionalInfo = { id: doc.id, ...doc.data() } as IAdditionalInfo
                })
                
            } catch (error) {
                console.log(error)
            }
        },

        async updateAdditionalInfo(item : IAdditionalInfo) {
            const notify = useNotificationStore()
            const docRef = doc(db, "additionalInfo", item.id as string)

            const data: Partial<IAdditionalInfo> = {
                tel: item.tel,
                portfolioUrl: item.portfolioUrl
            }

            updateDoc(docRef, data).then(() => {
                if(this.additionalInfo) { 
                    this.additionalInfo.tel = item.tel
                    this.additionalInfo.portfolioUrl = item.portfolioUrl
                } 
                notify.SetNofication("Success", "Aditional Info section is successfully updated", "success")
            }) 
        },

        //SOCIALS

        async getSocialsItems() {
            try {
                const q = query(collection(db, "socials"))
                const rezult = await getDocs(q)

                rezult.forEach((doc) => {
                    this.socials.push({id: doc.id, ...doc.data()} as ISocialsContacts) 
                })
                
            } catch (error) {
                console.log(error)
            }
        },

        async AddSocialItemItem(item: ISocialsContacts) {
            const notify = useNotificationStore()
            try {
                const docRef = await addDoc(collection(db, "socials"), item)
                item.id = docRef.id
                this.socials.push(item)
                notify.SetNofication("Success", "Social item is successfully added", "success")
            } catch (error) {
                notify.SetNofication("Error", `Error add service item. error: ${error}`, "error")
            }
        },

        async deleteSocialItem(item: ISocialsContacts) {
            const notify = useNotificationStore()
            try {
                const docRef = doc(db, "socials", item.id as string)
                deleteDoc(docRef).then(() => {
                    this.socials = this.socials.filter(s => s.id != item.id)
                    notify.SetNofication("Success", "Social item is successfully deleted", "success")
                })
            } catch (error) {
                notify.SetNofication("Error", `Error delete service item. error: ${error}`, "error")
            }
        },

        async updateSocialItem(item: ISocialsContacts) {
            const notify = useNotificationStore()
            try {
                const docRef = doc(db, "socials", item.id as string)

                const data : Partial<ISocialsContacts> = {
                    social: item.social,
                    link: item.link,
                }

                updateDoc(docRef, data).then(() => {
                    this.socials.forEach(s => {
                        if(s.id === item.id) {
                            s.link = item.link
                            s.social = item.social
                        }
                    })
                    notify.SetNofication("Success", "Service item is successfully updated", "success")
                })
            } catch (error) {
                notify.SetNofication("Error", `Error update service item. error: ${error}`, "error")
            }
        },
    }
})