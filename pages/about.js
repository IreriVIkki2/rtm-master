import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import baseUrl from "../baseUrl";

export class About extends Component {
    static async getInitialProps(ctx) {
        const res = await fetch(`${baseUrl}/api/programs`);
        const json = await res.json();
        return { programs: json.programs };
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // sessionStorage.setItem("programs", JSON.stringify(this.props.programs));
    }

    render() {
        return (
            <div>
                <h1>About Page</h1>
                <pre>{JSON.stringify(this.props.programs, undefined, 2)}</pre>
            </div>
        );
    }
}

export default About;
