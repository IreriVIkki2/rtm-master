import React, { Component, Fragment } from "react";
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
        const updatedValue = value.replace(
            /<a hre/g,
            `<a class="btn btn__link btn__link--secondary" hre`,
        );
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
                    task.snapshot.ref
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
                                        color: [
                                            "#2B56FE",
                                            "#2c2d34",
                                            "#f2910a",
                                            "#e94822",
                                            "#efd510",
                                            "#ffffff",
                                            "#000000",
                                        ],
                                    },
                                    {
                                        background: [
                                            "#2B56FE",
                                            "#2c2d34",
                                            "#f2910a",
                                            "#e94822",
                                            "#efd510",
                                            "#ffffff",
                                            "#000000",
                                        ],
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
        return (
            <Fragment>
                <div className="form__quill form__reset">{this.quill}</div>
                <p className="mt-3 mb-7 pl-7 title title--sm">
                    Preview of final article
                </p>
                <div
                    dangerouslySetInnerHTML={{ __html: this.state.newValue }}
                    className="mt-3"
                ></div>
            </Fragment>
        );
    }
}
