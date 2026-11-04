import { useTranslation } from "react-i18next";

import { TranslationKeys } from "@/i18n/TranslationKeys";

import { useDog } from "@/components/TableDog/useDog"


export default function TableDog() {
    const { t } = useTranslation();
    const dog = useDog();

    function renderTableDogRows() {
        if (dog.status === "loading") {
            return <tr><td colSpan={3}>{ t(TranslationKeys.API_CALL.LOADING) }</td></tr>;
        }
        if (dog.status === "error") {
            return <tr><td colSpan={3}>{ t(TranslationKeys.API_CALL.LOAD_ERROR) }</td></tr>;
        }

        return (
            <tr>
                <td>{ t(TranslationKeys.RENTAL_DETAILS.DOG_DETAILS.DOG) }</td>
                <td>{ dog.data?.lei_price_per_night } { t(TranslationKeys.RENTAL_DETAILS.DOG_DETAILS.PRICE_DETAIL) }</td>
                <td>{ dog.data?.eur_price_per_night } { t(TranslationKeys.RENTAL_DETAILS.DOG_DETAILS.PRICE_DETAIL) }</td>
            </tr>
        )
    }

    return (
        <table id="rentaldetails-dog-table" className="rentaldetails-table">
            <thead>
                <tr>
                    <th id="rentaldetails-dog-table-thead-dogheader"></th>
                    <th id="rentaldetails-dog-table-thead-lei">{ t(TranslationKeys.RENTAL_DETAILS.DOG_DETAILS.LEI) }</th>
                    <th id="rentaldetails-dog-table-thead-eur">{ t(TranslationKeys.RENTAL_DETAILS.DOG_DETAILS.EUR) }</th>
                </tr>
            </thead>
            <tbody>
                { renderTableDogRows() }
            </tbody>
        </table>
    );
}
