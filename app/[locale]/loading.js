"use client";
import "../globals.css";

import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  );
}

export default function Loading() {
  return (
    <div className="loader-container">
      <Loader />
    </div>
  );
}
