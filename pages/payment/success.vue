<script setup lang="ts">


definePageMeta({
    layout: 'product',
})
</script>

<template>
    <div class="page">
        <div class="page-content">
            <div class="success">{{$t('pay_result.success') }}</div>
            <div>{{$t('pay_result.comment') }}</div>
        </div>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    height: calc(100vh - 417px);
    align-items: center;
    justify-content: center;
}

.page-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.success{
    font-size: 24px;
    color: green;
    padding-bottom: 10px;
}
</style>