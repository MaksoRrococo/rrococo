<script setup lang="ts">
import { initSliders } from '~/utils/init_sliders'

const route = useRoute()

const productsStore = useProductsStore()
const { products } = storeToRefs(productsStore)

const orderModalVisible = ref<boolean>(false)
const orderSuccesModalVisible = ref<boolean>(false)
const isVideoEnabled = ref<boolean>(false)

const product = computed(() => {
    return products.value.find(p => p.id === route.params.id)
})


const orderHandler = () => {
	document.documentElement.classList.add("popup-show", "lock")
	orderModalVisible.value = true
}

const orderCloseHandler = () => {
	document.documentElement.classList.remove("popup-show", "lock")
	orderModalVisible.value = false
}

const orderDoneHandler = () => {
	orderModalVisible.value = false
	orderSuccesModalVisible.value = true

	setTimeout(() => {
		orderSuccesModalVisible.value = false
		document.documentElement.classList.remove("popup-show", "lock")
	}, 5000)
}

onMounted(() => {
    initSliders()
})


definePageMeta({
    layout: 'product',
})
</script>

<template>
	<ModalsOrder 
		:product="product!" 
		:show="orderModalVisible" 
		@close="orderCloseHandler"
		@order-done="orderDoneHandler"
	/>
	<ModalsOrderSuccess :show="orderSuccesModalVisible" />
    <section class="product-page content">
		<div class="product-page__container">
			<div class="product-page__body">
				<div class="product-page__images">
					<div class="product-page__slider swiper">
						<div class="product-page__wrapper swiper-wrapper">
							<div class="product-page__slide swiper-slide slide-video" 
								:class="{'video-enabled' : isVideoEnabled}" 
								@click="isVideoEnabled = true"
								v-if="product?.video" >
								<iframe :src="product.video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
								</iframe>
								<img :src="product.image" alt="image-1">
							</div>
							<div class="product-page__slide swiper-slide"
                                v-for="slide in product?.images"
                                :key="slide.id"
                            >
								<img :src="slide.image" alt="image-1">
							</div>
						</div>
					</div>
					<div class="product-page__thumbs swiper">
						<div class="product-page__wrapper swiper-wrapper">
							<div class="product-page__slide swiper-slide">
								<img :src="product?.image" alt="image-1">
							</div>
							<div class="product-page__slide swiper-slide"
								v-for="slide in product?.images"
								:key="slide.id"
							>
								<img :src="slide.image" alt="image-1">
							</div>

						</div>
					</div>
				</div>
				<div class="product-page__content">
					<h1 class="product-page__title">
						{{product?.title}}
					</h1>
					<div class="product-page__text">
						<p>
							{{product?.description}}
						</p>
					</div>
					<div class="product-page__size size-product">
						<div class="size-product__body">
							<h4 class="size-product__title">
								Размер:
							</h4>
							<div class="size-product__size">
								{{product?.size}} см
							</div>
						</div>
						<div class="size-product__text">
							Размеры могут быть любые, уточняйте при заказе
						</div>
					</div>
					<div class="product-page__price-block price-product">
						<div class="price-product__body">
							<h4 class="price-product__title">
								Стоимость:
							</h4>
							<div class="price-product__price">
								от <span>{{product?.price}} ₴</span>
							</div>
						</div>
						<div class="price-product__text">
							Рассчитать точную стоимость при заказе поможет менеджер
						</div>
					</div>
					<div class="product-page__bottom">
						<button type="button" class="product-page__btn btn"
							@click="orderHandler"
						>
							<span>Сделать заказ</span>
						</button>
						<a href="#" class="product-page__questions" @click="navigateTo('/#questions')">
							Есть вопросы? Напишите нам и мы с радостью поможем!
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>

</style>