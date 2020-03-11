import React from "react";
import SideNav from "./sideNav";

const AdminLayout = ({ children, hidden }) => {
    return (
        <div style={{ display: "flex" }}>
            <div
                style={{
                    width: hidden ? "20px" : "200px",
                    marginRight: "20px",
                    overflow: "hidden",
                }}
            >
                <SideNav></SideNav>
            </div>

            <main>{children}</main>
        </div>
    );
};

export default AdminLayout;
