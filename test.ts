import { Haaku } from "./mod.ts";

const haaku = new Haaku({
  baseUrl: "http://localhost:8080",
  apiKey: "tk_01df700af1ca1880dcc7e71dd5291b37a3b9bd460c69bfdda88a9c75061580d5",
  fetch,
});

const test = await haaku.admin.unlockUser({id: "local_RiG2fHoT4dMAU9Ien85aTg"})
console.log(test)