import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import crud from "../../../../../utils/firebaseCRUD";
import FileUpload from "./FileUpload";
import Input from "./Input";
import TextArea from "./TextArea";

const MainInfo = ({ handleContinue }) => {
    const [info, setInfo] = useState({
        banner: "",
        title: "",
        callToAction: "",
        description: "",
    });

    const [error, setError] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        const emptyFieldFound = Object.values(info).some(
            i => i.replace(/\s+/g, "").length === 0,
        );

        if (emptyFieldFound) {
            return setError(true);
        }
    };

    const { title, callToAction, description } = info;
    return (
        <Fragment>
            {error && (
                <div>
                    <h4 style={{ color: "red" }}>Please fill out all fields</h4>
                </div>
            )}
            <div>
                <div>
                    <div>
                        <label htmlFor="programBanner">Banner</label>
                    </div>
                    <FileUpload
                        inputId="programBanner"
                        onUploadUrl={url => setInfo({ ...info, banner: url })}
                        showUploadControls={true}
                    />
                </div>
                <br />
                <br />
                <div>
                    <div>
                        <label htmlFor="programTitle">Title</label>
                    </div>
                    <div>
                        <Input
                            inputId="programTitle"
                            initialValue={title}
                            onInputChange={value =>
                                setInfo({ ...info, title: value })
                            }
                            minLength={3}
                        />
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <div>
                        <label htmlFor="programCallToAction">
                            Call to action
                        </label>
                    </div>
                    <div>
                        <Input
                            inputId="programTitle"
                            initialValue={callToAction}
                            onInputChange={value =>
                                setInfo({ ...info, callToAction: value })
                            }
                            minLength={3}
                        />
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <div>
                        <label htmlFor="programDescription">Description</label>
                    </div>
                    <div>
                        <TextArea
                            textAreaId="programDescription"
                            initialValue={description}
                            onInputChange={value =>
                                setInfo({ ...info, description: value })
                            }
                            minLength={3}
                            maxLength={140}
                        />
                    </div>
                </div>
                <button onClick={handleSubmit}>save and continue</button>
            </div>

            <div>
                <h3>Json Object</h3>
                <pre>{JSON.stringify(info, undefined, 2)}</pre>
            </div>
        </Fragment>
    );
};

MainInfo.propTypes = {};

export default MainInfo;
