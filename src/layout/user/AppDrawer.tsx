/* eslint-disable @next/next/no-img-element */
"use client";

import { Tooltip } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlEnvolopeLetter } from "react-icons/sl";

function AppDrawer({ isAppDrawerOpen }: { isAppDrawerOpen: boolean }) {
  const menuArray = [
    {
      id: "1",
      name: "Dashboard",
      path: "/user",
      icon: <LuLayoutDashboard className="text-xl" />,
    },
    {
      id: "2",
      name: "Loan Applications",
      path: "/user/loan-application",
      icon: <SlEnvolopeLetter className="text-xl" />,
    },
    {
      id: "3",
      name: "Loan Reports",
      path: "/user/loan-reports",
      icon: <IoDocumentTextOutline className=" text-xl" />,
    },
  ];
  const { asPath, push } = useRouter();
  const [open, setOpen] = useState<string | null>(null);

  const handleMatchOpen = (title: string, path: string) => {
    setOpen(open === title ? null : title);
    push(path);
  };
  return (
    <div className="flex flex-col text-black h-full bg-[#DAEBFE] border-gray-300 justify-between gap-8 ">
      <div className="flex flex-col gap-3 my-2 items-center justify-center">
        <div className="p-1 ">
          {isAppDrawerOpen ? (
            <Link href="/user">
              <img src="/logo.svg" alt="logo" className="w-56" />
            </Link>
          ) : (
            <div className="flex font-bold text-5xl">
              <span className="text-[#FBA919]">M</span>
              <span className=" text-[#2D8ACA]">L</span>
            </div>
          )}
        </div>
        <div className=" pt-4 border-t border-blue-200">
          <div className="w-full flex flex-col gap-3">
            {menuArray.map((item, index) => {
              const isActive = item.path === asPath;
              return (
                <div key={index} className="flex flex-col !gap-2">
                  <div className="w-full flex flex-col">
                    <div
                      onClick={() => handleMatchOpen(item.name, item.path)}
                      className={`w-full text-sm font-medium flex items-center justify-between p-1 ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-400 to-blue-400 text-gray-700 shadow-lg"
                          : "hover:bg-white "
                      } rounded-lg cursor-pointer ${
                        isAppDrawerOpen ? "pr-5 pl-1" : ""
                      }`}
                    >
                      <div
                        className={`w-full flex items-center gap-2 ${
                          !isAppDrawerOpen ? "justify-center" : ""
                        }`}
                      >
                        <div
                          className={`h-10 w-10 flex items-center justify-center  ${
                            isActive
                              ? "text-white"
                              : " text-gray-700 hover:bg-blue-100"
                          }`}
                        >
                          {item.icon}
                        </div>
                        {isAppDrawerOpen && (
                          <div
                            className={`font-medium text-lg ${
                              isActive ? "text-white" : "text-gray-700"
                            }`}
                          >
                            {item.name}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" flex flex-col border-t border-blue-200  p-3 justify-center items-center">
        {isAppDrawerOpen ? (
          <>
            <div className="flex flex-col items-center">
              <img
                src="/profile.avif"
                className="rounded-full w-20 h-20"
                alt="Profile Picture"
              />
              <p className="font-sans font-bold text-gray-700">Vikash Kumhar</p>
            </div>
            <Link href="/">
              <button className="font-sans font-bold text-blue-500 text-center border bg-white rounded-md hover:text-white hover:bg-blue-500 mt-3 px-3 py-2">
                Log Out
              </button>
            </Link>
          </>
        ) : (
          <Tooltip title="Log Out">
            <Link href="/">
              <button className="p-2 hover:bg-gradient-to-r from-indigo-400 to-blue-400 rounded-md text-gray-700 text-2xl hover:text-white ">
                <IoIosLogOut />
              </button>
            </Link>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default AppDrawer;
