import { useTranslation } from "react-i18next";

import { TranslationKeys } from "@/i18n/TranslationKeys";

import { useTrailers } from "@/components/TableTrailer/useTrailer"


export default function TableTrailer() {
    const { t } = useTranslation();
    const trailers = useTrailers();

    function renderTableTrailersRows() {
        if (trailers.status === "loading") {
            return <tr><td colSpan={3}>{ t(TranslationKeys.API_CALL.LOADING) }</td></tr>;
        }
        if (trailers.status === "error") {
            return <tr><td colSpan={3}>{ t(TranslationKeys.API_CALL.LOAD_ERROR) }</td></tr>;
        }

        const trailersList = trailers.data?.trailers ?? [];

        return trailersList.map((trailer) => (
            <tr key={ trailer.trailer_capacity }>
                <td> { trailer.trailer_capacity } { t(TranslationKeys.RENTAL_DETAILS.TRAILER_DETAILS.PERSON_NAME) }</td>
                <td>{ trailer.lei_price }</td>
                <td>{ trailer.eur_price }</td>
            </tr>
        ));
    }

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
                { renderTableTrailersRows() }
            </tbody>
        </table>
    );
}
