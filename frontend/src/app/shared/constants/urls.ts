/* This is a TypeScript file that exports a set of constants that represent URLs for various API
endpoints. The `environment` object is imported from a file that contains environment-specific
configuration values, such as the base URL for the API. The `BASE_URL` constant is used to construct
the other URL constants. These URL constants are likely used throughout the application to make API
requests to the backend server. */

import { environment } from "src/environments/environment";

const BASE_URL = environment.BASE_URL;
// const BASE_URL = environment.production ? "" : "http://localhost:5000";

export const FOODS_URL = BASE_URL + "/api/foods";
export const TAGS_URL = FOODS_URL + "/tags";
export const FOODS_BY_SEARCH_URL = FOODS_URL + "/search/";
export const FOODS_BY_TAG_URL = FOODS_URL + "/tag/";
export const FOODS_BY_ID_URL = FOODS_URL + "/";

export const USER_LOGIN_URL = BASE_URL + "/api/users/login";
export const USER_REGISTER_URL = BASE_URL + "/api/users/register";

export const ORDER_URL = BASE_URL + "/api/orders";
export const ORDER_CREATE_URL = ORDER_URL + "/create";
export const NEW_ORDER_FOR_CURRENT_USER_URL = ORDER_URL + "/newOrder";
export const PAY_FOR_ORDER_FOR_CURRENT_USER_URL = ORDER_URL + "/payForOrder";
export const TRACKING_ORDER_FOR_CURRENT_USER_URL = ORDER_URL + "/track/";

const TINGG_URL = BASE_URL + "/api/tinggCheckout";
export const POST_ORDER_URL = TINGG_URL + "/postOrder";
export const CHECKOUT_ENCRYPTION_URL =
  TINGG_URL + "/checkoutEncryption?type=redirect";
