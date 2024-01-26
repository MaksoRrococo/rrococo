import { v4 as uuid } from 'uuid';

type NotificationType = 'success' | 'warning' | 'info' | 'error'

interface INofication {
    title: string,
    message: string,
    type: NotificationType,
} 

interface INoficationState {
    notification : INofication | null,
    trigger: string | null
}

export const useNotificationStore = defineStore('notification', {
    state: (): INoficationState => ({
        notification: null,
        trigger: null 
    }),

    actions: {
        SetNofication(title: string, message: string, type: NotificationType) {
            this.notification = {
                title,
                message,
                type
            }
            this.trigger = uuid()
        }
    }
})