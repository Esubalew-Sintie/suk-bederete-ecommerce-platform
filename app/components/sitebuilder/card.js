"use client";
import React, { useState, useEffect } from "react";
import WithGrapesjs from "./GrapesjsMain";
import grapesJSMJML from "grapesjs-mjml";
import {
  useGetWebBuilderQuery,
  useGetWebBuildersQuery,
  useGetPageContentQuery,
} from "@/lib/features/webBuilder/webBuilder";

const dynamicConfiguration = {
  plugin: [
    // {
    //   name: 'grapesjs-blocks-bootstrap4-1',
    //   //alert will not render
    //   blocks: { alert: false },
    //   // layout category will not render
    //   blockCategories: { },
    // },
    // {
    //   name: 'plugin1',
    //   //alert will not render
    //   blocks: { },
    //   // layout category will not render
    //   blockCategories: { },
    // },
  ],
};

const Card = (props) => {
  const templateId = props.templetId;
  const { data: page, isLoading: pageLoading } =
    useGetPageContentQuery(templateId);
  console.log(page);
  const [initAppData, setData] = useState(null);
  const [loading, setLoading] = useState({
    get: false,
    update: false,
  });
  const [displayPage, setDisplayPage] = useState(false);

  useEffect(() => {
    if (page && !pageLoading) {
      // Map over each page in the list and create an array of page configurations
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

      // Set the page configurations array as the data
      setData(pageConfigs);

      // Set displayPage to true to render the component
      setDisplayPage(true);
    }
  }, [page, pageLoading]);

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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Card;
