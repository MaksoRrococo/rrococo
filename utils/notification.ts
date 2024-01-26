import { ElNotification } from 'element-plus'


type NotificationType = 'success' | 'warning' | 'info' | 'error'

function ShowNotification(type: NotificationType, title: string, message: string): void {
    ElNotification({
        title: title,
        message: message,
        type: type,
    })
}

export default ShowNotification