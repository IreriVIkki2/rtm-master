import React, { Component, Fragment } from "react";
import SelectInput from "../forms/SelectInput";
import Input from "../forms/Input";
import TextArea from "../forms/TextArea";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routine: { ...this.props.routine },
        };
    }

    handleLengthInSecsChange = lengthInSecs => {
        this.setState({ routine: { ...this.state.routine, lengthInSecs } });
    };

    handleNameChange = name => {
        this.setState({ routine: { ...this.state.routine, name } });
    };

    handlePlanChange = plan => {
        this.setState({ routine: { ...this.state.routine, plan } });
    };

    handleDescriptionChange = description => {
        this.setState({ routine: { ...this.state.routine, description } });
    };

    handleRepeatCountChange = repeatCount => {
        this.setState({ routine: { ...this.state.routine, repeatCount } });
    };

    handleYoutubeUrlChange = youtubeUrl => {
        this.setState({ routine: { ...this.state.routine, youtubeUrl } });
    };

    handleSaveAndPublishRoutine = () => {
        const routine = {
            ...this.state.routine,
            published: true,
            publishedAt: Date.now(),
        };
        this.props.onRoutinePublish(routine);
    };

    render() {
        const {
            lengthInSecs,
            order,
            name,
            description,
            youtubeUrl,
            repeatCount,
        } = this.state.routine;

        return (
            <Fragment>
                <p className="title title--md text-secondary mt-7">
                    {name || `Routine ${order}`}
                </p>
                <div className="form__container mt-3">
                    <div className="form-group__two-part">
                        <div className="form-group__two-part--label-container">
                            <label htmlFor="name">
                                <span className="mb-sm d-block text-black">
                                    Routine Name *
                                </span>
                                <small className="font-smaller">
                                    Ideally less that 4 word title for the
                                    routine
                                </small>
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <Input
                                inputId="name"
                                initialValue={name}
                                onInputChange={this.handleNameChange}
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
                                    Youtube link to the video showing how to do
                                    the current routine
                                </small>
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <Input
                                inputId="youtubeUrl"
                                initialValue={youtubeUrl}
                                onInputChange={this.handleYoutubeUrlChange}
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
                                    Brief but detailed description on how
                                    exactly to do the routine in question. This
                                    is important for users with poor internet
                                    connectivity and cannot watch the attached
                                    video
                                </small>
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <TextArea
                                textAreaId="description"
                                initialValue={description}
                                onInputChange={this.handleDescriptionChange}
                            />
                        </div>
                    </div>

                    <div className="form-group__two-part">
                        <div className="form-group__two-part--label-container">
                            <label htmlFor="plan">
                                <span className="mb-sm d-block text-black">
                                    Availability for: (Optional)
                                </span>
                                <small className="font-smaller">
                                    Specify if this routine will be available
                                    for owners of basic or premium plans.
                                    <span className="d-block">
                                        Default is basic
                                    </span>
                                </small>
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <SelectInput
                                selectInputId="plan"
                                initialValue={{
                                    value: "all",
                                    label: "All plans",
                                }}
                                onInputChange={this.handlePlanChange}
                                selectValues={[
                                    {
                                        value: "basic",
                                        label: "Basic plans only",
                                    },
                                    {
                                        value: "premium",
                                        label: "Premium plans only",
                                    },
                                ]}
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
                                    Specify the number of seconds one should do
                                    this exercise for
                                </small>
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <small className="d-block text-secondary mb-sm">
                                Set 0 if routine is measured in repeats
                            </small>
                            <Input
                                inputId="lengthInSecs"
                                initialValue={lengthInSecs}
                                onInputChange={this.handleLengthInSecsChange}
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
                                    Specify the number of times a user should
                                    repeat the routine.
                                    <span className="d-block">
                                        eg X 10 sit ups
                                    </span>
                                </small>
                            </label>
                        </div>
                        <div className="form-group__two-part--input-container">
                            <small className="d-block text-secondary mb-sm">
                                Set 0 if routine is measured in seconds
                            </small>
                            <SelectInput
                                selectInputId="repeatCount"
                                initialValue={
                                    {
                                        value: repeatCount,
                                        label: repeatCount,
                                    } || {
                                        value: `X 0`,
                                        label: `X 0`,
                                    }
                                }
                                onInputChange={this.handleRepeatCountChange}
                                selectValues={range(0, 100).map(num => {
                                    return {
                                        value: `X ${num}`,
                                        label: `X ${num}`,
                                    };
                                })}
                            />
                        </div>
                    </div>

                    <div className="form-group__two-part">
                        <div className="form-group__two-part--input-container">
                            <button
                                className="btn btn--tertiary"
                                onClick={this.handleSaveAndPublishRoutine}
                            >
                                save and publish
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    componentDidUpdate() {
        if (this.state.routine._id !== this.props.routine._id) {
            this.setState({ routine: { ...this.props.routine } });
        }
    }
}
const range = (start, end, length = end - start + 1) =>
    Array.from({ length }, (_, i) => start + i);
