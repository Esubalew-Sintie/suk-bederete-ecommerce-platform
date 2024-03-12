import React from "react"
import TemplateNavbar from "@/app/web-builder/templates/template1/NavBar";
import ReactDOMServer from "react-dom/server"; 

const GrapesConfigjs = () => {
  
    return {
      container: '#gjs',
      height: '300px',
      width: 'auto',
      blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'section', // id is mandatory
            label: '<b>Section</b>', // You can use HTML/SVG inside labels
            attributes: { class:'gjs-block-section' },
            content: `<section>
            <h1>This is a simple title</h1>
            <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
          }, {
            id: 'text',
            label: 'Text',
            content: '<div data-gjs-type="text">Insert your text here</div>',
          }, {
            id: 'image',
            label: 'Image',
            // Select the component once it's dropped
            select: true,
            // You can pass components as a JSON instead of a simple HTML string,
            // in this case we also use a defined component type `image`
            content: { type: 'image' },
            // This triggers `active` event on dropped components and the `image`
            // reacts by opening the AssetManager
            activate: true,
          }
        ]
      },
      storageManager: false,
      panels: { defaults: [] },
      components: [
        {
            tagName: 'Header',
            // Use the string representation of the TemplateNavbar component
            content: '<h1>This is canvas</h1>',
        },
    ],
     
    };
  };
  
  export default GrapesConfigjs;
  