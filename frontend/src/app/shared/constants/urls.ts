/* This code defines a set of URLs that are used by the frontend to make requests to the backend. The
`BASE_URL` variable is the root URL for the backend API, and the other URLs are constructed by
appending specific endpoints to the `BASE_URL`. These URLs are exported as constants so that they
can be easily imported and used in other parts of the frontend code. By using constants instead of
hardcoding URLs, the code becomes more maintainable and flexible, as the URLs can be easily changed
if the backend is deployed to a different location. */
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
