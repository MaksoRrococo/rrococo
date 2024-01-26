<script setup lang="ts">
import { auth } from '~/libs/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import ShowNotification from './utils/notification';

const userStore = useUserStore()
const notify = useNotificationStore()
const contacts = useContactsStore()
const products = useProductsStore()
const gallery = useGalleryStore()
const testimonials = useTestimonialsStore()


const loading = ref<boolean>(true)

watch(() => notify.trigger, () => {
    ShowNotification(notify.notification!.type,
       notify.notification!.title, notify.notification!.message)
})

onBeforeMount(async() => {
    onAuthStateChanged(auth, (user) => {
        userStore.user = user
    })

    await contacts.getAdditionalInfo()
    await contacts.getSocialsItems()
    await products.getProducts()
    await products.getImagesToProduct()
    await gallery.getGallerySectionItems()
    await testimonials.getTestimonialSectionItems()

    loading.value = false 
})

</script>

<template>
  <UILoader v-if="loading"/>
  <NuxtLayout v-else>
    <NuxtPage  />
  </NuxtLayout>
</template>
