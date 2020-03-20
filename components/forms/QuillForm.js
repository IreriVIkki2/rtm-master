import React, { Component } from "react";
import { firebaseClient } from "../../utils/firebaseClient";
import PropTypes from "prop-types";

export default class extends Component {
    static propTypes = {
        initialValue: PropTypes.object.isRequired,
        onInputChange: PropTypes.func.isRequired,
    };
    constructor(props) {
        super(props);
        this.state = {
            newValue: this.props.initialValue,
            mounted: false,
        };
        this.quill;
        this.resize;
    }

    handleChange = value => {
        this.setState({ newValue: value });
        this.props.onInputChange(value);
    };

    handleImageUpload = file => {
        // return a promise that resolves an image url

        return new Promise((resolve, reject) => {
            const metadata = {
                contentType: "image/jpeg",
                name: `${Date.now()}-${file.name}`,
            };

            var task = firebaseClient()
                .storage.ref()
                .child(metadata.name)
                .put(file, metadata);

            task.on(
                "state_changed",
                snapshot => {
                    var progress = Math.ceil(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                    );
                    console.log("Upload is " + progress + "% done");
                    // pass
                },
                error => {
                    switch (error.code) {
                        case "storage/unauthorized":
                            alert(
                                "User doesn't have permission to access the object",
                            );
                            break;

                        case "storage/canceled":
                            alert("User canceled the upload");
                            break;

                        case "storage/unknown":
                            alert(
                                "Unknown error occurred, inspect error.serverResponse",
                            );
                            break;
                    }
                },
                // on completion resolve the url
                () => {
                    uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then(downloadURL => resolve(downloadURL));
                },
            );
        });
    };

    async componentDidMount() {
        const reactQuill = import("react-quill");
        const imageResize = import("quill-image-resize-module-react");
        const imageUpload = import("quill-image-uploader");
        await imageResize
            .then(res => {
                this.imageResize = res.default;
            })
            .catch(err => console.error(err));
        await imageUpload
            .then(res => {
                this.imageUploader = res.default;
            })
            .catch(err => console.error(err));
        reactQuill
            .then(res => {
                res.Quill.register("modules/imageResize", this.imageResize);
                res.Quill.register("modules/imageUploader", this.imageUploader);
                const ReactQuill = res.default;
                this.quill = (
                    <ReactQuill
                        value={this.state.newValue}
                        onChange={this.handleChange}
                        onBlur={() =>
                            // updateValue(page, id, this.state.newValue)
                            console.log(this.state.newValue)
                        }
                        modules={{
                            toolbar: [
                                [{ header: [1, 2, 3, false] }],
                                ["bold", "italic"],
                                ["link", "blockquote", "image", "video"],
                                [
                                    { list: "ordered" },
                                    { list: "bullet" },
                                    { indent: "-1" },
                                    { indent: "+1" },
                                ],
                                [
                                    {
                                        color: ["#2B56FE"],
                                    },
                                    {
                                        background: ["#FAD08E"],
                                    },
                                ],
                                [
                                    { align: "" },
                                    { align: "center" },
                                    { align: "right" },
                                    { align: "justify" },
                                ],
                            ],
                            imageResize: {
                                parchment: res.Quill.import("parchment"),
                            },

                            imageUploader: {
                                upload: file => this.handleImageUpload(file),
                            },
                        }}
                        placeholder="body..."
                    />
                );
                this.setState({ mounted: true });
            })
            .catch(err => console.error(err));
    }

    render() {
        return <div className="form__quill form__reset">{this.quill}</div>;
    }
}
