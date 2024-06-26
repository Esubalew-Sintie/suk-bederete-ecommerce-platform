"use client";
import React, { useState, useEffect } from "react";
import { useGetshopQuery } from "@/lib/features/webBuilder/webBuilder";
import Loading from "@/app/[locale]/loading";
import { useRouter } from "next/navigation";

export default function ContactPage({ params }) {
  const shopId = params.shopId;
  const [contactpage, setContactpage] = useState({});
  const { data, error, isLoading } = useGetshopQuery(shopId);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const homePageData = data.find((page) => page.name === "Contact");
      setContactpage(homePageData);
    }
  }, [data]);

  useEffect(() => {
    const handleClick = (event) => {
      event.preventDefault();
      router.push(`/${shopId}/blog`);
    };

    const blogLink = document.getElementById("blog");
    if (blogLink) {
      blogLink.addEventListener("click", handleClick);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (blogLink) {
        blogLink.removeEventListener("click", handleClick);
      }
    };
  }, [router, shopId]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!contactpage) {
    return <div>No home page found.</div>;
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: contactpage.html }} />
      <style>{contactpage.css}</style>
      <script>{contactpage.js}</script>
    </div>
  );
}
