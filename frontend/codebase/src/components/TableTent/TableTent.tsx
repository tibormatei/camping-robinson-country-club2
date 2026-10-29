import { useTranslation } from "react-i18next";

import { TranslationKeys } from "@/i18n/TranslationKeys";

import { useTent } from "@/components/TableTent/useTent"


export default function TableTent() {
    const { t } = useTranslation();
    const tent = useTent();

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
                {
                    tent.status === "loading" ? (
                        <tr><td colSpan={3}>{ t(TranslationKeys.API_CALL.LOADING) }</td></tr>
                    ) : tent.status === "error" ? (
                        <tr><td colSpan={3}>{ t(TranslationKeys.API_CALL.LOAD_ERROR) }</td></tr>
                    ) : (
                        (tent.data?.tent_capacities ?? []).length > 0 ? (
                            <>
                                <tr>
                                    <td>{tent.data?.tent_capacities[0]} { t(TranslationKeys.RENTAL_DETAILS.TENT_DETAILS.PERSON_NAME) }</td>
                                    <td rowSpan={ tent.data?.tent_capacities.length }>
                                        { tent.data?.lei_price_per_person }
                                    </td>
                                    <td rowSpan={ tent.data?.tent_capacities.length }>
                                        { tent.data?.eur_price_per_person }
                                    </td>
                                </tr>
                                {
                                    tent.data?.tent_capacities.slice(1).map((capacity) => (
                                        <tr key={ capacity }>
                                            <td>{ capacity } { t(TranslationKeys.RENTAL_DETAILS.TENT_DETAILS.PERSON_NAME) }</td>
                                        </tr>
                                    ))
                                }
                            </>
                        ) : (
                            <tr>
                                <td></td>
                                <td>{ tent.data?.lei_price_per_person }</td>
                                <td>{ tent.data?.eur_price_per_person }</td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    );
}
