<script setup lang="ts">
import type { IOrderMail, IMail } from '~/types';
// import dayjs from 'dayjs'

interface Props {
    mail: IMail<IOrderMail>
}

defineProps<Props>()

// const convertDate = (value: any) => {
//     const date = new Date(value.seconds * 1000)

//     return dayjs(date).format('DD.MM.YYYY hh:mm')
// } 
</script>


<template>
    <div class="mail">    
        <div class="mail-content">
            <h2 class="header-mail-title">Пользователь желает приобрести товар</h2>
            <div class="content-item">Название товара: <span>{{mail.mail.productTitle}}</span></div>
            <div class="content-item">Размеры: <span>{{mail.mail.size}}</span></div>
            <div class="content-item">Цена: <span>{{mail.mail.price}}</span></div>
            <h2 class="header-mail-title">Контакты:</h2>
            <div class="content-item">Имя: <span>{{mail.mail.username}}</span></div>
            <div class="content-item">Email: <span>{{mail.mail.email}}</span></div>
            <div class="content-item">Телефон: <span>{{mail.mail.phone}}</span></div>
            <div class="content-item">Комментарий: <span>{{mail.mail.comment}}</span></div>
            <div class="content-item">Дата: <span>{{mail.mail.date}}</span></div>
        </div>
        <div class="status">
            Статус: 
            <span
                :class="[mail.mail.statusPay == 'Unpaid' ? 'red' : 'green']"
            >{{mail.mail.statusPay == 'Unpaid' ? 'НЕОПЛАЧЕН' : 'ОПЛАЧЕН'}}</span>
        </div>
    </div>
</template>

<style scoped>
.mail {
    display: flex;
    justify-content: space-between;
}

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

.status {
    font-weight: 900;
}

.green {
    color: rgb(97, 189, 5);
}

.red {
    color: rgb(204, 5, 5);
}
</style>