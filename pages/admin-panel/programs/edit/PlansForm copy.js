import { useState, useEffect, Fragment } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Input from "./forms/Input";
import FeaturesForm from "./FeaturesForm";
import CheckBoxForm from "./forms/CheckBoxForm";

const PlansForm = ({ plans, status, contentDetails, handleSubmit }) => {
    const [newPlans, setNewPlans] = useState(null);
    const [newStatus, setNewStatus] = useState(null);
    const [newContentDetails, setNewContentDetails] = useState(null);

    useEffect(() => {
        setNewContentDetails(contentDetails);
        setNewPlans(plans);
        setNewStatus(status);
    }, [plans, status, contentDetails]);

    const onSubmit = () => {
        const res = {
            plans: newPlans,
            status: newStatus,
            contentDetails: newContentDetails,
        };
        handleSubmit(res);
    };

    return (
        <div>
            <p className="title title--md text-black mb-1">
                Pricing Details for the programs
            </p>
            <p className="mb-3">
                Set up pricing plans for your program including a list of whats
                offered with every plan a subscriber chooses.
            </p>

            {newPlans && newContentDetails && newStatus && (
                <div className="program-edit__form">
                    <div>
                        {!newContentDetails.isFree && (
                            <Fragment>
                                {newContentDetails.hasPremium && (
                                    <Fragment>
                                        <div>
                                            <label htmlFor="premiumPrice">
                                                Price
                                            </label>
                                            <Input
                                                inputId="premiumPrice"
                                                initialValue={
                                                    newPlans.premium.price
                                                }
                                                type="number"
                                                onInputChange={price =>
                                                    setNewPlans({
                                                        ...newPlans,
                                                        premium: {
                                                            ...newPlans.premium,
                                                            price: parseFloat(
                                                                price,
                                                            ),
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                        <br />

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

                                        <div>
                                            <CheckBoxForm
                                                checkBoxId="premiumDiscounted"
                                                defaultChecked={
                                                    newPlans.premium.discounted
                                                }
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
                                            <label htmlFor="premiumDiscounted">
                                                Add offer to this plan
                                            </label>
                                        </div>

                                        <br />

                                        {/* set up offer price */}

                                        {newPlans.premium.discounted && (
                                            <div>
                                                <div>
                                                    <label htmlFor="plansPremiumOfferPrice">
                                                        New Offer Price
                                                    </label>
                                                    <Input
                                                        onInputChange={val => {
                                                            setNewPlans({
                                                                ...newPlans,
                                                                premium: {
                                                                    ...newPlans.premium,
                                                                    offerPrice: parseFloat(
                                                                        val,
                                                                    ),
                                                                },
                                                            });
                                                        }}
                                                        initialValue={
                                                            newPlans.premium
                                                                .offerPrice
                                                        }
                                                        inputId="plansPremiumOfferPrice"
                                                        type="number"
                                                    />
                                                </div>

                                                <br />

                                                <div>
                                                    <CheckBoxForm
                                                        checkBoxId="plansPremiumExpiry"
                                                        defaultChecked={
                                                            newPlans.premium
                                                                .limitedOffer
                                                        }
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

                                                    <label htmlFor="plansPremiumExpiry">
                                                        Set expiry date for this
                                                        offer
                                                    </label>
                                                </div>

                                                <br />

                                                <div>
                                                    <label htmlFor="plansPremiumOfferExpiry">
                                                        Offer Expiry Date
                                                    </label>
                                                    <Input
                                                        onInputChange={val => {
                                                            setNewPlans({
                                                                ...newPlans,
                                                                premium: {
                                                                    ...newPlans.premium,
                                                                    offerExpiryDate: moment(
                                                                        val,
                                                                    ).toString(),
                                                                },
                                                            });
                                                        }}
                                                        disabled={
                                                            !newPlans.premium
                                                                .limitedOffer
                                                        }
                                                        initialValue={moment(
                                                            new Date(
                                                                newPlans.premium.offerExpiryDate,
                                                            ),
                                                        ).format("YYYY-MM-DD")}
                                                        inputId="plansPremiumOfferExpiry"
                                                        type="date"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </Fragment>
                                )}

                                <p>set up premium plan</p>
                            </Fragment>
                        )}
                    </div>
                    <div>
                        <button onClick={onSubmit}>save and continue</button>
                    </div>
                </div>
            )}
        </div>
    );
};

PlansForm.propTypes = {
    plans: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
};

export default PlansForm;
