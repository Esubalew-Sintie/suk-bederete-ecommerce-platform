// i18nMiddleware.js
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "../i18nConfig"; // Your i18n configuration

export default async function i18nMiddleware(request) {
  try {
    const i18nResponse = await i18nRouter(request, i18nConfig);
    if (i18nResponse) {
      return i18nResponse; // If i18n response exists, return it
    }
  } catch (error) {
    console.error("Error during i18n processing:", error);
  }
}
