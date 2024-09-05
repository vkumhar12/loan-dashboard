/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import AwayListener from "@/components/AwayListener";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import {
  AiOutlineBarChart,
  AiOutlineClose,
  AiOutlineCustomerService,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineMenuFold,
} from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsBoxArrowRight, BsGear, BsPersonVideo } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { HiOutlineDocument, HiOutlineDocumentChartBar } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";

interface Props {
  setShortcutOpen: Dispatch<SetStateAction<boolean>>;
  isShortcutOpen: boolean;
}
interface PM {
  setIsProfileContentOpen: Dispatch<SetStateAction<boolean>>;
  isProfileContentOpen: boolean;
}
interface NDM {
  setIsContentOpen: Dispatch<SetStateAction<boolean>>;
  isContentOpen: boolean;
}

const AppBar = ({
  setResponsiveExpand,
  setIsAppDrawerOpen,
  isAppDrawerOpen,
}: {
  setResponsiveExpand: Dispatch<SetStateAction<boolean>>;
  setIsAppDrawerOpen: Dispatch<SetStateAction<boolean>>;
  isAppDrawerOpen: boolean;
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [isShortcutOpen, setShortcutOpen] = useState(false);
  const [isProfileContentOpen, setIsProfileContentOpen] = useState(false);

  const toggleFullScreen = (
    isFullScreen: boolean,
    setIsFullScreen: Dispatch<SetStateAction<boolean>>
  ) => {
    const element = document.documentElement as any;
    const newDoc = document as any;
    if (!isFullScreen) {
      if (element.requestFullscreen) element.requestFullscreen();
      else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
      else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
      else if (element.msRequestFullscreen) element.msRequestFullscreen();
    } else {
      if (newDoc.exitFullscreen) newDoc.exitFullscreen();
      else if (newDoc.mozCancelFullScreen) newDoc.mozCancelFullScreen();
      else if (newDoc.webkitExitFullscreen) newDoc.webkitExitFullscreen();
      else if (newDoc.msExitFullscreen) newDoc.msExitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <nav className={`mx-2 md:mx-4 lg:mx-5 2xl:mx-6 top-0 sticky z-[99] `}>
      <section className="bg-white rounded-md py-2 md:py-0 md:h-16  px-3 shadow-[0_0.125rem_0.25rem_rgba(165,163,174,0.3)] mt-3">
        <div className="w-full justify-between admin-container flex items-center h-full">
          <div
            className="hidden lg:flex cursor-pointer items-center p-1 md:p-2  border rounded-lg"
            onClick={() => setIsAppDrawerOpen((prev) => !prev)}
          >
            {!isAppDrawerOpen ? (
              <AiOutlineClose />
            ) : (
              <AiOutlineMenuFold className="text-lg" />
            )}
          </div>
          <div
            className=" md:block lg:hidden"
            onClick={() => setResponsiveExpand(true)}
          >
            <AiOutlineMenuFold className="text-lg" />
          </div>
          <div className="flex items-center gap-3 text-primary/80">
            <Tooltip title="Full Screen">
              <div
                onClick={() => toggleFullScreen(isFullScreen, setIsFullScreen)}
                data-tip={
                  isFullScreen ? "Toggle NormalScreen" : "Toggle FullScreen"
                }
                className="h-9 w-9 cursor-pointer text-primary flex items-center justify-center rounded-full"
              >
                {!isFullScreen ? (
                  <AiOutlineFullscreen className="text-2xl" />
                ) : (
                  <AiOutlineFullscreenExit className="text-2xl" />
                )}
              </div>
            </Tooltip>

            <Shortcuts
              setShortcutOpen={setShortcutOpen}
              isShortcutOpen={isShortcutOpen}
            />

            <NotificationDropdownMenu
              setIsContentOpen={setIsContentOpen}
              isContentOpen={isContentOpen}
            />

            <ProfileMenu
              setIsProfileContentOpen={setIsProfileContentOpen}
              isProfileContentOpen={isProfileContentOpen}
            />
          </div>
        </div>
      </section>
    </nav>
  );
};

export default AppBar;

const Shortcuts = ({ setShortcutOpen, isShortcutOpen }: Props) => {
  const loanShortcuts = [
    {
      icon: (
        <AiOutlineBarChart className="flex justify-center text-5xl items-center p-2 bg-gray-100 rounded-lg text-blue-500" />
      ),
      title: "Loan Status",
      description: "Track your loan progress",
      path: "/user",
    },
    {
      icon: (
        <HiOutlineDocumentChartBar className="flex justify-center text-5xl items-center py-1 px-2 bg-gray-100 rounded-lg text-green-500" />
      ),
      title: "Documents",
      description: "View and manage loan documents",
      path: "/user",
    },
    {
      icon: (
        <FiUsers className="flex justify-center text-5xl items-center py-1 px-2 bg-gray-100 rounded-lg text-red-500" />
      ),
      title: "Loan Offers",
      description: "Explore loan options",
      path: "/user",
    },
    {
      icon: (
        <HiOutlineLockClosed className="flex justify-center text-5xl items-center py-1 px-2 bg-gray-100 rounded-lg text-yellow-500" />
      ),
      title: "Repayment",
      description: "Manage repayment schedules",
      path: "/user",
    },

    {
      icon: (
        <BsGear className="flex justify-center text-5xl items-center py-1 px-2 bg-gray-100 rounded-lg text-orange-500" />
      ),
      title: "Settings",
      description: "Account and loan settings",
      path: "/user",
    },
    {
      icon: (
        <BsPersonVideo className="flex justify-center text-5xl items-center py-1 px-2 bg-gray-100 rounded-lg text-indigo-500" />
      ),
      title: "Support",
      description: "Get help with your loan",
      path: "/user",
    },
  ];

  return (
    <AwayListener
      onClickAway={() => setShortcutOpen(false)}
      open={isShortcutOpen}
    >
      <div className="relative  cursor-pointer">
        <Tooltip title="Shortcuts">
          <div className="cursor-pointer">
            <MdOutlineDashboardCustomize
              className="text-2xl"
              onClick={() => setShortcutOpen((prevState: any) => !prevState)}
            />
          </div>
        </Tooltip>
        {isShortcutOpen && (
          <div className="absolute top-full right-0 w-96 scale-100 origin-top-right pt-2 bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-all duration-200 ease-in-out">
            <div className="flex flex-col">
              <div className="flex justify-between items-center px-4 py-2 border-b">
                <p className=" admin-title">Recent Visits</p>
              </div>
              <div className="h-[21rem] overflow-scroll scrollNone">
                <div className="grid grid-cols-2 divide-x divide-y ">
                  {loanShortcuts.map((shortcut, index) => (
                    <Link
                      key={index}
                      href={shortcut.path}
                      className={`flex flex-col gap-1 items-center py-6 px-2 hover:bg-gray-50`}
                    >
                      {shortcut.icon}
                      <p className="text-base font-semibold">
                        {shortcut.title}
                      </p>
                      <p className="text-sm text-center">
                        {shortcut.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AwayListener>
  );
};

const ProfileMenu = ({ setIsProfileContentOpen, isProfileContentOpen }: PM) => {
  return (
    <AwayListener
      onClickAway={() => setIsProfileContentOpen(false)}
      open={isProfileContentOpen}
    >
      <div
        onClick={() => setIsProfileContentOpen((prevState: any) => !prevState)}
        className=" cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="w-fit h-fit relative">
            <Tooltip title="Profile">
              <img
                src="/profile.avif"
                className="rounded-full !w-10 !h-10 object-contain"
              />
            </Tooltip>

            {isProfileContentOpen && (
              <div className="absolute top-full right-0 w-64 scale-100 origin-top-right p-2 bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 transition-all duration-200 ease-in-out">
                <div className="flex flex-col gap-2 w-full text-gray-500">
                  <div className="flex items-center gap-4 hover:bg-gray-100 py-2 px-4 rounded-md">
                    <div className="w-fit h-fit relative">
                      <div className="absolute right-0 bottom-0 w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                      <img
                        src="/profile.avif"
                        className="rounded-full !w-10 !h-10"
                      />
                    </div>
                    <div className="flex flex-col gap-1 line-clamp-1">
                      <p className="font-semibold text-primary leading-4 ">
                        VIkash Kumhar
                      </p>
                      <p className="text-xs">vikashkumhar13@gmail.com</p>
                    </div>
                  </div>
                  <div className="border-t flex flex-col gap-2 ">
                    <div className="flex items-center gap-4  hover:bg-gray-100 py-2 px-4 rounded-md">
                      <p>
                        <BiUser className="text-xl " />
                      </p>
                      <p className=" text-base">My Profile</p>
                    </div>
                    <div className="flex items-center gap-4  hover:bg-gray-100 py-2 px-4 rounded-md">
                      <p>
                        <BsGear className="text-xl " />
                      </p>
                      <p className=" text-base">Settings</p>
                    </div>
                  </div>
                  <div className="border-t flex flex-col gap-2 ">
                    <div
                      className="flex items-center gap-4  hover:bg-gray-100 py-2 px-4 rounded-md"
                      onClick={() => router.push(`/user`)}
                    >
                      <p>
                        <AiOutlineCustomerService className="text-xl " />
                      </p>
                      <p className=" text-base">Support</p>
                    </div>
                    <div className="flex items-center gap-4  hover:bg-gray-100 py-2 px-4 rounded-md">
                      <p>
                        <HiOutlineDocument className="text-xl " />
                      </p>
                      <p className=" text-base">Documents</p>
                    </div>
                  </div>
                  <div className="border-t ">
                    <Link href="/">
                      <div
                        role="button"
                        className="flex items-center gap-4  hover:bg-gray-100 py-2 px-4 rounded-md"
                      >
                        <p>
                          <BsBoxArrowRight className="text-xl " />
                        </p>
                        <p className=" text-base">Log Out</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AwayListener>
  );
};

const NotificationDropdownMenu = ({ setIsContentOpen, isContentOpen }: NDM) => {
  const notificationDropdownMenu = [
    {
      title: "Loan Approval",
      message: "Your loan application has been approved.",
      time: "1h ago",
    },
    {
      title: "Reminder",
      message: "Your next loan payment is due soon.",
      time: "12h ago",
    },
    {
      title: "Loan Disbursement",
      message: "Your loan has been disbursed successfully.",
      time: "3h ago",
    },
    {
      title: "Application Update",
      message: "Your loan application status has been updated.",
      time: "2d ago",
    },
    {
      title: "Payment Received",
      message: "We received your recent loan payment.",
      time: "5h ago",
    },
    {
      title: "Profile Update",
      message: "Your profile details have been updated.",
      time: "1d ago",
    },
    {
      title: "New Offer",
      message: "A new loan offer has been added to your profile.",
      time: "2d ago",
    },
    {
      title: "Document Request",
      message: "We need additional documents to process your loan.",
      time: "3d ago",
    },
  ];

  return (
    <AwayListener
      onClickAway={() => setIsContentOpen(false)}
      open={isContentOpen}
    >
      <Tooltip title="Notification">
        <div onClick={() => setIsContentOpen((prevState: any) => !prevState)}>
          <IoNotificationsOutline className="text-2xl cursor-pointer" />
        </div>
      </Tooltip>
      <div className="relative text-gray-500 cursor-pointer">
        {isContentOpen && (
          <div className="absolute top-full right-0 md:w-[25rem] scale-100 origin-top-right pt-2 bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10  transition-all duration-200 ease-in-out">
            <div className="flex flex-col ">
              <div className="flex justify-between items-center px-4 py-2 border-b ">
                <p className=" font-semibold text-lg">Notification</p>
              </div>
              <div className=" h-96 overflow-scroll scrollNone">
                {notificationDropdownMenu.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-3 w-full px-4 py-2 text-sm group relative border-b hover:bg-gray-100"
                  >
                    <p className=" w-5/6 flex flex-col gap-2 items-start text-left ">
                      <span className="text-blue-500 font-semibold">
                        {item.title}
                      </span>
                      <span>{item.message}</span>
                      <span>{item.time}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div
                className=" border-t p-2"
                onClick={() => router.push(`/notifications`)}
              >
                <button className=" hover:bg-blue-50 text-base text-primary px-4 py-2 w-full hover:rounded-md">
                  View All Notifications
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AwayListener>
  );
};
