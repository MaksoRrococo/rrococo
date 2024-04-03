<script setup lang="ts">
import type { IProduct } from '~/types';

interface Props {
    product: IProduct
}

const props = defineProps<Props>()

</script>

<template>
    <div class="product-card">
            <div class="product-card__body">
                <div class="product-card__img">
                   <img :src="product.image" alt="product">
                </div>
                <NuxtLink :to="`/products/${product.id}`" class="product-card__name">
                    {{product.title}}
                </NuxtLink>
                <div class="product-card__text">
                  {{product.description}}
                </div>
                <div class="product-card__size-block">
                    <div class="product-card__size-info">
                        <div class="product-card__size-title">
                            {{ $t('products.product.size') }}:
                        </div>
                        <div class="product-card__size">
                            {{product.size}} см
                        </div>
                    </div>
                    <div class="product-card__size-text">
                        {{ $t('products.product.size_desc') }}
                    </div>
                </div>
                <div class="product-card__price-block">
                    <div class="product-card__price-text">
                        {{ $t('products.product.price') }}:
                    </div>
                    <div class="product-card__price">
                        {{ $t('products.product.from') }}
                        <span>
                            {{product.price}} ₴
                        </span>
                    </div>
                </div>
                <NuxtLink :to="`/products/${product.id}`" class="product-card__link btn">
                    <span>{{ $t('buttons.more_details') }}</span>
                </NuxtLink>
            </div>
    </div>
</template>

<style scoped>
.product-card {
    width: 300px;
}
</style>