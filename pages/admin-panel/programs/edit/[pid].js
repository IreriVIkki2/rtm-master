import React, { Component } from "react";
import AdminLayout from "../../AdminLayout";
import MainInfo from "./forms/MainInfo";

export default class extends Component {
    render() {
        return (
            <AdminLayout>
                <div>
                    <p>
                        Primary Information. This is the main information about
                        this program including the banner, title, message for
                        the call to action button, a 140 character description
                        for SEO and mobile preview
                    </p>
                    <hr />
                    <p>
                        a progress dot line to show creation of an new program
                    </p>
                    <hr />

                    <MainInfo></MainInfo>
                </div>
            </AdminLayout>
        );
    }
}
