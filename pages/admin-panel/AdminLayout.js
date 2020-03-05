import React from "react";
import SideNav from "./sideNav";

const AdminLayout = ({ children }) => {
    return (
        <div style={{ display: "flex" }}>
            <SideNav></SideNav>

            <main>{children}</main>
        </div>
    );
};

export default AdminLayout;
