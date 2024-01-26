<script setup lang="ts">
import type { TSocial } from '~/types';

interface Props {
    social: TSocial
    link: string
}

const props = defineProps<Props>()

</script>

<template>
    <a :href="link" target="_blank" class="socials-head__link">
        <UIIcon :name="social" />
    </a>
</template>

<style scoped>

</style>