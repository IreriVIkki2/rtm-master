import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import FileUpload from "../../../../components/forms/FileUpload";
import Input from "../../../../components/forms/Input";
import TextArea from "../../../../components/forms/TextArea";
import SelectInput from "../../../../components/forms/SelectInput";

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
            <p className="title title--md text-black mb-1">
                Basic Program Information
            </p>
            <p className="mb-3">
                This is the main information about this program including the
                banner, title, message for the call to action button, a 140
                character description for SEO and mobile preview
            </p>
            {info && info.newSlug && (
                <div className="form__container">
                    <div className="form-group__two-part">
                        <div className="form-group__two-part--label-container">
                            <label htmlFor="programBanner">
                                <span className="mb-sm d-block text-black">
                                    Banner *
                                </span>
                                <small className="font-smaller">
                                    Upload a large image that will show at the
                                    top of every program sales page
                                </small>
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <FileUpload
                                inputId="programBanner"
                                onUploadUrl={url =>
                                    setInfo({ ...info, banner: url })
                                }
                                showUploadControls={true}
                                initialFileUrl={info.banner}
                            />
                        </div>
                    </div>

                    <div className="form-group__two-part">
                        <div className="form-group__two-part--label-container">
                            <label htmlFor="programTitle">
                                <span className="mb-sm d-block text-black">
                                    Title *
                                </span>
                                <small className="font-smaller">
                                    Keep the title as short as possible
                                </small>
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <Input
                                inputId="programTitle"
                                initialValue={info.title}
                                onInputChange={handleTitleChange}
                                minLength={3}
                            />
                        </div>
                    </div>

                    <div className="form-group__two-part">
                        <div className="form-group__two-part--label-container">
                            <label
                                htmlFor="programCategory"
                                className="d-block text-black"
                            >
                                Category *
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <SelectInput
                                selectInputId="programCategory"
                                initialValue={{
                                    value: "weight loss",
                                    label: "Weight Loss",
                                }}
                                selectValues={[
                                    { value: "bulking", label: "Bulking" },
                                    { value: "toning", label: "Toning" },
                                ]}
                                onInputChange={value =>
                                    setInfo({ ...info, category: value })
                                }
                                minLength={3}
                            />
                        </div>
                    </div>
                    <div className="form-group__two-part">
                        <div className="form-group__two-part--label-container">
                            <label
                                className="d-block text-black"
                                htmlFor="programDifficulty"
                            >
                                Difficulty *
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <SelectInput
                                selectInputId="programDifficulty"
                                initialValue={{
                                    value: "beginner",
                                    label: "Beginner",
                                }}
                                selectValues={[
                                    {
                                        value: "intermediate",
                                        label: "Intermediate",
                                    },
                                    { value: "advanced", label: "Advanced" },
                                ]}
                                onInputChange={value =>
                                    setInfo({ ...info, difficulty: value })
                                }
                                minLength={3}
                            />
                        </div>
                    </div>
                    <div className="form-group__two-part">
                        <div className="form-group__two-part--label-container">
                            <label
                                className="d-block text-black"
                                htmlFor="programDescription"
                            >
                                Description *
                            </label>
                            <small className="font-smaller">
                                This is a small description of 50 words or less.
                                It will be used in areas where showing the
                                entire sales article of the program is not
                                viable and for seo
                            </small>
                        </div>
                        <div className="form-group__two-part--input-container">
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
                    <div className="form-group__two-part">
                        <div className="form-group__two-part--input-container">
                            <button
                                className="btn btn--tertiary"
                                onClick={handleSubmit}
                            >
                                save and continue
                            </button>
                        </div>
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
