<script setup lang="ts">
import { Advantages } from '@/constants/advantages'

</script>

<template>
		<div class="advantages__slide swiper-slide card-advantages"
			v-for="(item, index) in Advantages"
			:key="item.id"
		>
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
				<picture><source :srcset="`/img/advantages/image-${index + 1}.webp`" type="image/webp"><img :src="`/img/advantages/image-${index + 1}.png`" alt="image-1"></picture>
			</div>
		</div>
</template>

<style scoped>

</style>