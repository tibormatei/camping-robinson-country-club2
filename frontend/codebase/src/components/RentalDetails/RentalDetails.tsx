import { useTranslation } from "react-i18next";

import { TranslationKeys } from "@/i18n/TranslationKeys";
import TableTent from "@/components/TableTent/TableTent";
import TableTrailer from "../TableTrailer/TableTrailer";
import TableDog from "../TableDog/TableDog";

import "./RentalDetails.css";


export default function RentalDetails() {
    const { t } = useTranslation();

    return (
        <div id="rentaldetails">
            <section id="rentaldetails-tent">
                <TableTent />
            </section>
            <section id="rentaldetails-trailer">
                <TableTrailer />
            </section>
            <section id="rentaldetails-dog">
                <TableDog />
            </section>
            <section id="rentaldetails-priceinformation">
                <p>{ t(TranslationKeys.RENTAL_DETAILS.PRICE_INFORMATION) }</p>
            </section>
            <section id="rentaldetails-checkoutinformation">
                <p>{ t(TranslationKeys.RENTAL_DETAILS.CHECK_OUT_INFORMATION) }</p>
            </section>
        </div>
    );
}
