import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
