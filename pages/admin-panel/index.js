import React, { Component } from "react";
import AdminLayout from "./AdminLayout";
import baseUrl from "../../baseUrl";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        console.log(this.props);
        const { programs } = this.props;
        return (
            <AdminLayout>
                <div className="">
                    {programs.map(p => {
                        return (
                            <div className="">
                                <p className="title title--md">
                                    {p.snippet.title}
                                </p>
                                <pre>
                                    {JSON.stringify(p.statistics, undefined, 2)}
                                </pre>
                            </div>
                        );
                    })}
                </div>
            </AdminLayout>
        );
    }
}

// This function gets called at build time
export async function getStaticProps() {
    const res = await fetch(`${baseUrl}/api/programs`);
    const json = await res.json();
    return { props: { programs: json.programs } };
}
