import React, { Component } from "react";
import AdminLayout from "./AdminLayout";
import baseUrl from "../../baseUrl";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mounted: false,
        };
    }

    render() {
        console.log(this.props);
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
                        <h1>This will show stats about the programs</h1>
                    </div>
                )}
            </AdminLayout>
        );
    }
}

// This function gets called at build time
export async function getStaticProps() {
    const res = await fetch(`${baseUrl}/api/programs`);
    const json = await res.json();
    return { props: { allPrograms: json.programs } };
}
