import { useTranslation } from "react-i18next";

import { TranslationKeys } from "@/i18n/TranslationKeys";


export default function TableTrailer() {
    const { t } = useTranslation();

    return (
        <table id="rentaldetails-trailer-table" className="rentaldetails-table">
            <thead>
                <tr>
                    <th id="rentaldetails-trailer-table-thead-personheader">{ t(TranslationKeys.RENTAL_DETAILS.TRAILER_DETAILS.PERSON_HEADER) }</th>
                    <th id="rentaldetails-trailer-table-thead-lei">{ t(TranslationKeys.RENTAL_DETAILS.TRAILER_DETAILS.LEI) }</th>
                    <th id="rentaldetails-trailer-table-thead-eur">{ t(TranslationKeys.RENTAL_DETAILS.TRAILER_DETAILS.EUR) }</th>
                </tr>
            </thead>
            <tbody>
                {/* {{trailerTableRows}} */}
            </tbody>
        </table>
    );
}
