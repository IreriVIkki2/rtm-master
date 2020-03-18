import React from "react";
import SideNav from "./sideNav";

const AdminLayout = ({ children, hidden }) => {
    return (
        <div className="al">
            {!hidden && <SideNav />}
            <main className="al-main">{children}</main>
        </div>
    );
};

export default AdminLayout;
