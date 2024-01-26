import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db } from "~/libs/firebase"
import { useNotificationStore } from "./notification"
import type { ITestimonial } from "~/types"

interface ITestimonialStore {
    testimonials: ITestimonial[]
}

export const useTestimonialsStore = defineStore('testimonials', {
    state: (): ITestimonialStore => ({
        testimonials: []
    }),

    actions: {
        async getTestimonialSectionItems() {
            try {
                const q = query(collection(db, "testimonials"))
                const rezult = await getDocs(q)
                rezult.forEach((doc) => {
                    this.testimonials.push({id: doc.id, ...doc.data()} as ITestimonial) 
                })
                
            } catch (error) {
                console.log(error)
            }
        },
        async AddTestimonialSectionItem(item: ITestimonial) {
            const notify = useNotificationStore()
            try {
                const docRef = await addDoc(collection(db, "testimonials"), item)
                item.id = docRef.id
                this.testimonials.push(item)
                notify.SetNofication("Success", "Testimonial item is successfully added", "success")
            } catch (error) {
                notify.SetNofication("Error", `Error add service item. error: ${error}`, "error")
            }
        },
        async deleteTestimonialSectionItem(item: ITestimonial) {
            const notify = useNotificationStore()
            try {
                const docRef = doc(db, "testimonials", item.id as string)
                deleteDoc(docRef).then(() => {
                    this.testimonials = this.testimonials.filter(s => s.id != item.id)
                    notify.SetNofication("Success", "Testimonial item is successfully deleted", "success")
                })
            } catch (error) {
                notify.SetNofication("Error", `Error delete service item. error: ${error}`, "error")
            }
        },
        async updateTestimonialSectionItem(item: ITestimonial) {
            const notify = useNotificationStore()
            try {
                const docRef = doc(db, "testimonials", item.id as string)
                    const data: Partial<ITestimonial> = {
                        clientName: item.clientName,
                        jobTitle: item.jobTitle,
                        testimonial: item.testimonial
                    }
                updateDoc(docRef, data).then(() => {
                    this.testimonials.forEach(s => {
                        if(s.id === item.id) {
                            s.clientName = item.clientName
                            s.jobTitle = item.jobTitle
                            s.testimonial = item.testimonial
                        }
                    })
                    notify.SetNofication("Success", "Testimonial item is successfully updated", "success")
                })
            } catch (error) {
                notify.SetNofication("Error", `Error update service item. error: ${error}`, "error")
            }

        }, 
    }
})