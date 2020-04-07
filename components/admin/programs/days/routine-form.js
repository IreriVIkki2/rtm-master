import { Fragment, useState, useEffect } from "react";
import SelectInput from "../../../forms/SelectInput";
import Input from "../../../forms/Input";
import TextArea from "../../../forms/TextArea";

export default ({ routine, deleteRoutine, onRoutinePublish }) => {
    const [r, setR] = useState(null);
    useEffect(() => {
        setR(routine);
    }, [routine]);

    if (!r) return null;
    return (
        <Fragment>
            <p className="title title--md text-secondary mt-7">
                {r.name || `Routine ${r.order}`}
            </p>
            <div className="form__container mt-3">
                <div className="form-group__two-part">
                    <div className="form-group__two-part--label-container">
                        <label htmlFor="name">
                            <span className="mb-sm d-block text-black">
                                Routine Name *
                            </span>
                            <small className="font-smaller">
                                Ideally less that 4 word title for the routine
                            </small>
                        </label>
                    </div>
                    <div className="form-group__two-part--input-container">
                        <Input
                            inputId="name"
                            initialValue={r.name}
                            onInputChange={(name) => setR({ ...r, name })}
                            type="string"
                            placeholder="eg. Sit Ups, Push Ups ..."
                        />
                    </div>
                </div>

                <div className="form-group__two-part">
                    <div className="form-group__two-part--label-container">
                        <label htmlFor="youtubeUrl">
                            <span className="mb-sm d-block text-black">
                                Youtube Video Url *
                            </span>
                            <small className="font-smaller">
                                Youtube link to the video showing how to do the
                                current routine
                            </small>
                        </label>
                    </div>
                    <div className="form-group__two-part--input-container">
                        <Input
                            inputId="youtubeUrl"
                            initialValue={r.youtubeUrl}
                            onInputChange={(youtubeUrl) =>
                                setR({ ...r, youtubeUrl })
                            }
                            type="string"
                        />
                    </div>
                </div>

                <div className="form-group__two-part">
                    <div className="form-group__two-part--label-container">
                        <label htmlFor="description">
                            <span className="mb-sm d-block text-black">
                                Routine Description *
                            </span>
                            <small className="font-smaller">
                                Brief but detailed description on how exactly to
                                do the routine in question. This is important
                                for users with poor internet connectivity and
                                cannot watch the attached video
                            </small>
                        </label>
                    </div>
                    <div className="form-group__two-part--input-container">
                        <TextArea
                            textAreaId="description"
                            initialValue={r.description}
                            onInputChange={(description) =>
                                setR({ ...r, description })
                            }
                        />
                    </div>
                </div>

                <div className="form-group__two-part">
                    <div className="form-group__two-part--label-container">
                        <label htmlFor="lengthInSecs">
                            <span className="mb-sm d-block text-black">
                                Length of routine in seconds *
                            </span>
                            <small className="font-smaller">
                                Specify the number of seconds one should do this
                                exercise for
                            </small>
                        </label>
                    </div>
                    <div className="form-group__two-part--input-container">
                        <small className="d-block text-secondary mb-sm">
                            Set 0 if routine is measured in repeats
                        </small>
                        <Input
                            inputId="lengthInSecs"
                            initialValue={r.lengthInSecs}
                            onInputChange={(lengthInSecs) =>
                                setR({ ...r, lengthInSecs })
                            }
                            type="number"
                        />
                    </div>
                </div>

                <div className="form-group__two-part">
                    <div className="form-group__two-part--label-container">
                        <label htmlFor="repeatCount">
                            <span className="mb-sm d-block text-black">
                                Repeat count *
                            </span>
                            <small className="font-smaller">
                                Specify the number of times a user should repeat
                                the routine.
                                <span className="d-block">eg X 10 sit ups</span>
                            </small>
                        </label>
                    </div>

                    <div className="form-group__two-part--input-container">
                        {r.lengthInSecs > 0 && (
                            <small className="d-block text-secondary mb-sm">
                                Set length in seconds as 0 to edit this field
                            </small>
                        )}
                        <SelectInput
                            selectInputId="repeatCount"
                            initialValue={
                                {
                                    value: r.repeatCount,
                                    label: r.repeatCount,
                                } || {
                                    value: `X 0`,
                                    label: `X 0`,
                                }
                            }
                            onInputChange={(repeatCount) =>
                                setR({ ...r, repeatCount })
                            }
                            selectValues={range(0, 100).map((num) => {
                                return {
                                    value: `X ${num}`,
                                    label: `X ${num}`,
                                };
                            })}
                            disabled={r.lengthInSecs > 0}
                        />
                    </div>
                </div>

                <div className="form-group__two-part">
                    <div className="form-group__two-part--input-container">
                        <button
                            className="btn btn--secondary mr-2"
                            onClick={() => onRoutinePublish(r)}
                        >
                            save and publish
                        </button>

                        <button
                            className="btn btn--tertiary ml-1"
                            onClick={deleteRoutine}
                        >
                            delete
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

const range = (start, end, length = end - start + 1) =>
    Array.from({ length }, (_, i) => start + i);
