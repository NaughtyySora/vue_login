import { prepareParams } from "./prepareParams";

export interface Meta {
  url: string,
  endpoints: Array<[string, string, string[]?]>
}

type BuildParameters = Meta["endpoints"][number][2];
type Api = Record<string, ReturnType<typeof builders[keyof typeof builders]>>;

const buildGet = (url: string, parameters?: BuildParameters) =>
  (params?: Record<keyof typeof parameters, any>) =>
    fetch(`${url}${prepareParams(params)}`);

const buildPost = (url: string, parameters?: BuildParameters) =>
  (body: Record<keyof typeof parameters, any>, args: Omit<RequestInit, "body"> = {}) =>
    fetch(url, { method: "POST", body: body instanceof FormData ? body : JSON.stringify(body), ...args });

const builders = {
  get: buildGet,
  post: buildPost,
};

export const createApi = (meta: Meta) => {
  const api: Api = {};

  for (const [method, endpoint, params] of meta.endpoints) {
    if (!method || !endpoint) continue;
    const url = `${meta.url}/${endpoint}`;
    const builder = builders[method.toLowerCase() as keyof typeof builders];
    api[endpoint] = builder(url, params);
  }
  return api;
};