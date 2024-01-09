const url = "http://erpmaster.test/api/v1";

export const USER_TOKEN_KEY = "userToken";
export const USER_ROLE_KEY = "userRole";
export const USER_IS_INTERNET = "userIsInternet";
export const DRAFT_DATA = "draftData";

export const USER_ROLE = 'user';

export const STATUS = {
    SENT: 'sent',
    PROCESS: 'process',
    COMPLETE: 'complete',
    IGNORE: 'ignore',
    DRAFT: 'draft'
}

export const URL_LOGIN = `${url}/login`;
export const URL_REGISTER = `${url}/register`
export const URL_LOGOUT = `${url}/logout`;
export const URL_USER_INFO = `${url}/user-info`;
export const URL_CUSTOMERS_SEARCH = `${url}/customers`;
export const URL_PRODUCTS_SEARCH = `${url}/products`;
export const URL_ORDERS_SEARCH = `${url}/orders`;
export const URL_REPORT_ALL = `${url}/reports`
