import crypto from 'crypto'

const merchantAccount = 'www_rrococo_com'
const merchantSecretKey = '9bcf569c10a1ea899268c7bf142fd8d766958f60'
const merchantDomain = 'www.rrococo.com'

const redirectUrl = 'https://www.rrococo.com/api/wayforpay/payment-status'

export type TCurrency = 'UAH' | 'EUR' | 'RUB'

export interface IWayForPayCreateFormParams {
    price: string
    buttonTitle: string
    orderId: string
    currency:  TCurrency
    productName: string
    clientName?: string
    clientEmail?: string
}

export const createPaymentForm = (params: IWayForPayCreateFormParams): string => {
    const { price, buttonTitle,  orderId, currency, productName, clientName, clientEmail }  = params

    const today = new Date()
    const orderDate = Math.floor(today.getTime() / 1000)

    const message = `${merchantAccount};${merchantDomain};${orderId};${orderDate};${price}.00;${currency};${productName};1;${price}.00`



    const hmac = crypto.createHmac('md5', merchantSecretKey)
    hmac.update(message)

    const merchantSignature = hmac.digest('hex')

  
     const HTML_FORM = `
        <form method="post" action="https://secure.wayforpay.com/pay" accept-charset="utf-8">
            <input type="hidden" name="merchantAccount" value="${merchantAccount}">
            <input type="hidden" name="merchantAuthType" value="SimpleSignature">
            <input type="hidden" name="merchantDomainName" value="${merchantDomain}">
            <input type="hidden" name="orderReference" value="${orderId}">
            <input type="hidden" name="orderDate" value="${orderDate}">
            <input type="hidden" name="amount" value="${price}.00">
            <input type="hidden" name="currency" value="${currency}">
            <input type="hidden" name="orderTimeout" value="49000">
            <input type="hidden" name="productName[]" value="${productName}">
            <input type="hidden" name="productPrice[]" value="${price}.00">
            <input type="hidden" name="productCount[]" value="1">
            <input type="hidden" name="clientFirstName" value="${clientName}">
            <input type="hidden" name="clientEmail" value="${clientEmail}">
            <input type="hidden" name="defaultPaymentSystem" value="card">
            <input type="hidden" name="merchantSignature" value="${merchantSignature}">
            <input type="hidden" name="serviceUrl" value="${redirectUrl}">
            <input type="hidden" name="apiVersion" value="2">
            <button type="submit">${buttonTitle}</button>
        </form>
    `

    return HTML_FORM
} 