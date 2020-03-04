import React, { Component } from "react";
import UserContext from "../context/UserContext";

export default class Index extends Component {
    static contextType = UserContext;
    // static async getInitialProps({ req, query }) {

    //     return { user };
    // }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>This is the home page</h1>
            </div>
        );
    }
}
