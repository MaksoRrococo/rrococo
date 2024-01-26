<script setup lang="ts">
interface Props {
    max: number
    cls?: string
    perspective: number
    reverse: boolean
}

const props = withDefaults(defineProps<Props>(), {
    max: 30,
    perspective: 900,
    reverse: false
})

const el = ref<HTMLElement>()
const timer = ref<ReturnType<typeof setTimeout>| null>(null)

const reverseValue = computed(() => {
    return props.reverse ? -1 : 1
})

const getPosition = (el: HTMLElement) => {
    const box = el.getBoundingClientRect();
      return {
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height
      }
}

const toggleTransition = () => {
      if (timer.value) clearTimeout(timer.value);
      
      el.value!.style.transition = `
        all 150ms linear
      `;
      timer.value = setTimeout(() => {
        el.value!.style.transition = '';
      }, 150);
}

const enter = () => {
    toggleTransition();
}

const move = (e: MouseEvent) => {
      const pos = getPosition(el.value!);
      
      let x = Math.min( (e.clientX - pos.left) / el.value!.offsetWidth, 1);
      let y = Math.min( (e.clientY - pos.top) / el.value!.offsetHeight, 1);
      
      let X = reverseValue.value * (props.max / 2 - x * props.max);
      let Y = reverseValue.value * (y * props.max - props.max / 2);
      
      el.value!.style.transform = `
        perspective(${props.perspective}px) rotateX(${Y}deg) rotateY(${X}deg)
      `;
}

const leave = (e: MouseEvent) => {
      toggleTransition()
      
      el.value!.style.transform = `
        perspective(${props.perspective}px) rotateX(0) rotateY(0)
      `
}

</script>

<template>
    <div class="titl" ref="el" :class="cls" @mouseenter="enter" @mousemove="move" @mouseleave="leave">
        <slot></slot>
    </div>
</template>

<style scoped>

</style>