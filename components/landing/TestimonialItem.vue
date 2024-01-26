<script setup lang="ts">
import type { ITestimonial } from '~/types';

interface Props {
    testimonial: ITestimonial
}

const props = defineProps<Props>()
</script>

<template>
   	<div class="review__slide swiper-slide">
		<div class="review__slide-text">
            <div class="testimonial">
                <div class="client">{{testimonial.clientName}}</div>
                <div>{{testimonial.jobTitle}}</div>
                <div class="content">{{testimonial.testimonial}}</div>
            </div>
		</div>
	</div>
</template>

<style scoped>
.testimonial {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
}

.client {
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 10px;
}

.content {
    margin-top: 10px;
    font-style: italic;
}
</style>