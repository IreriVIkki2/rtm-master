import React, { Component } from "react";
import AppContext from "../../context/AppContext";
import { firebaseClient } from "../../utils/firebaseClient";

export class UserName extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <div>This is you</div>;
    }
}

export default UserName;
