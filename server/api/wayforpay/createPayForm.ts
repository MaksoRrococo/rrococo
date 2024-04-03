import { createPaymentForm } from "~/services/wayforpay"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const html_form = await createPaymentForm({
        price: body.price,
        buttonTitle: body.buttonTitle,
        orderId: body.orderId,
        currency: body.currency,
        productName: body.productName,
        clientName: body.clientName,
        clientEmail: body.clientEmail
    })

    return html_form
})