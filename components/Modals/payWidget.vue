
<script setup lang="ts">

interface Props {
    show: boolean
    html: string
}

const props = defineProps<Props>() 
const emits = defineEmits(['leaveRequest']) 

const payButtonRef = ref<HTMLDivElement>()


onUpdated(() => { 
    if(payButtonRef.value) {
        payButtonRef.value.innerHTML = props.html
    }
})

</script>


<template>
    <div class="popup " :class="{'popup_show' : show}" style="z-index: 9999999;">
		<div class="popup__wrapper">
			<div class="popup__content">
				<button data-close type="button" class="popup__close"></button>
				<div class="popup__body">
					<div class="popup__head">
						<h3 class="popup__title">
							Оплата
						</h3>
						<div class="popup__decor">
							<img src="~/assets/img/decor-image/decor-3.svg" alt="decor">
						</div>
						<div class="actions">
                            <div ref="payButtonRef" >
                                
                            </div>
							<div style="cursor: pointer;" @click="emits('leaveRequest')">
								<span>Оставить заявку</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.actions {
	display: flex;
	justify-content: center;
	gap: 60px; 
	font-size: 20px;
}
</style>