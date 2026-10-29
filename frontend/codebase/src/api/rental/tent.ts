import { apiGet } from "@/api/client";
import { RENTAL_ENDPOINTS } from "@/api/endpoints";

/**
 * @summary The response of GET /api/rental/tent.
 */
export interface TentData {
    tent_capacities: string[];
    lei_price_per_person: number;
    eur_price_per_person: number;
}

export function getTent(signal?: AbortSignal): Promise<TentData> {
    return apiGet<TentData>(RENTAL_ENDPOINTS.TENT, signal);
}
