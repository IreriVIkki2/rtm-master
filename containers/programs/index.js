import React, { Component } from "react";
import { firebaseClient } from "../../utils/firebaseClient";
import Programs from "../../components/programs";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        firebaseClient()
            .db.collection("program")
            .where("published", "==", true)
            .get()
            .then(docs => {
                let programs = [];
                docs.forEach(doc => programs.push(doc.data()));
                this.setState({ programs });
            });
    }

    render() {
        const { programs } = this.state;
        if (programs === undefined)
            return <p className="title title--sm">Loading programs...</p>;
        return <Programs programs={programs} />;
    }
}
