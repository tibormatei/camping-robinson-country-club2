import { apiGet } from "@/api/client";
import { RENTAL_ENDPOINTS } from "@/api/endpoints";


/**
 * @summary Inner classes of GET /api/rental/trailer.
 */
export interface TrailerData {
    trailer_capacity: string;
    lei_price: number;
    eur_price: number;
}

/**
 * @summary The response of GET /api/rental/trailer.
 */
export interface TrailersData {
    trailers: TrailerData[];
}


export function getTrailers(signal?: AbortSignal): Promise<TrailersData> {
    return apiGet<TrailersData>(RENTAL_ENDPOINTS.TRAILER, signal);
}
