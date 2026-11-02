/**
 * @summary The state of a GET request to the rental details API.
 **/
export type RentalDetailsApiGetStatus<T> =
  { status: "loading" } |
  { status: "error" } |
  { status: "success"; data: T };
