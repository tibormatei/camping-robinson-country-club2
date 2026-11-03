/**
 * @summary The state of a GET request to the API.
 **/
export type ApiGetState<T> =
  { status: "loading" } |
  { status: "error" } |
  { status: "success"; data: T };
