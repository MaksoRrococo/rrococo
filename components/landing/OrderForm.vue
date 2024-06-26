<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

interface ISubmitedForm {
    name: string
    phone: string
    email: string
    comment?: string | undefined | null 
    accept: boolean
}

const router = useRouter()

const emits = defineEmits<{
    (e: 'submitForm', values: ISubmitedForm): void
}>()

const validationSchema = toTypedSchema(
  zod.object({
    name: zod.string({required_error: 'Поле не должно быть пустым'}).min(4, { message: 'Минимум 4 символа' }),
    phone: zod.string({required_error: 'Поле не должно быть пустым'}).min(10, { message: 'Минимум 10 символов ' }),
    email: zod.string({required_error: 'Поле не должно быть пустым'}).email({ message: 'Неверная почта' }),
    accept: zod.boolean({required_error: 'Вы должны согласиться с условиями'}),
    comment: zod.string().nullish()
   
  })
)

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: name } = useField('name')
const { value: phone } = useField('phone')
const { value: email } = useField('email')
const { value: accept } = useField('accept')
const { value: comment } = useField('comment')


const onSubmit = handleSubmit(async values => {
    emits('submitForm', values)
});

const toLicenseClickHandler = () => {
    document.documentElement.classList.remove("popup-show", "lock")
    router.push('/licenses_detail')
}
</script>

<template>
    <form @submit="onSubmit" class="popup__form form-block">
		<input autocomplete="off" type="text" name="name" v-model="name" placeholder="Ваше имя" class="form-block__input">
        <span class="error">{{errors.name}}</span>
		<input autocomplete="off" type="tel" name="phone" v-model="phone" placeholder="Ваш телефон" class="form-block__input">
        <span class="error">{{errors.phone}}</span>
		<input autocomplete="off" type="email" name="email" v-model="email" placeholder="Ваш Email" class="form-block__input">
        <span class="error">{{errors.email}}</span>
		<textarea class="form-block__textarea form-block__input" name="comment" v-model="comment" placeholder="Ваши пожелания"></textarea>
        <span>{{errors.comment}}</span>
		<div class="checkbox">
			<input id="c_1" class="checkbox__input" type="checkbox" value="1" v-model="accept" name="accept">
			<label for="c_1" class="checkbox__label"></label>
			<div @click="toLicenseClickHandler" class="checkbox__link" style="cursor: pointer;">
				{{ $t('order_modal.deal') }}
			</div>
		</div>
        <span class="error accept">{{errors.accept}}</span>
		<button type="submit" class="form-block__button btn">
			<span>{{ $t('buttons.send') }}</span>
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

.card-data {
    display: flex;
    padding-top: 15px;
    gap: 15px;
}

.card-input {
    display: flex;
    flex-direction: column;
}
.card-min-input {
    display: flex;
    flex-direction: column;
    width: 80px;
}

@media screen and (max-width: 620px) {
    .card-data {
        flex-wrap: wrap;
    }
}
</style>