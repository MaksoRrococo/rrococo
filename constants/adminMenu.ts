import type { IAdminMenuItem } from "~/types";

export const adminMenu : IAdminMenuItem[] = [
    {
        id: 0,
        text: 'Главная',
        page: 'AdminMain'
    },

    {
        id: 1,
        text: 'Товары',
        page: 'AdminProducts'
    },

    {
        id: 2,
        text: 'Галерея',
        page: 'AdminGallery'
    },

    {
        id: 3,
        text: 'Отзывы',
        page: 'AdminTestimonials'
    },

    // {
    //     id: 4,
    //     text: 'Questions',
    //     page: 'AdminQuestions'
    // },

    // {
    //     id: 5,
    //     text: 'Prices for services',
    //     page: 'AdminPricesAndServices'
    // },

    // {
    //     id: 6,
    //     text: 'Gallery',
    //     page: 'AdminGallery'
    // },

    // {
    //     id: 7,
    //     text: 'Testimonials',
    //     page: 'AdminTestimonials'
    // },
] 