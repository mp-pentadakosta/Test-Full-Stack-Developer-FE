"use client";
import Lottie from "lottie-react";
import * as React from "react";

import notFound from "../public/lottie/404.json";

export default function Custom404() {
  return (
    <div
      className={`flex flex-col justify-center items-center h-screen w-screen`}
    >
      <div className={``}>
        <Lottie
          animationData={notFound}
          loop={true}
          style={{ margin: "auto", width: "60%", height: "60%" }}
        />
        <div className={`h-10 w-10`} />
        <h1 className={`text-4xl font-extrabold text-center px-4`}>
          404 - Halaman Tidak Ditemukan
        </h1>
        ;
      </div>
    </div>
  );
}
