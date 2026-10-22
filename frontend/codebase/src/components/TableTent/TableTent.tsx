import { useTranslation } from "react-i18next";

import { TranslationKeys } from "@/i18n/TranslationKeys";


export default function TableTent() {
    const { t } = useTranslation();

    return (
            <table id="rentaldetails-tent-table" className="rentaldetails-table">
            <thead>
                <tr>
                    <th id="rentaldetails-tent-table-thead-personheader">{ t(TranslationKeys.RENTAL_DETAILS.TENT_DETAILS.PERSON_HEADER) }</th>
                    <th id="rentaldetails-tent-table-thead-lei">
                        { t(TranslationKeys.RENTAL_DETAILS.TENT_DETAILS.LEI) }{ t(TranslationKeys.RENTAL_DETAILS.TENT_DETAILS.PRICE_DETAIL) }
                    </th>
                    <th id="rentaldetails-tent-table-thead-eur">
                        { t(TranslationKeys.RENTAL_DETAILS.TENT_DETAILS.EUR) }{ t(TranslationKeys.RENTAL_DETAILS.TENT_DETAILS.PRICE_DETAIL) }
                    </th>
                </tr>
            </thead>
            <tbody>
                {/* {{tentTableRows}} */}
            </tbody>
        </table>
    );
}
