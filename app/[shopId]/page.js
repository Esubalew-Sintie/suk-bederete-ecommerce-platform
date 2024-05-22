"use client";
import React from "react";
import { useGetshopQuery } from "@/lib/features/webBuilder/webBuilder";

export default function shop({ params }) {
    const shopId = params.shopId;
    const { data, error, isLoading }  = useGetshopQuery(shopId);
    console.log(data);
    return (
        <div>
            <h1>hello</h1>
        </div>
    )
}