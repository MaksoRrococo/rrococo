import { addDoc, collection, getDocs, query } from "firebase/firestore"
import { db } from "~/libs/firebase"
import type { IBotUser } from "~/types"


export const AddUserToBot = async(user: IBotUser) => {
    try {
        const docRef = await addDoc(collection(db, "botUsers"), user)

       
    } catch (error) {
       
    }
}


export const getUsersBot = async () => {
    try {
        const q = query(collection(db, "botUsers"))
        const users: IBotUser[] = []
        const rezult = await getDocs(q)

        rezult.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() } as IBotUser)
        })
        
        return users
        
    } catch (error) {
        console.log(error)
    }
}