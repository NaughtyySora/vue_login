import type { Meta } from "@/lib/createApi";

export const authMeta = {
  url: "https://test.com/api/auth",
  endpoints: [
    ["get", "user", ["email"]],
    ["post", "singIn", ["email", "password"]],
    ["post", "singUp", ["email", "name", "password"]],
    ["post", "forgot", ["email"]]
  ] as Meta["endpoints"],
};
