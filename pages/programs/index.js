import React, { Component } from "react";
import fetch from "isomorphic-unfetch";

export class Programs extends Component {
    static async getInitialProps({ req }) {
        const { referer } = req.headers;
        const baseUrl = referer
            .split("/")
            .slice(0, 3)
            .join("/");
        const res = await fetch(`${baseUrl}/api/programs`);
        const json = await res.json();
        return { programs: json.programs };
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        sessionStorage.setItem("programs", JSON.stringify(this.props.programs));
    }

    render() {
        return (
            <div>
                <pre>{JSON.stringify(this.props.programs, undefined, 2)}</pre>
            </div>
        );
    }
}

export default Programs;
