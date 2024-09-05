import Head from "next/head";
import { useState } from "react";
import AppBar from "./AppBar";
import AppDrawer from "./AppDrawer";
// import AppBar from "./AppBar";
// import AppDrawer from "./AppDrawer";

// import { withProtectedRoute } from "@/hooks";

type Props = {
  title?: string;
  children?: JSX.Element[] | JSX.Element;
  description?: string;
  ogImage?: string;
};
const AppLayout = ({
  title = "Welcome To The Dashboard",
  children = <></>,
  description,
  ogImage,
}: Props) => {
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState<boolean>(true);
  const [responsiveExpand, setResponsiveExpand] = useState<boolean>(false);

  return (
    <>
      <Head>
        <meta property="og:url" content="Welcome to the panel" />
        <meta property="og:type" content="website" />
        <title>{title || "Welcome to your pannel"}</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={ogImage} />
      </Head>

      <main className="relative w-full flex ">
        <div
          className={` hidden lg:block sticky top-0 overflow-y-scroll text-center h-screen duration-700 ease-in-out transition-all scrollNone ${
            isAppDrawerOpen ? "w-64" : "w-28 "
          }`}
        >
          <AppDrawer isAppDrawerOpen={isAppDrawerOpen} />
        </div>

        <section
          className={`h-screen  bg-slate-50 overflow-y-scroll  duration-500 ease-in-out transition-all scrollNone ${
            isAppDrawerOpen
              ? "w-full lg:w-[calc(100%-16rem)]"
              : "w-full lg:w-[calc(100%-3rem)]"
          } `}
        >
          <AppBar
            setResponsiveExpand={setResponsiveExpand}
            setIsAppDrawerOpen={setIsAppDrawerOpen}
            isAppDrawerOpen={isAppDrawerOpen}
          />
          <div className={`pt-5 pb-20 md:py-8 lg:py-10`}>{children}</div>
        </section>
      </main>
    </>
  );
};

export default AppLayout;
