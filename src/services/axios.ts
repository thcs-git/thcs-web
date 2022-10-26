import axios from "axios";

import LOCALSTORAGE from "../helpers/constants/localStorage";
import SESSIONSTORAGE from "../helpers/constants/sessionStorage";

export const viacep = axios.create({
    baseURL: process.env.REACT_APP_VIACEP_API,
});

export const apiSollar = axios.create({
    baseURL: process.env.REACT_APP_BASE_API,
});
export const apiSollarMobi = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_MOBI,
});
export const apiSollarReport = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_REPORT,
});
export const apiSollarNexoData = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_NEXODATA,
});
export const apiSollarChatbot = axios.create({
    baseURL: process.env.REACT_APP_BASE_CHATBOT,
});

export function apiIntegra(url: string) {
    return axios.create({
        baseURL: url,
    });
}

export const ibge = axios.create({
    baseURL: process.env.REACT_APP_IBGE_API,
});

export const googleMaps = axios.create({
    baseURL: process.env.REACT_APP_GOOGLE_MAPS_API,
});
let integrationUrl = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION) || "";
// let integrationUrl = 'http://localhost:3232/api';
// "http://localhost:3232/api";
apiSollar.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
        const username = localStorage.getItem(LOCALSTORAGE.USERNAME) || "";
        const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID) || "";
        const company_id =
            localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED) || "";
        const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER) || "";
        const integration_url = integrationUrl;
        const external_company_id =
            localStorage.getItem(LOCALSTORAGE.INTEGRATION_COMPANY_SELECTED) || "";
        const external_user_id =
            localStorage.getItem(LOCALSTORAGE.SOLLAR_INTEGRATION_USER_ID) || "";
        let integrationToken = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION_TOKEN) || "";

        if (token) {
            config.headers!.token = `${token}`;
            config.headers!.user = JSON.stringify({id: user_id, username});
            config.headers!.company_id = company_id;
            config.headers!.customer_id = customer_id;
        }

        if (integration_url) {
            config.headers!.integration_url = integration_url;
            config.headers!.integration_token = integrationToken;
            config.headers!.external_company_id = external_company_id;
            config.headers!.external_user_id = external_user_id;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

apiSollar.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) return;

        const {errors} = error.response.data;
        if (errors?.name === "TokenExpiredError") {
            localStorage.removeItem(LOCALSTORAGE.TOKEN);
            localStorage.setItem(
                LOCALSTORAGE.EXPIRED_SESSION,
                JSON.stringify(errors)
            );
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

apiSollarMobi.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
        const username = localStorage.getItem(LOCALSTORAGE.USERNAME) || "";
        const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID) || "";
        const company_id =
            localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED) || "";
        const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER) || "";
        const integration_url = integrationUrl;
        const external_company_id =
            localStorage.getItem(LOCALSTORAGE.INTEGRATION_COMPANY_SELECTED) || "";
        const external_user_id =
            localStorage.getItem(LOCALSTORAGE.SOLLAR_INTEGRATION_USER_ID) || "";
        let integrationToken = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION_TOKEN) || "";

        if (token) {
            config.headers!.token = `${token}`;
            config.headers!.user = JSON.stringify({id: user_id, username});
            config.headers!.company_id = company_id;
            config.headers!.customer_id = customer_id;
        }

        if (integration_url) {
            config.headers!.integration_url = integration_url;
            config.headers!.integration_token = integrationToken;
            config.headers!.external_company_id = external_company_id;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

apiSollarMobi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) return;

        const {errors} = error.response.data;
        if (errors?.name === "TokenExpiredError") {
            localStorage.removeItem(LOCALSTORAGE.TOKEN);
            localStorage.setItem(
                LOCALSTORAGE.EXPIRED_SESSION,
                JSON.stringify(errors)
            );
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

apiSollarReport.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
        const username = localStorage.getItem(LOCALSTORAGE.USERNAME) || "";
        const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID) || "";
        const company_id =
            localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED) || "";
        const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER) || "";
        const integration_url = integrationUrl;
        const external_company_id =
            localStorage.getItem(LOCALSTORAGE.INTEGRATION_COMPANY_SELECTED) || "";
        const external_user_id =
            localStorage.getItem(LOCALSTORAGE.SOLLAR_INTEGRATION_USER_ID) || "";
        let integrationToken = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION_TOKEN) || "";

        if (token) {
            config.headers!.token = `${token}`;
            config.headers!.user = JSON.stringify({id: user_id, username});
            config.headers!.company_id = company_id;
            config.headers!.customer_id = customer_id;
        }

        if (integration_url) {
            config.headers!.integration_url = integration_url;
            config.headers!.integration_token = integrationToken;
            config.headers!.external_company_id = external_company_id;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

apiSollarReport.interceptors.response.use(
    (response) => {
        const file = new Blob([response.data], {type: "application/pdf"});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        return response;
    },
    (error) => {
        if (!error.response) return;

        // const { errors } = error.response.data;
        // if (errors?.name === "TokenExpiredError") {
        //     localStorage.removeItem(LOCALSTORAGE.TOKEN);
        //     localStorage.setItem(
        //         LOCALSTORAGE.EXPIRED_SESSION,
        //         JSON.stringify(errors)
        //     );
        //     window.location.href = "/login";
        // }
        return Promise.reject(error);
    }
);
apiSollarNexoData.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
        const username = localStorage.getItem(LOCALSTORAGE.USERNAME) || "";
        const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID) || "";
        const company_id =
            localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED) || "";
        const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER) || "";
        const integration_url = integrationUrl;
        const external_company_id =
            localStorage.getItem(LOCALSTORAGE.INTEGRATION_COMPANY_SELECTED) || "";
        const external_user_id =
            localStorage.getItem(LOCALSTORAGE.SOLLAR_INTEGRATION_USER_ID) || "";
        let integrationToken = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION_TOKEN) || "";

        if (token) {
            config.headers!.token = `${token}`;
            config.headers!.user = JSON.stringify({id: user_id, username});
            config.headers!.company_id = company_id;
            config.headers!.customer_id = customer_id;
        }

        if (integration_url) {
            config.headers!.integration_url = integration_url;
            config.headers!.integration_token = integrationToken;
            config.headers!.external_company_id = external_company_id;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

apiSollarNexoData.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) return;

        const {errors} = error.response.data;
        if (errors?.name === "TokenExpiredError") {
            localStorage.removeItem(LOCALSTORAGE.TOKEN);
            localStorage.setItem(
                LOCALSTORAGE.EXPIRED_SESSION,
                JSON.stringify(errors)
            );
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

googleMaps.interceptors.request.use(
    function (config) {
        config.params = {
            ...config.params,
            key: process.env.REACT_APP_GOOGLE_API_KEY,
        };
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

apiSollarChatbot.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
        const username = localStorage.getItem(LOCALSTORAGE.USERNAME) || "";
        const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID) || "";
        const company_id =
            localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED) || "";
        const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER) || "";
        const integration_url = integrationUrl;
        const external_company_id =
            localStorage.getItem(LOCALSTORAGE.INTEGRATION_COMPANY_SELECTED) || "";
        const external_user_id =
            localStorage.getItem(LOCALSTORAGE.SOLLAR_INTEGRATION_USER_ID) || "";
        let integrationToken = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION_TOKEN) || "";

        if (token) {
            config.headers!.token = `${token}`;
            config.headers!.user = JSON.stringify({id: user_id, username});
            config.headers!.company_id = company_id;
            config.headers!.customer_id = customer_id;
        }

        if (integration_url) {
            config.headers!.integration_url = integration_url;
            config.headers!.integration_token = integrationToken;
            config.headers!.external_company_id = external_company_id;
        }

        return config;
    },

    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);
