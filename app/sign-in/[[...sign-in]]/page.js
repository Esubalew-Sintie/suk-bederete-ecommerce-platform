import { SignIn } from "@clerk/nextjs";

// export default function Page() {
//   console.log("signin");
//   return <SignIn />;
// }

("use client");
import React, { useState, useEffect } from "react";
// import Link from "next/link";
import Auth from "../../layouts/Auth";
// import { useLoginMutation } from "@/lib/features/auth/authMerchant";
// import { useRouter } from "next/navigation";
// import { setMerchant } from "@/lib/features/auth/merchantSlice";
// import { useDispatch } from "react-redux";
// import {
//   useGetCustomizedTemplateQuery,
//   useGetshopMerchantQuery,
// } from "@/lib/features/shop/shop";
// import { useTranslation } from "react-i18next";
import TranslationsProvider from "../../components/Translation/TranslationsProvider";
// import initTranslations from "@/app/i18n";
const i18nNamespaces = ["login"];
export default function Login({ params: { locale } }) {
  // const [login, { isLoading, isError, error }] = useLoginMutation();
  // console.log(locale);
  const [translations, setTranslations] = useState({
    t: () => {}, // Placeholder function until translations are loaded
    resources: {},
  });

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const { t, resources } = await initTranslations(locale, i18nNamespaces);
        setTranslations({ t, resources });
        console.log("Translations initialized successfully");
      } catch (error) {
        console.error("Error initializing translations:", error);
        // Optionally, handle the error further here
      }
    };

    loadTranslations();
  }, [locale]); // Re-run the effect if the locale changes

  if (!translations.t) {
    return null; // Or a loading indicator
  }

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [merchantId, setMerchantId] = useState("");
  // const [responseMessage, setResponseMessage] = useState("");

  // const router = useRouter();
  // const dispatch = useDispatch();

  // const {
  //   data: shopMerchant,
  //   error: shopError,
  //   isSuccess: isShopSuccess,
  // } = useGetshopMerchantQuery(merchantId, {
  //   skip: !merchantId,
  // });
  // const {
  //   data: customizedTemplate,
  //   error: templateError,
  //   isSuccess: isTemplateSuccess,
  // } = useGetCustomizedTemplateQuery(merchantId, {
  //   skip: !merchantId,
  // });

  // useEffect(() => {
  //   if (merchantId) {
  //     if (isShopSuccess && shopMerchant) {
  //       router.push("/admin/dashboard");
  //     } else if (isTemplateSuccess && customizedTemplate) {
  //       router.push(`/site-builder/${customizedTemplate.id}`);
  //     } else if (merchantId) {
  //       router.push("/prompt/prompt");
  //     }
  //   }
  // }, [
  //   merchantId,
  //   isShopSuccess,
  //   shopMerchant,
  //   isTemplateSuccess,
  //   customizedTemplate,
  //   router,
  // ]);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append("email", email);
  //     formData.append("password", password);

  //     const response = await login(formData).unwrap();

  //     console.log(response.message);
  //     dispatch(setMerchant(response.merchant));
  //     localStorage.setItem("unique_id", response.merchant.unique_id);
  //     localStorage.setItem("access_token", response.tokens.access);
  //     localStorage.setItem("refresh_token", response.tokens.refresh);
  //     setMerchantId(response.merchant.unique_id);
  //   } catch (error) {
  //     console.error("Login failed:", error.message);
  //     setResponseMessage(error.message);
  //   }
  // };

  return (
    // <TranslationsProvider
    //   namespaces={i18nNamespaces}
    //   locale={locale}
    //   resources={translations.resources}
    // >
    <div className="flex items-center justify-center min-h-screen bg-red-900">
      {" "}
      <SignIn />;
    </div>
    // </TranslationsProvider>
  );
}
