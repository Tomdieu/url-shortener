"use client";
import TopShortenUrl from "@/components/Link/TopShortenUrl";
import { Link1Icon } from "@radix-ui/react-icons";
import React from "react";
import { FiMousePointer } from "react-icons/fi";
import UrlPreview from "@/components/UrlPreview";


type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between my-3">
        <h5 className="font-extrabold text-xl md:text-3xl">Dashboard</h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="border p-5 rounded-md flex gap-2 flex-col shadow-md cursor-pointer">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-medium">
              Total numbers of shortened links
            </h5>
            <Link1Icon />
          </div>
          <h5 className="font-bold text-xl">500</h5>
          <span className="block text-gray-400 text-sm">
            +50% from the last month
          </span>
        </div>
        <div className="border p-5 rounded-md flex gap-2 flex-col shadow-md cursor-pointer">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-medium">Total number of clicks</h5>
            <FiMousePointer />
          </div>
          <h5 className="font-bold text-xl">500</h5>
          <span className="block text-gray-400 text-sm">
            +50% from the last month
          </span>
        </div>
        <div className="border p-5 rounded-md flex gap-2 flex-col shadow-md cursor-pointer">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-medium">
              Average click-through rate
            </h5>
            <FiMousePointer />
          </div>
          <h5 className="font-bold text-xl">50%</h5>
          <span className="block text-gray-400 text-sm">
            +30% from the last month
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-2">
        <TopShortenUrl />
      </div>
      <div className="w-[500px] h-[400px] my-5">
        <UrlPreview
          url={"http://github.com/tomdieu"}
        // url={'https://github.com/Tomdieu/momo-app-clone'}
        // url={'http://localhost:3000/dashboard'}

        />
      </div>
    </div>
  );
};

export default Dashboard;
