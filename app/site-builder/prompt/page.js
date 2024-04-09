import {PromptCard} from "@/app/components/SiteBuilder/components/PromptCard";
import React from "react";

const prompt = () => {
	return (
		<div className="bg-gradient-to-r from-violet-200 to-pink-200 w-screen h-screen flex  justify-center items-center">
      <PromptCard  prompt='prompt1' link='/site-builder/second-prompt' skip='/site-builder/second-prompt'/>
      
		</div>
	);
};

export default prompt;
