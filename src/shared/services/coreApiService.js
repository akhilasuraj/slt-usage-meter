import axios from "axios";
import { LocalStorageKeys, HeaderKeys, appConfig } from "../constants/constants";
import { store } from "../../app/store";
import { setIsLoading } from "../../features/globalSpinner/globalSpinnerSlice";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common[HeaderKeys.ClientId] = appConfig.clientId;
axios.defaults.baseURL = appConfig.apiUrl;

const get = async (controller, action, urlParams, queryParams = null) => await makeHttpRequest("get", controller, action, urlParams, queryParams, null);
const post = async (controller, action, data, urlParams) => await makeHttpRequest("post", controller, action, urlParams, undefined, data);

const getContextHeaders = () => {
  let accessToken = localStorage.getItem(LocalStorageKeys.AccessToken);

  if (!accessToken) {
    accessToken = "";
  }
  return {
    Authorization: "Bearer " + accessToken,
  };
};

const createUrl = (controler, action, urlParams) => {
  let url = controler + (action !== "" ? "/" + action : "");
  if (urlParams != null) {
    url += "/" + urlParams.join("/");
  }
  return url;
};

const makeHttpRequest = async (httpMethod, controller, action = "", urlParams = undefined, queryParams = null, data = null) => {
  let requestConfig = {
    method: httpMethod,
    url: createUrl(controller, action, urlParams),
    params: queryParams,
    headers: action !== "Login" ? getContextHeaders() : axios.defaults.headers,
    data: data,
  };
  store.dispatch(setIsLoading(true));
  let response = await axios
    .request(requestConfig)
    .then((res) => {
      store.dispatch(setIsLoading(false));
      return res;
    })
    .catch((err) => {
      console.log(err);
      store.dispatch(setIsLoading(false));
    });
  return response;
};

export const coreApiService = {
  get,
  post,
};
