"use client";
import { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import pluginWebpage from "grapesjs-preset-webpage";
import pluginBlocksBasic from "grapesjs-blocks-basic";
import pluginForms from "grapesjs-plugin-forms";
import pluginNavbar from "grapesjs-navbar";

const GrapesEditor = () => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const editorInstance = grapesjs.init({
      container: "#editor",
      plugins: [pluginBlocksBasic, pluginWebpage, pluginForms, pluginNavbar],
      pluginsOpts: {
        [pluginWebpage.name]: {},
        [pluginBlocksBasic.name]: {},
        [pluginForms.name]: {},
        [pluginNavbar.name]: {},
      },
    });

    setEditor(editorInstance);

    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
  }, []);

  const exportTemplate = () => {
    if (editor) {
      // Export the template
      const html = editor.getHtml();
      const css = editor.getCss();
      console.log("Exported HTML:", html);
      console.log("Exported CSS:", css);

      // Save the exported template to local storage
      localStorage.setItem("exportedTemplate", JSON.stringify({ html, css }));

      // Clear the canvas
      editor.setComponents("");
    }
  };

  const loadTemplate = () => {
    const storedTemplate = localStorage.getItem("exportedTemplate");
    if (storedTemplate) {
      const { html, css } = JSON.parse(storedTemplate);
      if (editor) {
        // Load the template
        editor.setComponents(html);
        editor.addStyle(css);

        // Optionally, simulate a click on the canvas to focus it
      }
    } else {
      console.log("No template found in local storage.");
    }
  };

  return (
    <div>
      <div id="editor"></div>
      <button
        className="px-3 py-1 m-4 bg-slate-800 rounded"
        onClick={exportTemplate}
      >
        Export Template
      </button>
      <button
        className="px-3 py-1 m-4 bg-slate-800 rounded"
        onClick={loadTemplate}
      >
        Load Template
      </button>
    </div>
  );
};

export default GrapesEditor;
