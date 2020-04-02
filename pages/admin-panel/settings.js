import React, { Component } from "react";
import { firebaseClient } from "../../utils/firebaseClient";
import DashLayout from "../../containers/admin/layout";
import Input from "../../components/forms/Input";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: "",
            secret: "",
        };
    }

    componentDidMount() {
        this.addKeysListener();
    }

    addKeysListener = () => {
        let removeKeysListener = firebaseClient()
            .db.collection("paypal")
            .doc("keys")
            .onSnapshot(snapshot => {
                this.setState({ ...this.state, ...snapshot.data() });
            });

        this.setState({ removeKeysListener });
    };

    handleSaveCredentials = () => {
        const { client, secret } = this.state;
        firebaseClient()
            .db.collection("paypal")
            .doc("keys")
            .set({ client, secret });
    };

    componentWillUnmount() {
        if (this.state.removeKeysListener) {
            this.state.removeKeysListener();
        }
    }

    render() {
        const { client, secret } = this.state;
        const paypalForm = (
            <div className="form__container">
                <div className="form-group__two-part">
                    <div className="form-group__two-part--label-container">
                        <label htmlFor="clientId">
                            <span className="mb-sm d-block text-black">
                                Client Id *
                            </span>
                        </label>
                    </div>
                    <div className="form-group__two-part--input-container">
                        <Input
                            inputId="clientId"
                            initialValue={client}
                            onInputChange={client => this.setState({ client })}
                            minLength={10}
                        />
                    </div>
                </div>

                <div className="form-group__two-part">
                    <div className="form-group__two-part--label-container">
                        <label htmlFor="secretId">
                            <span className="mb-sm d-block text-black">
                                Secret Id *
                            </span>
                            <small className="font-smaller">
                                keep this key secret and never share it with
                                anyone.
                                <span className="text-secondary">
                                    Pin yako siri Yako.
                                </span>
                            </small>
                        </label>
                    </div>
                    <div className="form-group__two-part--input-container">
                        <Input
                            inputId="secretId"
                            initialValue={secret}
                            onInputChange={secret => this.setState({ secret })}
                            minLength={10}
                        />
                    </div>
                </div>

                <div className="form-group__two-part">
                    <div className="form-group__two-part--input-container">
                        <button
                            className="btn btn--tertiary"
                            onClick={this.handleSaveCredentials}
                        >
                            save paypal credentials
                        </button>
                    </div>
                </div>
            </div>
        );
        return (
            <DashLayout>
                <div className="dash-settings">
                    <p className="title title--md text-black mb-1">
                        Set up Paypal credentials
                    </p>
                    <p className="mb-3">
                        Login to your Paypal account and get your client Id and
                        Secret Id to start receiving payments
                    </p>
                    {paypalForm}

                    <ul>
                        <li>Set the site in development mode</li>
                        <li>settings for paypal payments</li>
                        <li>Disable the site all together</li>
                        <li>Redirect the site to another domain</li>
                    </ul>
                </div>
            </DashLayout>
        );
    }
}
