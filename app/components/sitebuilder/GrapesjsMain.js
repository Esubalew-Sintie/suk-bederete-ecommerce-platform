// components/GrapesEditor.js
"use client"
import React, { useEffect } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { createCustomComponent } from './customComponent';
import parserPostCSS from 'grapesjs-parser-postcss';
import plugin from 'grapesjs-blocks-basic';
import grapes from 'grapesjs-preset-webpage'

const GrapesEditor = () => {
   
  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      storageManager: false, // Disable storage manager
      plugins: [grapes, parserPostCSS, plugin], // Load a preset plugin for a basic webpage
      pluginsOpts: {
        'gjs-preset-webpage': {
          modalImportTitle: 'Import Template', // Title for the import modal
          modalImportButton: 'Import', // Text on the import button
          modalImportLabel: '', // Label for the input area
          modalImportContent: '', // Content to import
          modalImportPlaceholder: 'Paste your HTML/CSS here', // Placeholder for the input area
        },
        
      },
      components: '<h1>This is Demo editor</h1>', // Initial content of the editor
      css: "../../../styles/grapes.css"// Initial CSS styling of the editor
    });
    editor.BlockManager.add('my-block-id', {
      label: 'My Block',
      content: '<div class="my-block">My Block Content</div>',
      category: 'Custom Blocks',
    });
    

    return () => {
      editor.destroy();
    };
  }, []);

  return <div id="gjs">
    
  </div>;
};

export default GrapesEditor;
