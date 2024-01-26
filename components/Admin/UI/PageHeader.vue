<script setup lang="ts">
interface Props {
    title: string
}

defineProps<Props>()
</script>

<template>
    <div class="setting-header">
        <h2>{{title}}</h2>
    </div>
</template>

<style scoped>
.setting-header {
    font-size: 25px;
    font-weight: 700;
    padding-bottom: 20px;
}
</style>