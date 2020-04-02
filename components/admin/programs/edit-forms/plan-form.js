import { Fragment } from "react";
import Input from "../../../forms/Input";
import FeaturesForm from "./features-form";
import CheckBoxForm from "../../../forms/CheckBoxForm";

const PlanForm = ({ onChange, plan }) => {
    return (
        <Fragment>
            <div className="form-group__two-part">
                <div className="form-group__two-part--label-container">
                    <label htmlFor="basicPrice">
                        <span className="mb-sm d-block text-black">
                            Price in Ksh*
                        </span>
                        <small className="font-smaller">
                            Price for the basic package of the programs
                        </small>
                    </label>
                </div>
                <div className="form-group__two-part--input-container">
                    <Input
                        inputId="basicPrice"
                        initialValue={plan.price}
                        type="number"
                        onInputChange={price => onChange({ ...plan, price })}
                    />
                </div>
            </div>

            <FeaturesForm
                features={plan.features}
                onNewFeature={features => onChange({ ...plan, features })}
            />

            <div className="form-group__two-part">
                <div className="form-group__two-part--label-container">
                    <label htmlFor="basicDiscounted">
                        <span className="mb-sm d-block text-secondary">
                            Add offer to this plan (Optional)
                        </span>
                    </label>
                </div>
                <div className="form-group__two-part--input-container d-flex">
                    <CheckBoxForm
                        checkBoxId="basicDiscounted"
                        defaultChecked={plan.discounted}
                        onInputChange={discounted =>
                            onChange({ ...plan, discounted })
                        }
                    />
                    <p className="ml-1">
                        <small className="font-smaller">
                            Set a lower price that will be shown as discounted
                            price for this program ie:
                        </small>
                        <small className="d-block">
                            <del>7000 Ksh</del>
                            <span className="ml-1">5000 ksh</span>
                        </small>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default PlanForm;
