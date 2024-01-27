<script setup lang="ts">
import type { IContactMail, IMail } from '~/types';


interface Props {
    mail: IMail<IContactMail>
}

defineProps<Props>()
</script>


<template>
    <div>
        <h2 class="header-mail-title">Пользователь желает получить бесплатную консультацию</h2>
        <div class="mail-content">
            <div class="content-item">Имя: <span>{{mail.mail.username}}</span></div>
            <div class="content-item">Email: <span>{{mail.mail.email}}</span></div>
            <div class="content-item">Телефон: <span>{{mail.mail.phone}}</span></div>
        </div>
    </div>
</template>

<style scoped>
.header-mail-title {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 20px;
}

.mail-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.content-item {
    font-style: italic;
}

.content-item span {
    font-style: normal;
    font-weight: 800;
} 
</style>