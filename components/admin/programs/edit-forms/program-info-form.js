import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import FileUpload from "../../../forms/FileUpload";
import Input from "../../../forms/Input";
import TextArea from "../../../forms/TextArea";
import SelectInput from "../../../forms/SelectInput";
import CheckBoxForm from "../../../forms/CheckBoxForm";

const ProgramInfoForm = ({ onMainInfoChange, program, onTitle }) => {
    console.log("ProgramInfoForm -> program", program);
    const [info, setInfo] = useState(program);

    const handleTitleChange = title => {
        const slug =
            title.toLowerCase().replace(/\s+/g, "-") + "_id" + info._id;
        setInfo({ ...info, title, slug });
        onTitle(title);
    };

    return (
        <Fragment>
            <p className="title title--md text-black mb-1">
                Basic Program Information
            </p>
            <p className="mb-3">
                This is the main information about this program including the
                banner, title, message for the call to action button, a 140
                character description for SEO and mobile preview
            </p>
            <div className="form__container">
                <div className="form-group__two-part">
                    <div className="form-group__two-part--label-container">
                        <label htmlFor="programBanner">
                            <span className="mb-sm d-block text-black">
                                Banner *
                            </span>
                            <small className="font-smaller">
                                Upload a large image that will show at the top
                                of every program sales page
                            </small>
                        </label>
                    </div>
                    <div className="form-group__two-part--input-container">
                        <FileUpload
                            inputId="programBanner"
                            onUploadUrl={banner => setInfo({ ...info, banner })}
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
                            htmlFor="isFree"
                            className="mb-sm d-block text-black"
                        >
                            Is Program free
                        </label>
                    </div>
                    <div className="form-group__two-part--input-container d-flex">
                        <CheckBoxForm
                            checkBoxId="isFreeProgram"
                            defaultChecked={info.isFree}
                            onInputChange={isFree =>
                                setInfo({ ...info, isFree })
                            }
                        />
                        <label className="ml-1" htmlFor="isFreeProgram">
                            <small className="font-smaller">
                                Check this to set this program as a free product
                            </small>
                        </label>
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
                            onInputChange={category =>
                                setInfo({ ...info, category })
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
                            onInputChange={difficulty =>
                                setInfo({ ...info, difficulty })
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
                            This is a small description of 50 words or less. It
                            will be used in areas where showing the entire sales
                            article of the program is not viable and for seo
                        </small>
                    </div>
                    <div className="form-group__two-part--input-container">
                        <TextArea
                            textAreaId="programDescription"
                            initialValue={info.description}
                            onInputChange={description =>
                                setInfo({ ...info, description })
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
                            onClick={() => onMainInfoChange(info)}
                        >
                            save and continue
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

ProgramInfoForm.propTypes = {
    onMainInfoChange: PropTypes.func,
    program: PropTypes.object.isRequired,
};

export default ProgramInfoForm;
