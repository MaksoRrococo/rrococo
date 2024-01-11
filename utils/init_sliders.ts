import Swiper from 'swiper'
import { Navigation, Scrollbar, Pagination, Grid, Thumbs } from 'swiper/modules'

export const initSliders = () => {
 
    const resizableSwiper = (breakpoint: any, swiperClass: any, swiperSettings: any, callback?: any) => {
        if (document.querySelector(swiperClass)) {
            let swiper: any;

            breakpoint = window.matchMedia(breakpoint);

            const enableSwiper = function (className : any, settings: any) {
                swiper = new Swiper(className, settings);
            };

            const checker = function () {
                if (breakpoint.matches) {
                    return enableSwiper(swiperClass, swiperSettings);
                } else {
                    if (swiper !== undefined) swiper.destroy(true, true);
                    return;
                }
            };

            breakpoint.addEventListener("change", checker);
            checker();
        }
    };

    const sliderSettings = {
        modules: [Scrollbar, Pagination],
        observer: true,
        observeParents: true,
        slidesPerView: 1.3,
        spaceBetween: 20,
        centeredSlides: true,
        speed: 800,
        // Скроллбар
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
        // Пагінація
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
    };

    resizableSwiper("(max-width: 649.98px)", ".advantages__slider", sliderSettings);
    resizableSwiper("(max-width: 649.98px)", ".products__slider", sliderSettings);

    if (document.querySelector(".gallery__slider")) {
        // Вказуємо склас потрібного слайдера
        // Створюємо слайдер
        new Swiper(".gallery__slider", {
            // Вказуємо склас потрібного слайдера
            // Підключаємо модулі слайдера
            // для конкретного випадку
            modules: [Scrollbar, Pagination, Grid],
            observer: true,
            observeParents: true,
            slidesPerView: 4,
            spaceBetween: 30,
            speed: 800,

            // Пагінація
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            },

            // Скроллбар
            scrollbar: {
                el: ".swiper-scrollbar",
                draggable: true,
            },

            // Кнопки "вліво/вправо"
            // navigation: {
            //     prevEl: ".swiper-button-prev",
            //     nextEl: ".swiper-button-next",
            // },
            // Брейкпоінти
            breakpoints: {
                319: {
                    slidesPerView: 2,
                    spaceBetween: 12,
                    loop: false,
                    grid: {
                        rows: 3,
                        fill: "row",
                    },
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    grid: {},
                    initialSlide: 2,
                    loop: true,
                    loopAdditionalSlides: 3,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    initialSlide: 2,
                    loop: true,
                    loopAdditionalSlides: 3,
                },
                1268: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    initialSlide: 2,
                    loop: true,
                    loopAdditionalSlides: 3,
                },
            },
            // Події
            on: {},
        });
    }

    if (document.querySelector(".review__slider")) {
        // Вказуємо склас потрібного слайдера
        // Створюємо слайдер
        new Swiper(".review__slider", {
            // Вказуємо склас потрібного слайдера
            // Підключаємо модулі слайдера
            // для конкретного випадку
            modules: [Pagination, Navigation],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 800,

            // Пагінація
            pagination: {
                el: ".review .swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            },
            // Кнопки "вліво/вправо"
            navigation: {
                prevEl: ".review__body .swiper-button-prev",
                nextEl: ".review__body .swiper-button-next",
            },
            // Події
            on: {},
        });
    }

    if (document.querySelector(".product-page__slider") && document.querySelector(".product-page__thumbs")) {
        // Вказуємо склас потрібного слайдера
        // Створюємо слайдер
        const pageProductThumbs = new Swiper(".product-page__thumbs", {
            // Вказуємо склас потрібного слайдера
            // Підключаємо модулі слайдера
            // для конкретного випадку
            modules: [],
            observer: true,
            observeParents: true,
            slidesPerView: 4,
            spaceBetween: 10,
            speed: 800,
            breakpoints: {
                319: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
            },
            on: {},
        });

        // Вказуємо склас потрібного слайдера
        // Створюємо слайдер
        new Swiper(".product-page__slider", {
            // Вказуємо склас потрібного слайдера
            // Підключаємо модулі слайдера
            // для конкретного випадку
            modules: [Thumbs],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 800,
            thumbs: {
                swiper: pageProductThumbs,
            },
        });
    }
}