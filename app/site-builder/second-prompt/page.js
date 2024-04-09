"use client"

import { PromptCard } from "@/app/components/SiteBuilder/components/PromptCard"

export default function SecondPrompt() {
    return (
        <div className="bg-gradient-to-r from-violet-200 to-pink-200 w-screen h-screen flex  justify-center items-center">

            <PromptCard link='/selecttheme' prompt='prompt2' skip='/' />
            </div>
  )
}
