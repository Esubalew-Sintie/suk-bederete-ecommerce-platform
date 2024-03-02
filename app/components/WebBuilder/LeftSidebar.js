"use client";
import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

import NotificationDropdown from "../../components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "../../components/Dropdowns/UserDropdown.js";
import {DropdownMenu} from "@/components/ui/dropdown-menu.jsx";
import {DropdownMenuRadioGroupDemo} from "./AddPage/dropDown.js";

export default function Sidebar() {
	const [collapseShow, setCollapseShow] = React.useState("hidden");
	const pathname = usePathname();
	const [addPage, setAddPage] = React.useState(false);
	return (
		<>
			<nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-80 z-10 py-4 px-4">
				<div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
					{/* Toggler */}

					<i className="fas fa-sign-out-alt fa-lg"></i>

					{/* Brand */}
					<div className="flex items-center space-x-4 justify-items-start my-4">
						{/* Input select */}
						<select
							className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500 focus:ring"
							defaultValue="default"
						>
							<option value="default" disabled>
								Home
							</option>
							<option value="1">Product detail</option>
							<option value="2">Checkout</option>
							<option value="3">payment</option>
						</select>

						{/* Settings icon */}
						<div className="rounded-md bg-slate-200 p-2">
							<i className="fas fa-cog fa-lg ml-2"></i>
						</div>
						{/* <div
							className="rounded-md hover:cursor-pointer bg-slate-200 p-2 relative"
						>
						</div> */}
						<DropdownMenuRadioGroupDemo />
					</div>

					<div
						className={
							"md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
							collapseShow
						}
					>
						<div className="rounded-md bg-slate-100 px-2 py-2">
							<ul className="md:flex-col md:min-w-full flex flex-col list-none">
								<li className="items-center rounded-md hover:bg-slate-400 px-3">
									<Link
										href="/admin/dashboard"
										className={
											"text-xs uppercase py-3 font-bold block " +
											(pathname.indexOf("/admin/dashboard") !== -1
												? "text-lightBlue-500 hover:text-lightBlue-600"
												: "text-blueGray-700 hover:text-blueGray-500")
										}
									>
										<i
											className={
												"fas fa-heading mr-2 text-sm " +
												(pathname.indexOf("/admin/dashboard") !== -1
													? "opacity-75"
													: "text-blueGray-300")
											}
										></i>{" "}
										Header
									</Link>
								</li>

								<li className="items-center rounded-md hover:bg-slate-400 px-3">
									<Link
										href="/admin/settings"
										className={
											"text-xs uppercase py-3 font-bold block " +
											(pathname.indexOf("/admin/settings") !== -1
												? "text-lightBlue-500 hover:text-lightBlue-600"
												: "text-blueGray-700 hover:text-blueGray-500")
										}
									>
										<i
											className={
												"far fa-bookmark mr-2 text-sm " +
												(pathname.indexOf("/admin/settings") !== -1
													? "opacity-75"
													: "text-blueGray-300")
											}
										></i>{" "}
										Main Banner
									</Link>
								</li>

								<li className="items-center rounded-md hover:bg-slate-400 px-3">
									<Link
										href="/admin/tables"
										className={
											"text-xs uppercase py-3 font-bold block " +
											(pathname.indexOf("/admin/tables") !== -1
												? "text-lightBlue-500 hover:text-lightBlue-600"
												: "text-blueGray-700 hover:text-blueGray-500")
										}
									>
										<i
											className={
												"fas fa-mail-bulk mr-2 text-sm " +
												(pathname.indexOf("/admin/tables") !== -1
													? "opacity-75"
													: "text-blueGray-300")
											}
										></i>{" "}
										Email newsLetter
									</Link>
								</li>

								<li className="items-center rounded-md hover:bg-slate-400 px-3">
									<Link
										href="/admin/maps"
										className={
											"text-xs uppercase py-3 font-bold block " +
											(pathname.indexOf("/admin/maps") !== -1
												? "text-lightBlue-500 hover:text-lightBlue-600"
												: "text-blueGray-700 hover:text-blueGray-500")
										}
									>
										<i
											className={
												"far fa-window-maximize mr-2 text-sm " +
												(pathname.indexOf("/admin/maps") !== -1
													? "opacity-75"
													: "text-blueGray-300")
											}
										></i>{" "}
										Footer
									</Link>
								</li>
							</ul>

							{/* Divider */}
						</div>
						{/* Heading */}
						<div className="mt-20">
							<button className="w-full bg-slate-100 p-3 rounded-md hover:bg-slate-400">
								<i className="fas fa-plus mr-3"></i>
								Add Section
							</button>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
