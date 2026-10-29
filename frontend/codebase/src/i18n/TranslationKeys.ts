
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
        },
        TRAILER_DETAILS: {
            PERSON_HEADER: "rentalDetails.trailerDetails.personHeader",
            LEI: "rentalDetails.trailerDetails.lei",
            EUR: "rentalDetails.trailerDetails.eur",
            PERSON_NAME: "rentalDetails.trailerDetails.personName",
        },
        DOG_DETAILS: {
            DOG: "rentalDetails.dogDetails.dog",
            LEI: "rentalDetails.dogDetails.lei",
            EUR: "rentalDetails.dogDetails.eur",
            PRICE_DETAIL: "rentalDetails.dogDetails.priceDetail",
        },
        PRICE_INFORMATION: "rentalDetails.priceInformation",
        CHECK_OUT_INFORMATION: "rentalDetails.checkOutInformation",
    },
    API_CALL: {
        LOADING: "apiCall.loading",
        LOAD_ERROR: "apiCall.loadError",
    },
} as const;

/**
 * Gets all possible translation keys from the TranslationKeys object.
 * if T is an object, it recursively gets the keys of T, else it returns T.
 */
type DeepValues<T> = T extends object ? { [K in keyof T]: DeepValues<T[K]> }[keyof T] : T;

export type TranslationKey = DeepValues<typeof TranslationKeys>;
