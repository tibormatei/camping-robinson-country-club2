/**
 * The base path of the backend API.
 **/

export const API_BASE = "/api";

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal,
    });

    if (!response.ok) {
        throw new Error(`GET ${path} failed with status ${response.status}`);
    }

    return (await response.json()) as T;
}
