import type { IGalleryImage } from "~/types"
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db } from "~/libs/firebase"
import { useNotificationStore } from "./notification"
import { deleteFile } from "~/services/uploadFile"

interface IGalleryStore {
    gallery: IGalleryImage[]
}

export const useGalleryStore = defineStore('gallery', {
    state: (): IGalleryStore => ({
        gallery: []
    }),

    actions: {
        async getGallerySectionItems() {
            try {
                const q = query(collection(db, "gallery"))
                const rezult = await getDocs(q)
                rezult.forEach((doc) => {
                    this.gallery.push({id: doc.id, ...doc.data()} as IGalleryImage) 
                })
                
            } catch (error) {
                console.log(error)
            }
        },
        async AddGallerySectionItem(item: IGalleryImage) {
            const notify = useNotificationStore()
            try {
                const docRef = await addDoc(collection(db, "gallery"), item)
                item.id = docRef.id
                this.gallery.push(item)
                notify.SetNofication("Success", "Image is successfully added", "success")
            } catch (error) {
                notify.SetNofication("Error", `Error add service item. error: ${error}`, "error")
            }
        },
        async deleteGallerySectionItem(item: IGalleryImage) {
            const notify = useNotificationStore()
            try {
                const docRef = doc(db, "gallery", item.id as string)
                deleteDoc(docRef).then(() => {
                    this.gallery = this.gallery.filter(s => s.id != item.id)
                    deleteFile(`images/gallery/${item.image.match('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')?.[0]}`)
                    notify.SetNofication("Success", "Image item is successfully deleted", "success")
                })
            } catch (error) {
                notify.SetNofication("Error", `Error delete service item. error: ${error}`, "error")
            }
        },
    }
})