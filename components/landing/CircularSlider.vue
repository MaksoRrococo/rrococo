<script setup lang="ts">
import { Slider } from '~/utils/circular_slider'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const circularSlider = ref<HTMLDivElement>()

onMounted(() => {
	const slider = new Slider(circularSlider.value!)
})

</script>

<template>
	<div class="slider" ref="circularSlider">
		<el-button  class="slider__list__step-button slider__list__step-button_prev" data-slider-step-button="-1" :icon="ArrowLeft" circle />
		<ul class="slider__list" data-slider-list>
			<li class="slider__list__item">
				<img src="~/assets/img/view/image-1.png" alt="image 1">
			</li>
			<li class="slider__list__item">
				<img src="~/assets/img/products/product-2.png" alt="image 2">
			</li>
			<li class="slider__list__item">
				<img src="~/assets/img/view/image-3.png" alt="image 3">
			</li>
		</ul>
		<el-button  class="slider__list__step-button slider__list__step-button_next" data-slider-step-button="1" :icon="ArrowRight" circle />
	</div>
</template>

<style scoped>


.slider {
  position: relative;
  top: -100px;
  height: 77vh;
  width: 100%;
  max-width: 1080px;
  /* overflow: hidden; */
}

.slider__list {
  position: relative;
  list-style: none;
  width: 100%;
  height: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider__list__item {
  position: absolute;
  width: 15em;
  height: 15em;
  transition: transform 0.5s;
  transform: 
    translateX(calc(var(--cos) * var(--radius-x)))
    translateY(calc(var(--sin) * var(--radius-y)))
    scale(calc(var(--scale) * 2))
  ;
}

.slider__list__item img {
	width: 15em;
  	height: 15em;
}

.slider__list__step-button {
   position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
} 

.slider__list__step-button_prev {
  left: -50px;
}

.slider__list__step-button_next {
  right: -50px;
}

@media screen and (max-width: 1200px){
  .slider__list__step-button_prev {
  left: 5px;
}

.slider__list__step-button_next {
  right: 5px;
}
}

@media screen and (max-width: 770px){
    .slider {
        height: 65vh;
    }
    .slider__list__step-button_next {
        right: 10px;
    }

    .slider__list__item {
        width: 10em;
        height: 10em;
    }

    .slider__list__item img {
        width: 10em;
        height: 10em;
    }
    
}

@media screen and (max-width: 660px) {
    .slider {
        top: -150px;
    }
    .slider__list__item {
        width: 8em;
        height: 8em;
    }

    .slider__list__item img {
        width: 8em;
        height: 8em;
    }
    

    .slider__list__step-button {
        top: 70%;
    }
}
</style>