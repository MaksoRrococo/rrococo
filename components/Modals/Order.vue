<script setup lang="ts">
import type { IMail, IOrderMail, IProduct } from '~/types';
import dayjs from 'dayjs'

interface Props {
    product: IProduct
    show: boolean
}

interface ISubmitedForm {
    name: string
    phone: string
    email: string
    comment?: string | undefined | null 
    accept: boolean
}

const mailStore = useMailStore()

const props = defineProps<Props>()
const emits = defineEmits(['close', 'orderDone'])

const orderModal = ref<HTMLDivElement>()

onClickOutside(orderModal, e => {
    emits('close')
})

const submitFormHandler = async (values: ISubmitedForm) => {
	const dateTime = new Date()
    const mail: IMail<IOrderMail> = {
        type: 'order',
        isRead: false,
        mail: {
            username: values.name,
            email: values.email,
            phone: values.phone,
            comment: values.comment || '',
            productTitle: props.product.title,
            price: props.product.price,
            size: props.product.size,
            date: dayjs(dateTime).format('DD.MM.YYYY hh:mm') 
        }
    }

    await $fetch('/api/order', {
        method: 'POST',
        body: mail.mail
    })

    await mailStore.AddMailItem(mail)

    emits('orderDone')
}
</script>

<template>
   	<div  class="popup" :class="{'popup_show' : show}" >
		<div class="popup__wrapper">
			<div class="popup__content" ref="orderModal">
				<button data-close type="button" class="popup__close"></button>
				<div class="popup__body">
					<div class="popup__head">
						<h3 class="popup__title">
							Оформление заказа
						</h3>
						<div class="popup__decor">
							<img src="~/assets/img/decor-image/decor-3.svg" alt="decor">
						</div>
					</div>
					<div class="popup__product product-item">
						<div class="product-item__img">
							<img :src="product.image" alt="product">
						</div>
						<div class="product-item__body">
							<div class="product-item__name">
								{{product.title}}
							</div>
							<div class="product-item__text">
								{{product.description}}
							</div>
							<div class="product-item__size-block">
								<div class="product-item__size-title">
									Размер:
								</div>
								<div class="product-item__size">
									{{product.size}} см
								</div>
							</div>
							<div class="product-item__price-block">
								<div class="product-item__price-title">
									Стоимость:
								</div>
								<div class="product-item__price">
									от <span>{{product.price}} ₴</span>
								</div>
							</div>
							<!-- <button type="button" class="product-item__delete">
								<span>Удалить товар</span>
								<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clip-path="url(#clip0_279_3499)">
										<path d="M10.5292 0.632591L9.94314 0.0478516L5.47479 4.50768L1.00642 0.0478516L0.42041 0.632591L4.88878 5.09245L0.42041 9.55197L1.00642 10.1367L5.47479 5.67718L9.94314 10.1367L10.5292 9.55197L6.06049 5.09245L10.5292 0.632591Z" fill="#EB6363" />
									</g>
									<defs>
										<clipPath id="clip0_279_3499">
											<rect width="10.1088" height="10.1088" fill="white" transform="translate(0.42041 0.0377197)" />
										</clipPath>
									</defs>
								</svg>
							</button> -->
						</div>
					</div>
                    <LandingOrderForm @submit-form="submitFormHandler"/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>