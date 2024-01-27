import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db } from "~/libs/firebase"
import type { IQuestion } from "~/types"


interface IQuestionsStore {
    questions: IQuestion[]
}

export const useQuestionsStore = defineStore('questions', {
    state: (): IQuestionsStore => ({
        questions: []
    }),

    actions: {
        async getQuestionSectionItems() {
            try {
                const q = query(collection(db, "questions"))
                const rezult = await getDocs(q)
                let Items:IQuestion[] = []

                rezult.forEach((doc) => {
                    Items.push({id: doc.id, ...doc.data()} as IQuestion) 
                })

                this.questions = [...Items].sort((a,b) => a.order! - b.order!)
                
            } catch (error) {
                console.log(error)
            }
        },
        async AddQuestionSectionItem(item: IQuestion) {
            const notify = useNotificationStore()
            try {
                const docRef = await addDoc(collection(db, "questions"), item)
                item.id = docRef.id
                this.questions.push(item)
                notify.SetNofication("Success", "Question item is successfully added", "success")
            } catch (error) {
                notify.SetNofication("Error", `Error add service item. error: ${error}`, "error")
            }
        },
        async deleteQuestionSectionItem(item: IQuestion) {
            const notify = useNotificationStore()
            try {
                const docRef = doc(db, "questions", item.id as string)
                deleteDoc(docRef).then(() => {
                    this.questions = this.questions.filter(s => s.id != item.id)
                    notify.SetNofication("Success", "Question item is successfully deleted", "success")
                })
            } catch (error) {
                notify.SetNofication("Error", `Error delete service item. error: ${error}`, "error")
            }
        },
        async updateQuestionSectionItem(item: IQuestion) {
            const notify = useNotificationStore()
            try {
                const docRef = doc(db, "questions", item.id as string)
                const data : Partial<IQuestion> = {
                    question: item.question,
                    answer: item.answer,    
                }
                updateDoc(docRef, data).then(() => {
                    this.questions.forEach(s => {
                        if(s.id === item.id) {
                            s.id = item.id
                            s.question = item.question
                            s.answer = item.answer
                        }
                    })
                    notify.SetNofication("Success", "Service item is successfully updated", "success")
                })
            } catch (error) {
                notify.SetNofication("Error", `Error update service item. error: ${error}`, "error")
            }
        },

        async saveQuestionsSectionItemsOrder() {
            let newOrder = 0
            for await (const item of this.questions) {
                try {
                    const docRef = doc(db, "questions", item.id as string)
    
                    const data : Partial<IQuestion> = {
                        order: newOrder
                    }
                    
                   await updateDoc(docRef, data)

                   newOrder++
                } catch {

                }
            }
        },
    }
})