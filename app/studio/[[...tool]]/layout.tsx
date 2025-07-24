import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Fear-Not Admin Panel",
    description: "CMS for Administrator"
}

const RootLayout = ({children}:{children:React.ReactNode}) => {
  return <>{children}</>
};

export default RootLayout;
