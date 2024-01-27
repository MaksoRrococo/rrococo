<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import type { IContactMail, IMail } from '~/types';

const mail = useMailStore()

const validationSchema = toTypedSchema(
  zod.object({
    name: zod.string({required_error: 'Поле не должно быть пустым'}).min(4, { message: 'Минимум 4 символа' }),
    phone: zod.string({required_error: 'Поле не должно быть пустым'}).min(10, { message: 'Минимум 10 символов ' }),
    email: zod.string({required_error: 'Поле не должно быть пустым'}).email({ message: 'Неверная почта' }),
    accept: zod.boolean({required_error: 'Вы должны согласиться с условиями'})
  })
)

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: name } = useField('name')
const { value: phone } = useField('phone')
const { value: email } = useField('email')
const { value: accept } = useField('accept');

const onSubmit = handleSubmit(async values => {
    const message: IMail<IContactMail> = {
        type: 'contact',
        isRead: false,
        mail: {
            username: values.name,
            phone: values.phone,
            email: values.email,
            text: 'Пользователь хочет получить бесплатную консультацию'
        }
    }

  await $fetch('/api/feedback', {
    method: 'POST',
    body: message.mail
  })

  await mail.AddMailItem(message)
});
</script>

<template>
    <form @submit="onSubmit" class="consultation__form form-block">
		<h3 class="form-block__title">
			Получить бесплатную консультацию
		</h3>
		<input autocomplete="off" type="text" name="name" v-model="name" placeholder="Ваше имя" class="form-block__input">
        <span class="error">{{errors.name}}</span>
		<input autocomplete="off" type="tel" name="phone" v-model="phone" placeholder="Ваш телефон" class="form-block__input">
        <span class="error">{{errors.phone}}</span>
		<input autocomplete="off" type="email" name="email" v-model="email" placeholder="Ваш Email" class="form-block__input">
        <span class="error">{{errors.email}}</span>
		<div class="checkbox">
			<input id="c_1" class="checkbox__input" type="checkbox" value="1" v-model="accept" name="accept">
			<label for="c_1" class="checkbox__label"></label>
			<a href="#" class="checkbox__link">
				я согласен(на) на обработку персональных данных
			</a>
           
		</div>
        <span class="error accept">{{errors.accept}}</span> 
		<button type="submit" class="form-block__button btn">
			<span>Отправить</span>
		</button>
	</form>
</template>

<style scoped>
.error {
    position: relative;
    color: red;
    top: -13px;
}

.accept {
    top: 10px
}
</style>