"use client";
import React, { useState, useEffect } from "react";
import WithGrapesjs from "./GrapesjsMain";
import Loader from "../Prompt/Loader";
import {
  useGetPageContentQuery,
} from "@/lib/features/webBuilder/webBuilder";
import { useGetCustomisedPageQuery } from "@/lib/features/shop/shop";
import { useGetCustomisedPagesQuery } from "@/lib/features/shop/shop";
const dynamicConfiguration = {
  plugin: [
    // Define your plugins here
  ],
};

const Card = (props) => {
  const templateId = props.templetId;
  const { data: page, isLoading: pageLoading } =
    useGetPageContentQuery(templateId);

  
  const [initAppData, setData] = useState(null);
  const [loading, setLoading] = useState({
    get: false,
    update: false,
  });
  const [displayPage, setDisplayPage] = useState(false);

  // Set merchantId from localStorage
  // useEffect(() => {
  //   const storedmerchantId = localStorage.getItem("unique_id");
  //   setMerchantId(storedmerchantId);
  // }, []);

  // Fetch customized pages only when merchantId is set
  const merchantId = localStorage.getItem("unique_id");
  const { data: customized_pages, isLoading: customized_pagesLoading } = useGetCustomisedPagesQuery(merchantId, {
    skip: !merchantId, // Skip the query if merchantId is null
  });

  useEffect(() => {
    if (customized_pages && !customized_pagesLoading) {
      console.log("sending the customised page")
      const pageConfigs = customized_pages.map((pageItem) => ({
        name: pageItem?.name,
        brand_url: "",
        canonical: null,
        slug: "",
        configuration: dynamicConfiguration,
        content: {
          html: pageItem?.html,
          css: pageItem?.css,
        },
      }));

      setData(pageConfigs);
      setDisplayPage(true);
    } else if (page && !pageLoading) {
      console.log("sending the not customised page")
      const pageConfigs = page.map((pageItem) => ({
        name: pageItem?.name,
        brand_url: "",
        canonical: null,
        slug: "",
        configuration: dynamicConfiguration,
        content: {
          html: pageItem?.html,
          css: pageItem?.css,
        },
      }));

      setData(pageConfigs);
      setDisplayPage(true);
    }
  }, [page, pageLoading, customized_pages, customized_pagesLoading]);

  return (
    <div>
      {displayPage && initAppData ? (
        <WithGrapesjs
          templateId={templateId}
          page={page}
          {...props}
          data={initAppData}
          setData={setData}
        />
      ) : (
        <div className="loader-container">
          <Loader />
        </div>
      )}
    </div>
  );
};
export default Card;
