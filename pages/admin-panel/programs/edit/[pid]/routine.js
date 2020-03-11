import React, { Component } from "react";
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

    handleOrderChange = order => {
        this.setState({ routine: { ...this.state.routine, order } });
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
        } = this.state.routine;

        return (
            <div>
                <div>
                    <label htmlFor="name">Routine Name</label>
                    <Input
                        inputId="name"
                        initialValue={name}
                        onInputChange={this.handleNameChange}
                        type="string"
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="description">Routine Description</label>
                    <TextArea
                        textAreaId="description"
                        initialValue={description}
                        onInputChange={this.handleDescriptionChange}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="youtubeUrl">Youtube Video Url</label>
                    <Input
                        inputId="youtubeUrl"
                        initialValue={youtubeUrl}
                        onInputChange={this.handleYoutubeUrlChange}
                        type="string"
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="order">Routine position</label>
                    <Input
                        inputId="order"
                        initialValue={order}
                        onInputChange={this.handleOrderChange}
                        type="number"
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="plan">Availability for: </label>
                    <SelectInput
                        selectInputId="plan"
                        initialValue={{ value: "all", label: "All plans" }}
                        onInputChange={this.handlePlanChange}
                        selectValues={[
                            { value: "basic", label: "Basic plans only" },
                            { value: "premium", label: "Premium plans only" },
                        ]}
                    />
                </div>
                <br />
                <div>
                    <div>
                        <label htmlFor="lengthInSecs">
                            Length of routine in seconds
                        </label>
                        <Input
                            inputId="lengthInSecs"
                            initialValue={lengthInSecs}
                            onInputChange={this.handleLengthInSecsChange}
                            type="number"
                        />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="repeatCount">Rev count: </label>
                        <SelectInput
                            selectInputId="repeatCount"
                            initialValue={{
                                value: `X 10`,
                                label: `X 10`,
                            }}
                            onInputChange={this.handleRepeatCountChange}
                            selectValues={range(1, 100).map(num => {
                                return {
                                    value: `X ${num}`,
                                    label: `X ${num}`,
                                };
                            })}
                        />
                    </div>
                </div>
                <br />
                <button onClick={this.handleSaveAndPublishRoutine}>
                    save and publish
                </button>
                <pre>{JSON.stringify(this.state.routine, undefined, 2)}</pre>
            </div>
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
