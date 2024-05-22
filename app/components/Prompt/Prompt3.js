"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setShopName } from "@/lib/features/shop/shopNameSlice";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Prompt3 = () => {
    const [shopNameInput, setShopNameInput] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (event) => {
        setShopNameInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setShopName(shopNameInput));
        localStorage.setItem("shopName", shopNameInput);
        router.push("/selecttheme");
    };

    return (
        <div className="bg-white shadow-xl border-[1px] border-slate-1 rounded-sm p-6 max-w-md mx-auto">
            <form className="mt-4" onSubmit={handleSubmit}>
                <label className="text-xl">
                    Tell us the shop name you want to create
                </label>
                <input
                    type="text"
                    value={shopNameInput}
                    onChange={handleChange}
                    id="shop-name"
                    className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                />
                <Button type="submit" className="block w-full mt-4">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default Prompt3;

