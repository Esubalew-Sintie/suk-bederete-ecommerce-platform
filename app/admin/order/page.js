import React from "react";

// components

import CardLineChart from "@/app/components/Cards/CardLineChart.js";
import CardBarChart from "@/app/components/Cards/CardBarChart.js";
import CardPageVisits from "@/app/components/Cards/CardPageVisits.js";
import CardSocialTraffic from "@/app/components/Cards/CardSocialTraffic.js";

// layout for page

import {AdminWithOutNav} from "@/app/layouts/Admin";
import EnhancedTable from "@/app/components/Tables/orderList";
const orders = [
    {
      product: "cake1",
      status: "pending",
      paymentStatus: "paid",
      payment: "chapa",
      shippingMethod: "bdu",
      amount: "100 ETB",
      date: "1/5/2024",
      placedBy: "abebe",
      action: "edit and delete",
    },
    // Additional orders
    {
      product: "cake2",
      status: "shipped",
      paymentStatus: "unpaid",
      payment: "mobile money",
      shippingMethod: "express",
      amount: "200 ETB",
      date: "2/5/2024",
      placedBy: "tadesse",
      action: "edit and delete",
    },
    {
      product: "donut1",
      status: "delivered",
      paymentStatus: "paid",
      payment: "bank transfer",
      shippingMethod: "standard",
      amount: "150 ETB",
      date: "3/5/2024",
      placedBy: "selam",
      action: "edit and delete",
    },
    {
      product: "cookie1",
      status: "cancelled",
      paymentStatus: "refunded",
      payment: "credit card",
      shippingMethod: "priority",
      amount: "300 ETB",
      date: "4/5/2024",
      placedBy: "yohannes",
      action: "edit and delete",
    },
    {
      product: "pie1",
      status: "processing",
      paymentStatus: "pending",
      payment: "cash on delivery",
      shippingMethod: "economy",
      amount: "250 ETB",
      date: "5/5/2024",
      placedBy: "michael",
      action: "edit and delete",
    },
    // Three more orders
    {
      product: "brownie1",
      status: "ready to ship",
      paymentStatus: "unpaid",
      payment: "online banking",
      shippingMethod: "overnight",
      amount: "75 ETB",
      date: "6/5/2024",
      placedBy: "daniel",
      action: "edit and delete",
    },
    {
      product: "muffin1",
      status: "preparing",
      paymentStatus: "paid",
      payment: "wallet",
      shippingMethod: "express",
      amount: "85 ETB",
      date: "7/5/2024",
      placedBy: "emma",
      action: "edit and delete",
    },
    {
      product: "cupcake1",
      status: "completed",
      paymentStatus: "refunded",
      payment: "credit card",
      shippingMethod: "standard",
      amount: "120 ETB",
      date: "8/5/2024",
      placedBy: "lucas",
      action: "edit and delete",
    },
  ];
  
export default function Dashboard() {
  return (
    <AdminWithOutNav>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <EnhancedTable rows={orders} />
      </div>
    </AdminWithOutNav>
  );
}
