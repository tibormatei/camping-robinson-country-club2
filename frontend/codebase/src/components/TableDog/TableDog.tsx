import { useTranslation } from "react-i18next";

import { TranslationKeys } from "@/i18n/TranslationKeys";


export default function TableDog() {
    const { t } = useTranslation();

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
                { /* {{dogTableRows}} */ }
            </tbody>
        </table>
    );
}
