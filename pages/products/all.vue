<script setup lang="ts">

const productsStore = useProductsStore() 
const { products } = storeToRefs(productsStore)

definePageMeta({
    layout: 'product',
})
</script>

<template>
    <section class="products-section">
        <ul class="product-list">
            <li class="product-item"
                v-for="product in products"
                :key="product.id"
            >
                <UIProductCard :product="product" />
            </li>
        </ul>
    </section>
</template>

<style scoped>

.products-section {
    display: flex;
    justify-content: center;
    padding: 50px 5px;
}
.product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    /* max-width: 1024px; */
    gap: 20px;
}

.product-item {
    min-width: 300px;
    margin-bottom: 0;
}
</style>