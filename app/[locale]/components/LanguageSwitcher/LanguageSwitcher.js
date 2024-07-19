"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const LanguageSwitcher = ({ onChange }) => {
  const { i18n } = useTranslation();
  const { language: currentLanguage } = i18n;
  const router = useRouter();
  const locales = router.locales ?? [currentLanguage];
  console.log(locales, "languages");

  const languageNames = useMemo(() => {
    return new Intl.DisplayNames([currentLanguage], { type: "language" });
  }, [currentLanguage]);

  const [value, setValue] = useState(i18n.language);
  console.log(i18n.language);

  const switchToLocale = useCallback(
    (locale) => {
      const path = router.asPath;
      return router.push(path, path, { locale });
    },
    [router]
  );

  const languageChanged = useCallback(
    async (event) => {
      const locale = event.target.value;
      setValue(locale);

      if (onChange) {
        onChange(locale);
      }

      await switchToLocale(locale);
    },
    [switchToLocale, onChange]
  );
  // document.cookie = `access_token=${response.tokens.access}; path=/`;

  return (
    <select
      className="bg-blueGray-800 text-sm text-white font-bold mx-2 rounded-2xl  focus:outline-none"
      value={value}
      onChange={languageChanged}
    >
      <option className="bg-blueGray-800 text-sm text-white font-bold">
        Am
      </option>
      <option className="bg-blueGray-800 text-sm text-white font-bold">
        En
      </option>
    </select>
  );
};

function capitalize(lang) {
  return lang.charAt(0).toUpperCase() + lang.slice(1);
}

export default LanguageSwitcher;
