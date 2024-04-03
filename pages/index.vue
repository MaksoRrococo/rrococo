<script setup lang="ts">
import { initSliders } from '../utils/init_sliders'
import { tabs } from '../utils/init_tabs'
import { menuInit } from '../utils/main_menu'
import AOS from 'aos'

import 'aos/dist/aos.css'

const contactsStore = useContactsStore()
const galleryStore = useGalleryStore()
const productsStore = useProductsStore()
const testimonialsStore = useTestimonialsStore()
const quaestionsStore = useQuestionsStore()

const { questions } = storeToRefs(quaestionsStore)


const isVideoEnabled = ref<boolean>(false)

const { width } = useWindowSize()

onMounted(() => {
	AOS.init({ 
		offset: 100,
		disable: 'mobile'
		
	})
    initSliders()
	tabs()
	menuInit()
})

</script>

<template>
    <section id="promo" class="promo">
				<div class="promo__socials socials-head" data-aos="fade-left">
					<div class="socials-head__text">
						<span>{{ $t('promo.contact').toUpperCase() }}</span>
						<svg width="12" height="30" viewBox="0 0 12 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.46967 29.5303C5.76256 29.8232 6.23744 29.8232 6.53033 29.5303L11.3033 24.7574C11.5962 24.4645 11.5962 23.9896 11.3033 23.6967C11.0104 23.4038 10.5355 23.4038 10.2426 23.6967L6 27.9393L1.75736 23.6967C1.46447 23.4038 0.989592 23.4038 0.696698 23.6967C0.403805 23.9896 0.403805 24.4645 0.696698 24.7574L5.46967 29.5303ZM5.25 -3.27835e-08L5.25 29L6.75 29L6.75 3.27835e-08L5.25 -3.27835e-08Z" fill="url(#paint0_linear_6_126)" />
							<defs>
								<linearGradient id="paint0_linear_6_126" x1="13" y1="27.3429" x2="5.08342" y2="4.32522" gradientUnits="userSpaceOnUse">
									<stop stop-color="#FFEACB" />
									<stop offset="0.484848" stop-color="#E9C99F" />
									<stop offset="1" stop-color="#C9AD88" />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<ul class="socials-head__list">
						<li class="socials-head__item"
							v-for="social in contactsStore.socials"
							:key="social.id"
						>
							<UISocialIcon :social="social.social" :link="social.link"/>
						</li>
					</ul>
				</div>
				<div class="promo__container">
					<div class="promo__body">
						<h3 class="promo__subtitle" data-aos="fade-up">
							{{ $t('promo.description').toUpperCase() }}
						</h3>
						<h1 class="promo__title" data-aos="fade-right">
							RROCOCO
						</h1>
						<div class="promo__image">
							<div class="promo__decor">
								<picture><source srcset="~/assets/img/promo-decor.webp" type="image/webp"><img src="~/assets/img/promo-decor.png" alt="decor"></picture>
							</div>
							<div v-prlx class="promo__rose-1">
								<picture data-not-lazy><source srcset="~/assets/img/rose-1.webp" type="image/webp"><img src="~/assets/img/rose-1.png" alt="rose"></picture>
							</div>
							<div v-prlx class="promo__rose-2">
								<picture data-not-lazy><source srcset="~/assets/img/rose-2.webp" type="image/webp"><img src="~/assets/img/rose-2.png" alt="rose"></picture>
							</div>
							<div class="promo__img">
								<picture><source srcset="~/assets/img/promo-girl.webp" type="image/webp"><img src="~/assets/img/promo-girl.png" alt="girl"></picture>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id="view" class="view">
				<svg class="svg-bg">
					<clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
						<path d="M0,0.052 L0.062,0.041 L0.124,0.032 L0.187,0.023 L0.249,0.016 L0.311,0.01 L0.374,0.005 L0.437,0.001 L0.469,0 H0.486 L0.5,0.026 L0.513,0 H0.529 L0.561,0.001 L0.625,0.005 L0.688,0.009 L0.75,0.016 L0.813,0.023 L0.876,0.031 L0.938,0.041 L1,0.052 V0.98 C1,0.98,0.695,1,0.5,1 C0.305,1,0,0.98,0,0.98 V0.052">
						</path>
					</clipPath>
				</svg>
				<svg class="svg-bg-mob">
					<clipPath id="my-clip-path-mob" clipPathUnits="objectBoundingBox">
						<path d="M0,0.032 L0.231,0.01 L0.372,0.003 L0.447,0.001 L0.471,0.001 L0.5,0.026 L0.529,0.001 H0.56 L0.623,0.003 L0.747,0.01 L1,0.032 V0.981 C1,0.981,0.695,1,0.5,1 C0.305,1,0,0.981,0,0.981 V0.032">
						</path>
					</clipPath>
				</svg>
				<div class="view-content">
					<div class="view__body">
						<div class="view__head head-section head-section--gold">
							<h2 class="head-section__title">
								{{ $t('view.header') }}
							</h2>
							<h4 class="head-section__subtitle">
								{{ $t('view.description') }}
							</h4>
							<div class="head-section__decor decor-mini">
								<img src="~/assets/img/decor-image/decor-1.svg" alt="decor">
							</div>
						</div>
						<div class="view__images" >
							<!-- <LandingViewSlider v-if="width < 800" /> -->
							<LandingCircularSlider data-aos="zoom-in" />
							
						</div>
						<!-- <button type="button" class="view__button">
							<img src="~/assets/img/view/icon-360.svg" alt="icon-360">
						</button> -->
					</div>
				</div>
			</section>
			<section id="about" class="about">
				<div class="about__container">
					<div class="about__head head-section">
						<h2 class="head-section__title">
							{{ $t('about.header') }}
						</h2>
						<h4 class="head-section__subtitle">
							{{ $t('about.description') }}
						</h4>
						<div class="head-section__decor">
							<img src="~/assets/img/decor-image/decor-2.svg" alt="decor">
						</div>
					</div>
					<div class="about__body">
						<div class="about__images" data-aos="fade-right">
							<div class="about__img">
								<picture><source srcset="~/assets/img/about-img.webp" type="image/webp"><img src="~/assets/img/about-img.png" alt="about-img"></picture>
							</div>
							<div v-prlx class="about__img-decor">
								<picture><source srcset="~/assets/img/about-decor.webp" type="image/webp"><img src="~/assets/img/about-decor.png" alt="about-decor"></picture>
							</div>
						</div>
						<div class="about__content" data-aos="fade-left">
							<div class="about__text">
								<p>
									{{ $t('about.p1') }}
								</p>
								<p>
									{{ $t('about.p2') }}
								</p>
							</div>
							<div class="about__bottom">
								<a href="#products" type="button" class="about__btn btn">
									<span>{{ $t('buttons.create_order') }}</span>
								</a>
								<a href="#questions" class="about__link">
									{{ $t('buttons.questions') }}
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section class="advantages">
				<div class="advantages__container">
					<div class="advantages__head head-section head-section--gold">
						<h2 class="head-section__title">
							{{ $t('advantages.header') }}
						</h2>
						<h4 class="head-section__subtitle">
							{{ $t('advantages.description') }}
						</h4>
						<div class="head-section__decor">
							<img src="~/assets/img/decor-image/decor-3.svg" alt="decor">
						</div>
					</div>
					<div class="advantages__slider swiper" :class="{'visible': width > 650}" >
						<div class="advantages__wrapper swiper-wrapper">
							<LandingAdvantagesWithTitl v-if="width > 650"/>
							<LandingAdvantages v-else />
						</div>
						<div class="swiper-scrollbar"></div>
						<div class="swiper-pagination"></div>
					</div>
					<a href="#products" class="advantages__btn btn">
						<span>{{ $t('buttons.create_order') }}</span>
					</a>
				</div>
			</section>
			<section id="video" class="video">
				<div v-prlx class="video__decor">
					<picture><source srcset="~/assets/img/video-decor.webp" type="image/webp"><img src="~/assets/img/video-decor.png" alt="decor"></picture>
				</div>
				<div class="video__decor-2">
					<picture><source srcset="~/assets/img/video-decor-2.webp" type="image/webp"><img src="~/assets/img/video-decor-2.png" alt="decor"></picture>
				</div>
				<div class="video__container" >
					<div class="video__head head-section">
						<h2 class="head-section__title">
							{{ $t('video.header') }}
						</h2>
						<h4 class="head-section__subtitle">
							{{ $t('video.description') }}
						</h4>
						<div class="head-section__decor">
							<img src="~/assets/img/decor-image/decor-2.svg" alt="decor">
						</div>
					</div>
					<div class="video__body" :class="{'video-enabled' : isVideoEnabled}" >
						<div class="video__video-block">
							<iframe :src="contactsStore.additionalInfo?.portfolioUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
							</iframe>
						</div>
						<div class="video__video-preloader">
							<picture><source srcset="~/assets/img/video-preloader.webp" type="image/webp"><img src="~/assets/img/video-preloader.jpg" alt="img"></picture>
							<button type="button" class="video__video-play" @click="isVideoEnabled = true">
								<svg width="28" height="31" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M27 13.7679C28.3333 14.5377 28.3333 16.4623 27 17.2321L3.75 30.6554C2.41667 31.4252 0.749998 30.463 0.749999 28.9234L0.75 2.07661C0.75 0.537005 2.41667 -0.425246 3.75 0.344554L27 13.7679Z" fill="#84663E" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</section>
			<section id="products" class="products">
				<div class="products__container">
					<div class="products__head head-section head-section--gold">
						<h2 class="head-section__title">
							{{ $t('products.header') }}
						</h2>
						<h4 class="head-section__subtitle">
							{{ $t('products.description') }}
						</h4>
						<div class="head-section__decor">
							<img src="~/assets/img/decor-image/decor-3.svg" alt="decor">
						</div>
					</div>
					<div class="products__slider swiper">
						<div class="products__wrapper swiper-wrapper">
							<LandingProductCard 
								v-for="product in productsStore.products"
								:key="product.id"
								:product="product"
							/>
						</div>
						<div class="swiper-scrollbar"></div>
						<div class="swiper-pagination"></div>
					</div>
					<NuxtLink to="/products/all" class="products__more btn" 
						v-if="productsStore.products.length > 5" >
					
						<span>{{ $t('buttons.more') }}</span>
					</NuxtLink>
				</div>
			</section>
			<section class="gallery">
				<div v-prlx class="gallery__decor">
					<picture><source srcset="~/assets/img/gallery/gallery-decor.webp" type="image/webp"><img src="~/assets/img/gallery/gallery-decor.png" alt="gallery-decor"></picture>
				</div>
				<div class="gallery__container">
					<div class="gallery__head head-section">
						<h2 class="head-section__title">
							{{ $t('gallery.header') }}
						</h2>
						<h4 class="head-section__subtitle">
							{{ $t('gallery.description') }}
						</h4>
						<div class="head-section__decor">
							<img src="~/assets/img/decor-image/decor-2.svg" alt="decor">
						</div>
					</div>
					<div class="gallery__slider swiper">
						<div class="gallery__wrapper swiper-wrapper">
							<div class="gallery__slide swiper-slide" 
								v-for="slide in galleryStore.gallery"
								:key="slide.id"
							>
								<div class="gallery__slide-img">
									<img :src="slide.image" alt="image">
								</div>
							</div>
						</div>
						<div class="swiper-scrollbar"></div>
						<div class="swiper-pagination"></div>
					</div>
				</div>
			</section>
			<section class="info">
				<div v-prlx class="info__decor">
					<picture><source srcset="~/assets/img/info-decor.webp" type="image/webp"><img src="~/assets/img/info-decor.png" alt="info-decor"></picture>
				</div>
				<div class="info__body">
					<div class="info__content">
						<h2 class="info__title">
							{{ $t('info.header') }}
						</h2>
						<div class="info__text" data-aos="fade-rigth">
							<p>
								{{ $t('info.p1') }}
							</p>
							<p>
								{{ $t('info.p2') }}
							</p>
						</div>
						<div class="info__bottom">
							<a href="#products" class="info__btn btn">
								<span>{{ $t('buttons.create_order') }}</span>
							</a>
							<a href="#questions" class="info__link">
								{{ $t('buttons.questions') }}
							</a>
						</div>
					</div>
					<div class="info__img" data-aos="fade-left">
						<picture>
							<source srcset="~/assets/img/info-image-girl.webp" type="image/webp" media="(min-width: 1099.98px)">
							<source srcset="~/assets/img/info-image-girl-mob.webp" type="image/webp" media="(max-width: 1099.98px)">
							<source srcset="~/assets/img/info-image-girl-mob.png" media="(max-width: 1099.98px)">
							<img src="~/assets/img/info-image-girl.png" alt="info-image-girl">
						</picture>
					</div>
				</div>
			</section>
			<section id="review" class="review" v-if="testimonialsStore.testimonials.length > 1">
				<div class="review__container">
					<div class="review__head head-section">
						<h2 class="head-section__title">
							{{ $t('testimonials.header') }}
						</h2>
						<h4 class="head-section__subtitle">
							{{ $t('testimonials.description') }}
						</h4>
						<div class="head-section__decor">
							<img src="~/assets/img/decor-image/decor-2.svg" alt="decor">
						</div>
					</div>
					<div class="review__body">
						<button type="button" class="swiper-button-prev">
							<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0.292893 8.70711C-0.0976314 8.31658 -0.0976315 7.68342 0.292892 7.29289L6.65685 0.928933C7.04738 0.538409 7.68054 0.538409 8.07107 0.928933C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65686 15.0711L0.292893 8.70711ZM18 9L1 9L1 7L18 7L18 9Z" fill="#84663E" />
							</svg>
						</button>
						<div class="review__inner">
							<div class="review__slider swiper">
								<div class="review__wrapper swiper-wrapper">
									<LandingTestimonialItem 
										v-for="testim in testimonialsStore.testimonials"
										:key="testim.id"
										:testimonial="testim"
									/>
								</div>
							</div>
						</div>
						<button type="button" class="swiper-button-next">
							<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289L11.3431 0.928933C10.9526 0.538409 10.3195 0.538409 9.92893 0.928933C9.53841 1.31946 9.53841 1.95262 9.92893 2.34315L15.5858 8L9.92893 13.6569C9.53841 14.0474 9.53841 14.6805 9.92893 15.0711C10.3195 15.4616 10.9526 15.4616 11.3431 15.0711L17.7071 8.70711ZM-8.74228e-08 9L17 9L17 7L8.74228e-08 7L-8.74228e-08 9Z" fill="#84663E" />
							</svg>
						</button>
					</div>
					<div class="swiper-pagination"></div>
				</div>
			</section>
			<section class="faq">
				<div class="faq__container">
					<div class="faq__head head-section head-section--gold">
						<h2 class="head-section__title">
							{{ $t('faq.header') }}
						</h2>
						<h4 class="head-section__subtitle">
							{{ $t('faq.description') }}
						</h4>
						<div class="head-section__decor">
							<img src="~/assets/img/decor-image/decor-3.svg" alt="decor">
						</div>
					</div>
					<div class="faq__body">
						<div data-tabs="767.98" class="faq__tabs tabs">
							<nav data-tabs-titles class="tabs__navigation">
								<button type="button" class="tabs__title"
									v-for="(question, index) in questions"
									:key="question.id"
									:class="{' _tab-active': index == 0}"
								>{{question.question}}</button>
							</nav>
							<div data-tabs-body class="tabs__content">
								<div class="tabs__body"
									v-for="question in questions"
									:key="question.id"
								>
									<div class="tabs__body-title">
										{{question.answerTitle}}
									</div>
									<div class="tabs__body-text">
										{{question.answer}}
									</div>
								</div>
							</div>
						</div>
						<a href="#products" class="faq__btn btn">
							<span>{{ $t('buttons.create_order') }}</span>
						</a>
					</div>
				</div>
			</section>
			<section class="consultation" id="questions">
				<div class="consultation__container">
					<div class="consultation__body">
						<div class="consultation__info">
							<h2 class="consultation__title">
								{{ $t('consultation.header') }}
							</h2>
							<div class="consultation__text">
								<p>
									{{ $t('consultation.description') }}
								</p>
							</div>
						</div>
						<div class="consultation__content">
							<div data-prlx-mouse data-prlx-cx="100" data-prlx-cy="100" class="consultation__decor">
								<picture><source srcset="~/assets/img/consultation-decor.webp" type="image/webp"><img src="~/assets/img/consultation-decor.png" alt="consultation-decor"></picture>
							</div>
							<div class="consultation__inner">
								<LandingFeedbackForm />
							</div>
						</div>
					</div>
				</div>
			</section>
</template>

<style scoped>
.visible {
	overflow: visible;
}
</style>