import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, type Locale } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedLocale = await requestLocale;
  let locale = resolvedLocale || defaultLocale;

  // Validate if locale is supported
  if (!locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  const messages = await import(`./messages/${locale}.json`).then(
    (m) => m.default,
  );

  return {
    locale,
    messages,
  };
});
