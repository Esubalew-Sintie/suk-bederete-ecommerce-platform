"use client";
import React, { useState, useEffect } from "react";
import { useGetshopQuery } from "@/lib/features/webBuilder/webBuilder";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

export default function BlogPage({ params }) {
    const shopId = params.shopId;
    const [blogpage, setBlogpage] = useState({});
    const { data, error, isLoading } = useGetshopQuery(shopId);
    const router = useRouter();

    useEffect(() => {
        if (data) {
            const homePageData = data.find(page => page.name === 'Blog');
            setBlogpage(homePageData);
        }
    }, [data]);

    useEffect(() => {
        const handleClick = (event) => {
            event.preventDefault();
            router.push(`/${shopId}/blog`);
        };

        const blogLink = document.getElementById('blog');
        if (blogLink) {
            blogLink.addEventListener('click', handleClick);
        }

        // Cleanup event listener on component unmount
        return () => {
            if (blogLink) {
                blogLink.removeEventListener('click', handleClick);
            }
        };
    }, [router, shopId]);

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!blogpage) {
        return <div>No home page found.</div>;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: blogpage.html }} />
            <style>{blogpage.css}</style>
            <script>{blogpage.js}</script>
        </div>
    );
}
