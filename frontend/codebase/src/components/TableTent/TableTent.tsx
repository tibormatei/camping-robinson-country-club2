import { useTranslation } from "react-i18next";

import { TranslationKeys } from "@/i18n/TranslationKeys";

import { useTent } from "@/components/TableTent/useTent"


export default function TableTent() {
    const { t } = useTranslation();
    const tent = useTent();

    function renderTableTentRows() {
        if (tent.status === "loading") {
            return <tr><td colSpan={3}>{ t(TranslationKeys.API_CALL.LOADING) }</td></tr>;
        }
        if (tent.status === "error") {
            return <tr><td colSpan={3}>{ t(TranslationKeys.API_CALL.LOAD_ERROR) }</td></tr>;
        }

        const tentCapacities = tent.data?.tent_capacities ?? [];
        const leiPricePerPerson = tent.data?.lei_price_per_person ?? 0;
        const eurPricePerPerson = tent.data?.eur_price_per_person ?? 0;

        if (tentCapacities.length === 0) {
            return (
                <tr>
                    <td></td>
                    <td>{ leiPricePerPerson }</td>
                    <td>{ eurPricePerPerson }</td>
                </tr>
            )
        }
        else {
            return tentCapacities.map((capacity, index) => (
                <tr key={ capacity }>
                    <td>{ capacity } { t(TranslationKeys.RENTAL_DETAILS.TENT_DETAILS.PERSON_NAME) }</td>
                    {
                        index === 0 && (
                            <>
                                <td rowSpan={ tentCapacities.length }>
                                    { leiPricePerPerson }
                                </td>
                                <td rowSpan={ tentCapacities.length }>
                                    { eurPricePerPerson }
                                </td>
                            </>
                        )
                    }
                </tr>
            ));
        }
    }

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
                { renderTableTentRows() }
            </tbody>
        </table>
    );
}
