<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'

</script>

<template>
    <div class="slider-view">
        <div class="slider-inner">
            <swiper
                :slides-per-view="1"
                :space-between="0"
            >
                    <swiper-slide>
                        <div class="item-slide">
                            <img class="image-slide" src="~/assets/img/view/image-1.png" alt="image 1">
                        </div>      
                    </swiper-slide>
                    <swiper-slide>
                        <div class="item-slide">
                            <img class="image-slide" src="~/assets/img/products/product-2.png" alt="image 2">
                        </div>         
                    </swiper-slide>
                    <swiper-slide>
                        <div class="item-slide">
                            <img class="image-slide" src="~/assets/img/view/image-3.png" alt="image 3">
                        </div>
                    </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<style scoped>
.slider-view {
    display: flex;
    justify-content: center;
    width: 100%;
}

/* .item-slide {
    display: flex;
    align-items: center;
    justify-content: center;
} */

.slider-inner {
    width: 300px;
}
.image-slide {
    width: 280px;
}
</style>