import { apiGet } from "@/api/client";
import { RENTAL_ENDPOINTS } from "@/api/endpoints";


/**
 * @summary The response of GET /api/rental/dog.
 */
export interface DogData {
    lei_price_per_night: number;
    eur_price_per_night: number;
}


export function getDog(signal?: AbortSignal): Promise<DogData> {
    return apiGet<DogData>(RENTAL_ENDPOINTS.DOG, signal);
}
