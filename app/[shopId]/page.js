"use client";
import React from "react";
import { useGetShopQuery } from "@/lib/features/shop/shop";

export default function shop({ params }) {
  const shopId = params.shopId;
  console.log(shopId);
  const { data, error, isLoading } = useGetShopQuery(shopId);

  console.log(data);

  return (
    <>
      <style>{data?.length > 0 && data[0]?.css}</style>{" "}
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: data[0]?.html }} />
      )}
    </>
  );
}
