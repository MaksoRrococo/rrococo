export type TAdminSettingTab = 'AdminMain' | 'AdminProducts' | 'AdminServices' |
                                'AdminPricesAndServices' | 'AdminBenefits' |
                                'AdminQuestions' | 'AdminTestimonials' |
                                'AdminGallery'



export type TMailType = 'order' | 'contact'
export type TSocial = 'Viber' | 'WhatsApp' | 'Instagram' | 'Telegram' | 'Facebook' | 'Youtube'
export type TStatusPay = 'Paid' | 'Unpaid'

export interface IAdminMenuItem { 
    id: number
    text: string
    page: TAdminSettingTab
}

export interface IContactMail {
    username: string
    phone: string
    email: string
    text: string
}

export interface IOrderMail {
    username : string
    email?: string
    phone?: string
    comment?: string
    productTitle: string
    statusPay: TStatusPay
    orderId: string
    price: number
    size: string
    date: string
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

export interface IQuestion {
    id?: string
    question: string
    answerTitle: string
    answer: string
    order?: number
}

export enum PaymentAction {
    Subscribe = 'subscribe',
    Unsubscribe = 'unsubscribe',
  }
  
  export enum PaymentPeriodicity {
    Month = 'month',
    Year = 'year',
  }
  
  export enum Currency {
    UAH = 'UAH',
    USD = 'USD',
    EUR = 'EUR',
  }
  
  export enum PaymentStatus {
    Subscribed = 'subscribed',
  }
  
  export interface SubscriptionPaymentFormParams {
    action: PaymentAction;
    subscribePeriodicity: PaymentPeriodicity;
    price: number;
    currency: Currency;
    description: string;
    orderId: string;
    buttonTitle: string;
  }
  
  export interface OnUnsubscribeParams {
    action: PaymentAction.Unsubscribe;
    orderId: string;
  }