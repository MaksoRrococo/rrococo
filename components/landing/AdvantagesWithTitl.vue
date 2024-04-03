<script setup lang="ts">
import { Advantages } from '@/constants/advantages'
 
</script>

<template>
    <UITitl
		v-for="(item, index) in Advantages"
		:key="item.id"
	>
        <div class="advantages__slide swiper-slide card-advantages">
			<div class="card-advantages__number">
				{{ item.number }}
			</div>
			<div class="card-advantages__title">
				{{ $t(item.header) }}
			</div>
			<div class="card-advantages__text">
				{{ $t(item.description) }}
			</div>
			<div class="card-advantages__img">
				<picture><source :srcset="`/_nuxt/assets/img/advantages/image-${index + 1}.webp`" type="image/webp"><img :src="`/_nuxt/assets/img/advantages/image-${index + 1}.png`" alt="image-1"></picture>
			</div>
		</div>
    </UITitl>  
</template>

<style scoped>

</style>