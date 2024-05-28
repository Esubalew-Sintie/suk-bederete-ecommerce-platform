"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Auth from "../../layouts/Auth";
import { useLoginMutation } from "@/lib/features/auth/authMerchant";
import { useRouter } from "next/navigation";
import { setMerchant } from "@/lib/features/auth/merchantSlice";
import { useDispatch } from "react-redux";
import { useGetCustomizedTemplateQuery, useGetshopMerchantQuery } from "@/lib/features/shop/shop";

export default function Login() {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: shopMerchant, error: shopError, isSuccess: isShopSuccess } = useGetshopMerchantQuery(merchantId, {
    skip: !merchantId,
  });
  const { data: customizedTemplate, error: templateError, isSuccess: isTemplateSuccess } = useGetCustomizedTemplateQuery(merchantId, {
    skip: !merchantId,
  });

  useEffect(() => {
    if (merchantId) {
      if (isShopSuccess && shopMerchant) {
        router.push("/admin/dashboard");
      } else if (isTemplateSuccess && customizedTemplate) {
        router.push(`/site-builder/${customizedTemplate.id}`);
      } else if (merchantId) {
        router.push("/prompt/prompt");
      }
    }
  }, [merchantId, isShopSuccess, shopMerchant, isTemplateSuccess, customizedTemplate, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await login(formData).unwrap();

      console.log(response.message);
      dispatch(setMerchant(response.merchant));
      localStorage.setItem('unique_id', response.merchant.unique_id);
      localStorage.setItem('access_token', response.tokens.access);
      localStorage.setItem('refresh_token', response.tokens.refresh);
      setMerchantId(response.merchant.unique_id);
    } catch (error) {
      console.error("Login failed:", error.message);
      setResponseMessage(error.message);
    }
  };

  return (
    <Auth>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                {responseMessage && (
                  <div className="text-center mt-4">
                    <p className="text-red-500">{responseMessage}</p>
                  </div>
                )}
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/auth/register" className="text-blueGray-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Auth>
  );
}
