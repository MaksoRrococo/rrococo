<script setup lang="ts">


definePageMeta({
    layout: 'product',
})
</script>

<template>
    <div class="page">
        <div class="page-content">
            <div class="fail">{{$t('pay_result.fail') }}</div>
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

.fail{
    font-size: 24px;
    color: red;
    padding-bottom: 10px;
}
</style>