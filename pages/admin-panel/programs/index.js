import React, { Component } from "react";
import AdminLayout from "../AdminLayout";

export default class extends Component {
    render() {
        return (
            <AdminLayout>
                <h1>
                    This will display a list of all programs and probable a few
                    stats about how its going
                </h1>
            </AdminLayout>
        );
    }
}