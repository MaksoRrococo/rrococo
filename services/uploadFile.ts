import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '~/libs/firebase'

export const uploadFile = (file: File, path: string, callback: Function) => {
    const fileRef = ref(storage, path)

    uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            callback(url)
        })
    })

}

export const deleteFile = (path: string) => {
    const desertRef = ref(storage, path)

    deleteObject(desertRef).then(() => {
        console.log('ok')
    })
}