import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import FileUpload from "./forms/FileUpload";
import Input from "./forms/Input";
import TextArea from "./forms/TextArea";
import SelectInput from "./forms/SelectInput";

const MainInfo = ({ onMainInfoChange, slug, snippet }) => {
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        setInfo({ newSlug: slug, ...snippet });
        return () => {};
    }, [slug, snippet]);

    const handleSubmit = () => {
        const res = {};
        res["slug"] = info.newSlug;
        res["snippet"] = info;
        delete res.snippet.newSlug;
        onMainInfoChange(res);
        // save this data to the database and progress to the next page
    };

    const handleTitleChange = value => {
        const newSlug = value.toLowerCase().replace(/\s+/g, "-") + slug;
        setInfo({ ...info, title: value, newSlug });
    };

    return (
        <Fragment>
            {error && (
                <div>
                    <h4 style={{ color: "red" }}>Please fill out all fields</h4>
                </div>
            )}
            <h1>Main Information</h1>
            <p>This is the programs primary information</p>
            <hr />
            {info && info.newSlug && (
                <div>
                    <div>
                        <div>
                            <label htmlFor="programBanner">Banner</label>
                        </div>
                        <FileUpload
                            inputId="programBanner"
                            onUploadUrl={url =>
                                setInfo({ ...info, banner: url })
                            }
                            showUploadControls={true}
                        />
                    </div>
                    <div>
                        <div>
                            <label htmlFor="programTitle">Title</label>
                        </div>
                        <div>
                            <Input
                                inputId="programTitle"
                                initialValue={info.title}
                                onInputChange={handleTitleChange}
                                minLength={3}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="programCategory">Category</label>
                        </div>
                        <div>
                            <SelectInput
                                selectInputId="programCategory"
                                initialValue={info.category || "weight loss"}
                                selectValues={[
                                    "weight loss",
                                    "bulking",
                                    "toning",
                                ]}
                                onInputChange={value =>
                                    setInfo({ ...info, category: value })
                                }
                                minLength={3}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="programDifficulty">
                                Difficulty
                            </label>
                        </div>
                        <div>
                            <SelectInput
                                selectInputId="programDifficulty"
                                initialValue={info.difficulty || "beginner"}
                                selectValues={[
                                    "beginner",
                                    "intermediate",
                                    "advanced",
                                ]}
                                onInputChange={value =>
                                    setInfo({ ...info, difficulty: value })
                                }
                                minLength={3}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="programDescription">
                                Description
                            </label>
                        </div>
                        <div>
                            <TextArea
                                textAreaId="programDescription"
                                initialValue={info.description}
                                onInputChange={value =>
                                    setInfo({ ...info, description: value })
                                }
                                minLength={3}
                                maxLength={140}
                            />
                        </div>
                    </div>
                    <button onClick={handleSubmit}>save and continue</button>
                    <div>
                        <h3>Json Object</h3>
                        <pre>{JSON.stringify(info, undefined, 2)}</pre>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

MainInfo.propTypes = {
    onMainInfoChange: PropTypes.func,
    slug: PropTypes.string,
    snippet: PropTypes.object,
};

export default MainInfo;
