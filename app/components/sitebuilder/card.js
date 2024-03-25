"use client"
import React,{ useState, useEffect } from 'react';
import WithGrapesjs from './GrapesjsMain';
import grapesJSMJML from 'grapesjs-mjml'
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

  const initialAppState = {
    name : "page 1", // remove name field from here
    brand_url:'',
    canonical:null,
    slug:'',
    configuration: dynamicConfiguration,
    content:{
      html : "",
      css: ""
    }
  };

const Card = (props) => {
  const { data } = useGetWebBuilderQuery(props.templteId)
  console.log(data);
    const [initAppData, setData] = useState(initialAppState);
    const { pageData, updatePageSelector } = props;
    const [loading, setLoading] = useState({
      get:false,
      update:false
    });
    const [displayPage, setDisplayPage] = useState(false);

    useEffect(() => {
      setData({...initialAppState})
      setDisplayPage(false)
    }, [])
    return (
        <div>
          {
            // displayPage && initAppData.name ?
            <WithGrapesjs {...props} data={initAppData} setData={setData}/>
            // :
            // <LoadingIndicator/>
          }
        </div>
    )
}

export default Card