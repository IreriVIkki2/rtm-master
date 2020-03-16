import React from "react";
import SideNav from "./sideNav";

const AdminLayout = ({ children, hidden }) => {
    return (
        <div className="al">
            <SideNav></SideNav>
            <main className="al-main">{children}</main>
        </div>
    );
};

export default AdminLayout;
