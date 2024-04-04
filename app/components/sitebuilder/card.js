"use client"
import React, { useState, useEffect } from 'react';
import WithGrapesjs from './GrapesjsMain';
import grapesJSMJML from 'grapesjs-mjml';
import { useGetWebBuilderQuery, useGetWebBuildersQuery } from '@/lib/features/webBuilder/webBuilder';

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
  const { data: template, isLoading: templateLoading } = useGetWebBuilderQuery(templateId);
  const [initAppData, setData] = useState(null);
  const [loading, setLoading] = useState({
    get: false,
    update: false
  });
  const [displayPage, setDisplayPage] = useState(false);

  useEffect(() => {
    if (template && !templateLoading) {
      setData({
        name: "Home", // remove name field from here
        brand_url: '',
        canonical: null,
        slug: '',
        configuration: dynamicConfiguration,
        content: {
          html: template.html,
          css: template.css,
        }
      });
      setDisplayPage(true);
    }
  }, [template, templateLoading]);

  return (
    <div>
      {displayPage && initAppData ? (
        <WithGrapesjs templateId={templateId} {...props} data={initAppData} setData={setData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Card;
