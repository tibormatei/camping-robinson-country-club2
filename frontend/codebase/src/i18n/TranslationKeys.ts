
export const TranslationKeys = {
    PAGE_NAME: "pageName",
    HEADER_DETAILS: {
        MENU: "headerDetails.menu",
        HOME: "headerDetails.home",
        CONTACT: "headerDetails.contact",
        LANGUAGE: "headerDetails.language",
        TOGGLE_MENU: "headerDetails.toggleMenu",
    },
    RENTAL_DETAILS: {
        TENT_DETAILS: {
            PERSON_HEADER: "rentalDetails.tentDetails.personHeader",
            LEI: "rentalDetails.tentDetails.lei",
            EUR: "rentalDetails.tentDetails.eur",
            PRICE_DETAIL: "rentalDetails.tentDetails.priceDetail",
            PERSON_NAME: "rentalDetails.tentDetails.personName",
        }
    },
} as const;

type DeepValues<T> = T extends object ? { [K in keyof T]: DeepValues<T[K]> }[keyof T] : T;

export type TranslationKey = DeepValues<typeof TranslationKeys>;
