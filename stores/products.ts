import type { IProduct, IProductImage } from "~/types"
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore"
import { db } from "~/libs/firebase"
import { useNotificationStore } from "./notification"
import { deleteFile } from "~/services/uploadFile"

interface IProductsStore {
    products: IProduct[]
}

export const useProductsStore = defineStore('products', {
    state: (): IProductsStore => ({
        products: []
    }),

    getters: {
        getSomeProducts: (state) => state.products.slice(0, 5)
    },

    actions: {
        async getProducts() {
            try {
                const q = query(collection(db, "products"))
                const rezult = await getDocs(q)
                let products: IProduct[] = [] 

                rezult.forEach((doc) => {
                    products.push({id: doc.id, ...doc.data()} as IProduct) 
                })

                this.products = [...products].sort((a,b) => a.order! - b.order!)
                
            } catch (error) {
                console.log(error)
            }
        },

        async AddProduct(item: IProduct) {
            const notify = useNotificationStore()
            try {
                const docRef = await addDoc(collection(db, "products"), item)
                item.id = docRef.id
                this.products.push(item)
                notify.SetNofication("Success", "Service item is successfully added", "success")
            } catch (error) {
                notify.SetNofication("Error", `Error add service item. error: ${error}`, "error")
            }
        },

        async deleteProduct(item: IProduct) {
            const notify = useNotificationStore()
            try {
                const docRef = doc(db, "products", item.id as string)
                deleteDoc(docRef).then(() => {
                    this.products = this.products.filter(s => s.id != item.id)
                    deleteFile(`images/products/${item.image.match('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')?.[0]}`)
                    notify.SetNofication("Success", "Service item is successfully deleted", "success")
                })
            } catch (error) {
                notify.SetNofication("Error", `Error delete service item. error: ${error}`, "error")
            }
        },

        async updateProduct(item: IProduct) {
            const notify = useNotificationStore()
            try {
                const docRef = doc(db, "products", item.id as string)

                const data : Partial<IProduct> = {
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    price: item.price,
                    size: item.size,
                    video: item.video
                }

                updateDoc(docRef, data).then(() => {
                    this.products.forEach(s => {
                        if(s.id === item.id) {
                            s.id = item.id
                            s.title = item.title
                            s.description = item.description
                            s.image = item.image
                            s.price = item.price
                            s.size = item.size
                            s.video = item.video
                        }
                    })
                    notify.SetNofication("Success", "Service item is successfully updated", "success")
                })
            } catch (error) {
                notify.SetNofication("Error", `Error update service item. error: ${error}`, "error")
            }
        },

        async saveProductsItemsOrder() {
            let newOrder = 0
            for await (const product of this.products) {
                try {
                    const docRef = doc(db, "products", product.id as string)
    
                    const data : Partial<IProduct> = {
                        order: newOrder
                    }
                   
                   await updateDoc(docRef, data)

                   newOrder++
                } catch {

                }
            }
        },

        async AddVideoToProduct(src: string, id: string) {
            const notify = useNotificationStore()

            try {
                const docRef = doc(db, "products", id as string)

                const data : Partial<IProduct> = {
                   video: src
                }

                updateDoc(docRef, data).then(() => {
                    this.products.forEach(s => {
                        if(s.id === id) {
                           s.video = src
                        }
                    })
                    notify.SetNofication("Success", "Service item is successfully updated", "success")
                })    
            } catch (error) {
                
            }
        },

        async AddProductImage(item: IProductImage) {
            const notify = useNotificationStore()
            try {
                const docRef = await addDoc(collection(db, "productImages"), item)
                item.id = docRef.id
                this.products.forEach(p => {
                    if(p.id === item.productId) {
                        p.images?.push(item)
                    }
                })
                notify.SetNofication("Success", "Image is successfully added", "success")
            } catch (error) {
                notify.SetNofication("Error", `Error add service item. error: ${error}`, "error")
            }
        },

        async deleteProductImage(item: IProductImage) {
            const notify = useNotificationStore()
            try {
                const docRef = doc(db, "productImages", item.id as string)
                deleteDoc(docRef).then(() => {
                    this.products.forEach(p => {
                        if(p.id === item.productId) {
                            p.images?.filter(i => i.id != item.id)
                        }
                    })
                    deleteFile(`images/product_images/${item.image.match('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')?.[0]}`)
                    notify.SetNofication("Success", "Image item is successfully deleted", "success")
                })
            } catch (error) {
                notify.SetNofication("Error", `Error delete service item. error: ${error}`, "error")
            }
        },

        async getImagesToProduct() {
            try {
                const images: IProductImage[] = []
                const q = query(collection(db, "productImages"))
                const rezult = await getDocs(q)
                rezult.forEach((doc) => {
                    images.push({id: doc.id, ...doc.data()} as IProductImage) 
                })

                images.forEach(i => {
                    this.products.forEach(p => {
                        if(p.id === i.productId) {
                            p.images?.push(i)
                        }
                    })
                })
                
            } catch (error) {
                console.log(error)
            }
        },
    }
})