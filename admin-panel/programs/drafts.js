import React, { Component } from "react";
import AdminLayout from "../AdminLayout";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mounted: false,
        };
    }

    render() {
        const { mounted } = this.state;
        return (
            <AdminLayout>
                {!mounted ? (
                    <div>
                        <h1 className="title title--sm text-tertiary">
                            Loading....
                        </h1>
                    </div>
                ) : (
                    <div className="">
                        <h1>Edit all draft programs here</h1>
                    </div>
                )}
            </AdminLayout>
        );
    }
}
