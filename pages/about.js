import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import baseUrl from "../baseUrl";
import UserContext from "../context/UserContext";
import crud from "../utils/firebaseCRUD";

export default class extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div>
                <h1 className="title title--lg">About Rhotimmi</h1>
            </div>
        );
    }
}
