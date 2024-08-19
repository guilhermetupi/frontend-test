// utils/translate.ts

export interface StatusTranslations {
    SHIPPED: string;
    CANCELLED: string;
    DELIVERED: string;
}

export interface Translations {
    en: StatusTranslations;
    pt: StatusTranslations;
    es: StatusTranslations;
}

const translations: Translations = {
    en: {
        SHIPPED: 'Shipped',
        CANCELLED: 'Cancelled',
        DELIVERED: 'Delivered',
    },
    pt: {
        SHIPPED: 'Enviado',
        CANCELLED: 'Cancelado',
        DELIVERED: 'Entregue',
    },
    es: {
        SHIPPED: 'Enviado',
        CANCELLED: 'Cancelado',
        DELIVERED: 'Entregado',
    },
};

export const getTranslation = (status: string, lang: keyof Translations): string => {
    if (['SHIPPED', 'CANCELLED', 'DELIVERED'].includes(status)) {
        return translations[lang][status as keyof StatusTranslations];
    }
    return status;
};

export default getTranslation;
