"use client";

import React, {useEffect, useState} from "react";

// components

import CardLineChart from "@/app/components/Cards/CardLineChart.js";
import CardBarChart from "@/app/components/Cards/CardBarChart.js";
import CardPageVisits from "@/app/components/Cards/CardPageVisits.js";
import CardSocialTraffic from "@/app/components/Cards/CardSocialTraffic.js";

// layout for page

import {AdminWithOutNav} from "@/app/layouts/Admin";
import EnhancedTable from "@/app/components/Tables/orderList";
import Order from "@/app/components/Tables/orderDetial";
import {orderHeadCells} from "@/util/headCells";
import Loader from "@/app/components/Prompt/Loader";
import {toast} from "react-hot-toast";

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);
	const [sseConnection, setSseConnection] = useState(null);

	function showOrderNotification() {
		toast.success("New Order", {
			description: "A new order has been placed.",
			duration: 5000, // Duration of the notification in ms
		});
	}

	// Fetch initial data
	useEffect(() => {
		fetch("http://localhost:8000/order/orders/")
			.then((response) => response.json())
			.then((data) => {
				console.log("Initial orders:", data); // Debugging
				setOrders(data);
			})
			.catch((error) => console.error("Error fetching initial orders:", error));
	}, []);

	// Establish SSE connection
	useEffect(() => {
		const url = "http://localhost:8000/order/stream/";
		const eventSource = new EventSource(url);
		setSseConnection(eventSource);

		eventSource.onmessage = (event) => {
			const newData = JSON.parse(event.data);
			console.log("New data:", newData); // Debugging
			// Check if newData is an array and append it to orders
			if (Array.isArray(newData)) {
				setOrders((prevOrders) => [...newData]);
			} else {
				// If newData is not an array, assume it's a single order and append it
				setOrders((prevOrders) => [...prevOrders, newData]);
			}
			showOrderNotification();
		};

		eventSource.onerror = (error) => {
			console.error("EventSource failed:", error);
			eventSource.close();
			// Attempt to reconnect or notify the user here
		};

		return () => {
			eventSource.close();
		};
	}, []);

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
				{orders?.length > 0 ? (
					<EnhancedTable
						key={orders.length} // Change this key to force a re-render
						rows={orders}
						title={"Pending Order"}
						headCells={orderHeadCells}
						onButtonClick={(event, row) => console.log("Button clicked", row)} // Placeholder for button click handler
					/>
				) : (
					<Loader />
				)}
			</div>
			<div className="flex flex-wrap mt-4">
				{orders?.length > 0 ? (
					<EnhancedTable
						key={orders.length + 1}
						rows={orders}
						title={" delivered Order"}
						headCells={orderHeadCells}
						onButtonClick={(event, row) => console.log("Button clicked", row)} // Placeholder for button click handler
					/>
				) : (
					<Loader />
				)}
			</div>
			{/* <Order /> */}
		</AdminWithOutNav>
	);
}
