import React, { Component } from "react";
import AdminLayout from "./AdminLayout";
import crud from "../../utils/firebaseCRUD";

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
    let programs = null;
    await crud
        .getALlPrograms()
        .then(docs => {
            programs = docs;
        })
        .catch(err => {
            console.error(err);
            return { props: {} };
        });
    return { props: { programs } };
}
