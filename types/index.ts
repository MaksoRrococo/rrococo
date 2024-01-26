export type TAdminSettingTab = 'AdminMain' | 'AdminProducts' | 'AdminServices' |
                                'AdminPricesAndServices' | 'AdminBenefits' |
                                'AdminQuestions' | 'AdminTestimonials' |
                                'AdminGallery'



export type TMailType = 'order' | 'contact'
export type TSocial = 'Viber' | 'WhatsApp' | 'Instagram' | 'Telegram' | 'Facebook'

export interface IAdminMenuItem { 
    id: number
    text: string
    page: TAdminSettingTab
}

export interface IContactMail {
    username: string
    type: string
    contact: string
}

export interface IOrderMail {
    username : string
    email?: string
    phone?: string
    // services: IServicePrice[]
    price: number
    text?: string
    invoiceId?: string
    isPay?: boolean 
    confirmation?: []
}

export interface IMail<T> {
    id?: string
    type: TMailType
    mail: T
    isRead: boolean
}

export interface ISocialsContacts {
    id?: string
    social: TSocial
    link: string
}

export interface IAdditionalInfo {
    id?: string
    tel: string
    portfolioUrl: string
}

export interface IProductSize {
    width: number
    height: number
}

export interface IProductImage {
    id?: string
    image: string
    productId: string
}

export interface IProduct {
    id?: string
    title: string
    description: string
    image: string
    images?: Array<IProductImage>
    video?: string
    size: string
    price: number
    order?: number
}

export interface IGalleryImage {
    id?: string
    image: string
}

export interface ITestimonial {
    id?: string
    clientName: string
    jobTitle: string
    testimonial: string
}

export interface IBotUser {
    id?: string
    username: string
    chatId: number
}