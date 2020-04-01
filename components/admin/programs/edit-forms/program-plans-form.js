import { useState, Fragment } from "react";
import PropTypes from "prop-types";
import PlanForm from "./plan-form";
import DiscountForm from "./discount-form";
import CheckBoxForm from "../../../../components/forms/CheckBoxForm";

const ProgramPlansForm = ({ pricing, handleSubmit, isFree }) => {
    const init = {
        hasPremium: false,
        basic: {
            price: 5000,
            features: [],
            discounted: false,
            limitedOffer: true,
            discountedPrice: 3000,
            expiryDate: "",
        },
        premium: {
            price: 7000,
            features: [],
            discounted: false,
            limitedOffer: true,
            discountedPrice: 5000,
            expiryDate: "",
        },
    };
    const [plans, setPlans] = useState(pricing ? pricing : init);

    if (isFree) {
        return (
            <Fragment>
                <p className="title title--md text-black mb-1">
                    This program is free
                </p>
                <p className="mb-3">
                    To set up a pricing plan, first change this setting from{" "}
                    <span className="title text-primary">Main info</span>
                </p>
            </Fragment>
        );
    }
    return (
        <div>
            <p className="title title--md text-black mb-1">
                Pricing Details for the programs
            </p>
            <p className="mb-3">
                Set up pricing plans for your program including a list of whats
                offered with every plan a subscriber chooses.
            </p>

            <p className="title title--md text-secondary mb-3">
                Set Up Basic plan
            </p>

            <div className="form__container mb-3">
                <PlanForm
                    plan={plans.basic}
                    onChange={basic => setPlans({ ...plans, basic })}
                />
                {plans.basic.discounted && (
                    <DiscountForm
                        plan={plans.basic}
                        onChange={basic => setPlans({ ...plans, basic })}
                    />
                )}
            </div>
            <p className="title title--md text-secondary mb-3">
                Set Up Premium plan{" "}
                <span className="text-tertiary">(Optional)</span>
            </p>

            <div className="form__container mb-3">
                <div className="form-group__two-part mb-3">
                    <div className="form-group__two-part--label-container">
                        <label
                            htmlFor="isFree"
                            className="mb-sm d-block text-black"
                        >
                            Set up a premium plan (Optional)
                        </label>
                    </div>
                    <div className="form-group__two-part--input-container d-flex">
                        <CheckBoxForm
                            checkBoxId="addPremiumPlan"
                            defaultChecked={plans.hasPremium}
                            onInputChange={hasPremium =>
                                setPlans({ ...plans, hasPremium })
                            }
                        />
                        <label className="ml-1" htmlFor="addPremiumPlan">
                            <small className="font-smaller">
                                Check this option to set up a premium plan for
                                this program. Uncheck it if this program only
                                has one payment plan
                            </small>
                        </label>
                    </div>
                </div>

                {plans.hasPremium && (
                    <Fragment>
                        <PlanForm
                            plan={plans.premium}
                            onChange={premium =>
                                setPlans({ ...plans, premium })
                            }
                        />
                        {plans.premium.discounted && (
                            <DiscountForm
                                plan={plans.premium}
                                onChange={premium =>
                                    setPlans({ ...plans, premium })
                                }
                            />
                        )}
                    </Fragment>
                )}
                <div className="form-group__two-part mb-3 mt-3">
                    <div className="form-group__two-part--input-container d-flex">
                        <button
                            className="btn btn--secondary"
                            onClick={() => {
                                handleSubmit(plans);
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProgramPlansForm.propTypes = {
    pricing: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
};

export default ProgramPlansForm;
