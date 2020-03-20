import { useState, useEffect, Fragment } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Input from "../../../../components/forms/Input";
import FeaturesForm from "./FeaturesForm";
import CheckBoxForm from "../../../../components/forms/CheckBoxForm";

const PlansForm = ({ plans, status, contentDetails, handleSubmit }) => {
    const [newPlans, setNewPlans] = useState(null);
    const [newStatus, setNewStatus] = useState(null);
    const [newContentDetails, setNewContentDetails] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setNewContentDetails(contentDetails);
        setNewPlans(plans);
        setNewStatus(status);

        if (plans && contentDetails && status) {
            setLoaded(true);
        }
    }, [plans, status, contentDetails]);

    const onSubmit = () => {
        const res = {
            plans: newPlans,
            status: newStatus,
            contentDetails: newContentDetails,
        };
        handleSubmit(res);
    };

    if (!loaded) return <p className="title title--sm ml-7 mb-3">Loading...</p>;

    const freeProgram = (
        <div className="form-group__two-part form__container mb-3">
            <div className="form-group__two-part--label-container">
                <label htmlFor="isFree" className="mb-sm d-block text-black">
                    Is this a free program *
                </label>
            </div>
            <div className="form-group__two-part--input-container d-flex">
                <CheckBoxForm
                    checkBoxId="isFree"
                    defaultChecked={newContentDetails.isFree}
                    onInputChange={checked => {
                        setNewContentDetails({
                            ...newContentDetails,
                            isFree: checked,
                        });
                        setNewStatus({
                            ...newStatus,
                            availability: checked ? "public" : "private",
                        });
                    }}
                />
                <p className="ml-1">
                    <small className="font-smaller">
                        Check this field if this program is not for sale
                    </small>
                </p>
            </div>
        </div>
    );

    const basicDiscounted = (
        <Fragment>
            <div className="form-group__two-part">
                <div className="form-group__two-part--input-container">
                    <span className="mb-sm d-block text-black">
                        Offer Price in Ksh *
                    </span>
                    <Input
                        inputId="basicPrice"
                        initialValue={newPlans.basic.price}
                        type="number"
                        onInputChange={price =>
                            setNewPlans({
                                ...newPlans,
                                basic: {
                                    ...newPlans.basic,
                                    price: parseFloat(price),
                                },
                            })
                        }
                    />
                </div>
            </div>

            <div className="form-group__two-part">
                <div className="form-group__two-part--input-container">
                    <div className="d-flex">
                        <CheckBoxForm
                            checkBoxId="plansBasicExpiry"
                            defaultChecked={newPlans.basic.limitedOffer}
                            onInputChange={checked => {
                                setNewPlans({
                                    ...newPlans,
                                    basic: {
                                        ...newPlans.basic,
                                        limitedOffer: checked,
                                    },
                                });
                            }}
                        />
                        <p className="ml-1">
                            <span className="mb-sm text-black d-inline-block">
                                Basic Plan Expiry Date
                            </span>
                            <small className="font-smaller ml-1">
                                Set an expiry date for basic plan offer.
                            </small>
                        </p>
                    </div>
                </div>
            </div>

            <div className="form-group__two-part">
                <div className="form-group__two-part--input-container">
                    <Input
                        onInputChange={val => {
                            setNewPlans({
                                ...newPlans,
                                basic: {
                                    ...newPlans.basic,
                                    offerExpiryDate: moment(val).toString(),
                                },
                            });
                        }}
                        disabled={!newPlans.basic.limitedOffer}
                        initialValue={moment(
                            new Date(newPlans.basic.offerExpiryDate),
                        ).format("YYYY-MM-DD")}
                        inputId="plansBasicOfferExpiry"
                        type="date"
                    />
                </div>
            </div>
        </Fragment>
    );

    const basicPlan = (
        <Fragment>
            <p className="title title--md text-secondary mb-3">
                Set Up Basic plan
            </p>

            <div className="form__container">
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
                            initialValue={newPlans.basic.price}
                            type="number"
                            onInputChange={price =>
                                setNewPlans({
                                    ...newPlans,
                                    basic: {
                                        ...newPlans.basic,
                                        price: parseFloat(price),
                                    },
                                })
                            }
                        />
                    </div>
                </div>

                <FeaturesForm
                    features={newPlans.basic.features}
                    onNewFeature={features =>
                        setNewPlans({
                            ...newPlans,
                            basic: {
                                ...newPlans.basic,
                                features,
                            },
                        })
                    }
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
                            defaultChecked={newPlans.basic.discounted}
                            onInputChange={checked => {
                                setNewPlans({
                                    ...newPlans,
                                    basic: {
                                        ...newPlans.basic,
                                        discounted: checked,
                                    },
                                });
                            }}
                        />
                        <p className="ml-1">
                            <small className="font-smaller">
                                Set a lower price that will be shown as
                                discounted price for this program ie:
                            </small>
                            <small className="d-block">
                                <del>7000 Ksh</del>
                                <span className="ml-1">5000 ksh</span>
                            </small>
                        </p>
                    </div>
                </div>

                {newPlans.basic.discounted && basicDiscounted}
            </div>
        </Fragment>
    );

    const premiumDiscounted = (
        <Fragment>
            <div className="form-group__two-part">
                <div className="form-group__two-part--input-container">
                    <span className="mb-sm d-block text-black">
                        Offer Price in Ksh *
                    </span>
                    <Input
                        inputId="premiumPrice"
                        initialValue={newPlans.premium.price}
                        type="number"
                        onInputChange={price =>
                            setNewPlans({
                                ...newPlans,
                                premium: {
                                    ...newPlans.premium,
                                    price: parseFloat(price),
                                },
                            })
                        }
                    />
                </div>
            </div>

            <div className="form-group__two-part">
                <div className="form-group__two-part--input-container">
                    <div className="d-flex">
                        <CheckBoxForm
                            checkBoxId="plansPremiumExpiry"
                            defaultChecked={newPlans.premium.limitedOffer}
                            onInputChange={checked => {
                                setNewPlans({
                                    ...newPlans,
                                    premium: {
                                        ...newPlans.premium,
                                        limitedOffer: checked,
                                    },
                                });
                            }}
                        />
                        <p className="ml-1">
                            <span className="mb-sm text-black d-inline-block">
                                Premium Plan Expiry Date
                            </span>
                            <small className="font-smaller ml-1">
                                Set an expiry date for premium plan offer.
                            </small>
                        </p>
                    </div>
                </div>
            </div>

            <div className="form-group__two-part">
                <div className="form-group__two-part--input-container">
                    <Input
                        onInputChange={val => {
                            setNewPlans({
                                ...newPlans,
                                premium: {
                                    ...newPlans.premium,
                                    offerExpiryDate: moment(val).toString(),
                                },
                            });
                        }}
                        disabled={!newPlans.premium.limitedOffer}
                        initialValue={moment(
                            new Date(newPlans.premium.offerExpiryDate),
                        ).format("YYYY-MM-DD")}
                        inputId="plansPremiumOfferExpiry"
                        type="date"
                    />
                </div>
            </div>
        </Fragment>
    );

    const premiumPlanForm = (
        <Fragment>
            <div className="form-group__two-part">
                <div className="form-group__two-part--label-container">
                    <label htmlFor="premiumPrice">
                        <span className="mb-sm d-block text-black">
                            Price in Ksh*
                        </span>
                        <small className="font-smaller">
                            Price for the premium package of the programs
                        </small>
                    </label>
                </div>
                <div className="form-group__two-part--input-container">
                    <Input
                        inputId="premiumPrice"
                        initialValue={newPlans.premium.price}
                        type="number"
                        onInputChange={price =>
                            setNewPlans({
                                ...newPlans,
                                premium: {
                                    ...newPlans.premium,
                                    price: parseFloat(price),
                                },
                            })
                        }
                    />
                </div>
            </div>

            <FeaturesForm
                features={newPlans.premium.features}
                onNewFeature={features =>
                    setNewPlans({
                        ...newPlans,
                        premium: {
                            ...newPlans.premium,
                            features,
                        },
                    })
                }
            />

            <div className="form-group__two-part">
                <div className="form-group__two-part--label-container">
                    <label htmlFor="premiumDiscounted">
                        <span className="mb-sm d-block text-secondary">
                            Add offer to this plan (Optional)
                        </span>
                    </label>
                </div>
                <div className="form-group__two-part--input-container d-flex">
                    <CheckBoxForm
                        checkBoxId="premiumDiscounted"
                        defaultChecked={newPlans.premium.discounted}
                        onInputChange={checked => {
                            setNewPlans({
                                ...newPlans,
                                premium: {
                                    ...newPlans.premium,
                                    discounted: checked,
                                },
                            });
                        }}
                    />
                    <p className="ml-1">
                        <small className="font-smaller">
                            Set a lower premium price that will be shown as
                            discounted price for this plan ie:
                        </small>
                        <small className="d-block">
                            <del>10,000 Ksh</del>
                            <span className="ml-1">7,000 ksh</span>
                        </small>
                    </p>
                </div>
            </div>

            {newPlans.premium.discounted && premiumDiscounted}
        </Fragment>
    );

    const premiumPlan = (
        <Fragment>
            <p className="title title--md text-secondary mb-3">
                Set Up Premium plan{" "}
                <span className="text-tertiary">(Optional)</span>
            </p>

            <div className="form__container">
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
                            defaultChecked={newContentDetails.hasPremium}
                            onInputChange={checked => {
                                setNewContentDetails({
                                    ...newContentDetails,
                                    hasPremium: checked,
                                });
                            }}
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
                {newContentDetails.hasPremium && premiumPlanForm}
            </div>
        </Fragment>
    );

    return (
        <div>
            <p className="title title--md text-black mb-1">
                Pricing Details for the programs
            </p>
            <p className="mb-3">
                Set up pricing plans for your program including a list of whats
                offered with every plan a subscriber chooses.
            </p>

            {freeProgram}

            {!newContentDetails.isFree && (
                <Fragment>
                    {basicPlan}
                    <p className="mb-3" />
                    {premiumPlan}
                </Fragment>
            )}

            <div className="form__container">
                <div className="form-group__two-part mb-7">
                    <div className="form-group__two-part--input-container d-flex">
                        <button
                            className="btn btn--secondary"
                            onClick={onSubmit}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

PlansForm.propTypes = {
    plans: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
};

export default PlansForm;
