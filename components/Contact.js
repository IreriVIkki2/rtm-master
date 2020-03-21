import React, { useState } from "react";
import Input from "./forms/Input";
import TextArea from "./forms/TextArea";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const submitForm = () => {
        console.log({ name, email, subject, message });
    };
    return (
        <div className="contact mt-7 mb-7">
            <div className="max-70">
                <p className="title title--sm text-black mt-3 mb-3 ">
                    Have any questions
                </p>
                <p className="title title--lg mb-3 text-black">get in touch</p>
            </div>

            <div className="mb-3 contact__name-email max-70">
                <div className="w-100 mr-3">
                    <label
                        className="mb-1 d-inline-block text-black"
                        htmlFor="contactName"
                    >
                        Name
                    </label>
                    <Input
                        inputId="contactName"
                        initialValue={name}
                        onInputChange={name => setName(name)}
                        minLength={3}
                        type="text"
                    />
                </div>

                <div className="w-100">
                    <label
                        className="mb-1 d-inline-block text-black"
                        htmlFor="contactEmail"
                    >
                        Email
                    </label>
                    <Input
                        inputId="contactEmail"
                        initialValue={email}
                        onInputChange={email => setEmail(email)}
                        minLength={3}
                        type="email"
                    />
                </div>
            </div>
            <div className="mb-3 contact__subject max-70">
                <label
                    className="mb-1 d-inline-block text-black"
                    htmlFor="contactSubject"
                >
                    Subject
                </label>
                <Input
                    inputId="contactSubject"
                    initialValue={subject}
                    onInputChange={subject => setSubject(subject)}
                    minLength={3}
                />
            </div>

            <div className="mb-3 contact__message max-70">
                <label
                    className="mb-1 d-inline-block text-black"
                    htmlFor="contactMessage"
                >
                    Message
                </label>
                <TextArea
                    textAreaId="contactMessage"
                    initialValue={message}
                    onInputChange={message => setMessage(message)}
                />
            </div>

            <div className="max-70" onClick={submitForm}>
                <button className="btn btn--secondary">Send Message</button>
            </div>
        </div>
    );
};

export default Contact;
