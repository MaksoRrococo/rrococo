<script setup lang="ts">

interface Props {
    name: string
}

const props = defineProps<Props>() 

const icon = computed(() => {
    return resolveComponent(`Icons${props.name}`)
})
</script>

<template>
    <component :is="icon"/>
</template>

<style scoped>

</style>