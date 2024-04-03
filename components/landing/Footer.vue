<script setup lang="ts">
const contactsStore = useContactsStore()
</script>

<template>
		<footer class="footer">
			<div class="footer__container">
				<div class="footer__body">
					<a href="#" class="footer__logo">
						<img src="~/assets/img/footer-logo.svg" alt="logo">
					</a>
					<div class="footer__menu footer-menu">
						<nav class="footer-menu__body">
							<ul class="footer-menu__list">
								<li class="footer-menu__item">
									<a href="#about" class="footer-menu__link">
										{{ $t('menu.about_us') }}
									</a>
								</li>
								<li class="footer-menu__item">
									<a href="#products" class="footer-menu__link">
										{{ $t('menu.products') }}
									</a>
								</li>
								<li class="footer-menu__item">
									<a href="#view" class="footer-menu__link">
										{{ $t('menu.preview') }}
									</a>
								</li>
								<li class="footer-menu__item">
									<a href="#video" class="footer-menu__link">
										{{ $t('menu.video') }}
									</a>
								</li>
								<li class="footer-menu__item">
									<a href="#review" class="footer-menu__link">
										{{ $t('menu.testimonials') }}
									</a>
								</li>
							</ul>
						</nav>
					</div>
					<ul class="footer__sicials">
						<li class="footer__social-item"
							v-for="social in contactsStore.socials"
							:key="social.id"
						>
							<UIFooterSocialIcon :link="social.link" :social="social.social"/>
						</li>
					</ul>
				</div>
				<div class="footer__copy">
					ВСЕ ПРАВА ЗАЩИЩЕНЫ®
				</div>
			</div>
			<a href="#wrapper" class="footer__arrow-top">
				<svg width="14" height="16" viewBox="0 0 14 16" fill="none">
					<path d="M7.48903 0.596346C7.15557 0.262891 6.61493 0.262891 6.28148 0.596346L0.847518 6.03031C0.514063 6.36376 0.514063 6.9044 0.847518 7.23786C1.18097 7.57131 1.72161 7.57131 2.05506 7.23786L6.88525 2.40767L11.7154 7.23785C12.0489 7.57131 12.5895 7.57131 12.923 7.23785C13.2564 6.9044 13.2564 6.36376 12.923 6.03031L7.48903 0.596346ZM7.73912 15.7158L7.73912 1.20012L6.03139 1.20012L6.03139 15.7158L7.73912 15.7158Z" fill="#84663E" />
				</svg>
			</a>
		</footer>
</template>

<style scoped>

</style>