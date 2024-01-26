<template>
    <div class="auth-page">
        <slot />
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.auth-page {
    height: 100dvh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>