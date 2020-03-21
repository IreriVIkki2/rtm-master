import React, { Component } from "react";
import UserContext from "../context/UserContext";

export default class extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div className="about mt-7">
                <h1 className="title title--lg">About Rhotimmi</h1>
            </div>
        );
    }
}
