import React, { Component } from "react";
import SideNav from "./sideNav";

export default class extends Component {
    render() {
        return (
            <AdminLayout>
                <div>
                    <h1>This will include settings such as:</h1>
                    <ul>
                        <li>Set the site in development mode</li>
                        <li>Disable the site all together</li>
                        <li>Redirect the site to another domain</li>
                    </ul>
                </div>
            </AdminLayout>
        );
    }
}
