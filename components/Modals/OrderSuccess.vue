<script setup lang="ts">

interface Props {
    show: boolean
}

defineProps<Props>()
</script>

<template>
    <div class="popup" :class="{'popup_show' : show}">
		<div class="popup__wrapper">
			<div class="popup__content">
				<button data-close type="button" class="popup__close"></button>
				<div class="popup__body">
					<div class="popup__head">
						<h3 class="popup__title">
							{{ $t('success_modal.header') }}
						</h3>
						<div class="popup__decor">
							<img src="~/assets/img/decor-image/decor-3.svg" alt="decor">
						</div>
						<div class="popup__text">
							{{ $t('success_modal.message') }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>