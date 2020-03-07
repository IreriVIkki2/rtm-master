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
            <h1>Edit plans information</h1>
            <p>
                Set up pricing plans for your program including a list of whats
                offered with every plan a subscriber chooses.
            </p>

            {newPlans && newContentDetails && newStatus && (
                <div>
                    <p>the forms will come in here</p>
                    <div>
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
                                    availability: checked
                                        ? "public"
                                        : "private",
                                });
                            }}
                        />

                        <label htmlFor="isFree">Is this a free program</label>
                        <hr />
                        {!newContentDetails.isFree && (
                            <div>
                                <Fragment>
                                    <div>
                                        <label htmlFor="basicPrice">
                                            Price
                                        </label>
                                        <Input
                                            inputId="basicPrice"
                                            initialValue={newPlans.basic.price}
                                            type="number"
                                            onInputChange={price =>
                                                setNewPlans({
                                                    ...newPlans,
                                                    basic: {
                                                        ...newPlans.basic,
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

                                    <div>
                                        <CheckBoxForm
                                            checkBoxId="basicDiscounted"
                                            defaultChecked={
                                                newPlans.basic.discounted
                                            }
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
                                        <label htmlFor="basicDiscounted">
                                            Add offer to this plan
                                        </label>
                                    </div>

                                    <br />

                                    {/* set up offer price */}

                                    {newPlans.basic.discounted && (
                                        <div>
                                            <div>
                                                <label htmlFor="plansBasicOfferPrice">
                                                    New Offer Price
                                                </label>
                                                <Input
                                                    onInputChange={val => {
                                                        setNewPlans({
                                                            ...newPlans,
                                                            basic: {
                                                                ...newPlans.basic,
                                                                offerPrice: parseFloat(
                                                                    val,
                                                                ),
                                                            },
                                                        });
                                                    }}
                                                    initialValue={
                                                        newPlans.basic
                                                            .offerPrice
                                                    }
                                                    inputId="plansBasicOfferPrice"
                                                    type="number"
                                                />
                                            </div>

                                            <br />

                                            <div>
                                                <CheckBoxForm
                                                    checkBoxId="plansBasicExpiry"
                                                    defaultChecked={
                                                        newPlans.basic
                                                            .limitedOffer
                                                    }
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

                                                <label htmlFor="plansBasicExpiry">
                                                    Set expiry date for this
                                                    offer
                                                </label>
                                            </div>

                                            <br />

                                            <div>
                                                <label htmlFor="plansBasicOfferExpiry">
                                                    Offer Expiry Date
                                                </label>
                                                <Input
                                                    onInputChange={val => {
                                                        setNewPlans({
                                                            ...newPlans,
                                                            basic: {
                                                                ...newPlans.basic,
                                                                offerExpiryDate: moment(
                                                                    val,
                                                                ).toString(),
                                                            },
                                                        });
                                                    }}
                                                    disabled={
                                                        !newPlans.basic
                                                            .limitedOffer
                                                    }
                                                    initialValue={moment(
                                                        new Date(
                                                            newPlans.basic.offerExpiryDate,
                                                        ),
                                                    ).format("YYYY-MM-DD")}
                                                    inputId="plansBasicOfferExpiry"
                                                    type="date"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Fragment>

                                <br />

                                <div>
                                    <CheckBoxForm
                                        checkBoxId="addPremiumPlan"
                                        defaultChecked={
                                            newContentDetails.hasPremium
                                        }
                                        onInputChange={checked => {
                                            setNewContentDetails({
                                                ...newContentDetails,
                                                hasPremium: checked,
                                            });
                                        }}
                                    />

                                    <label htmlFor="addPremiumPlan">
                                        Set up a premium plan
                                    </label>
                                </div>

                                <br />

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
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={onSubmit}>save and continue</button>
                    </div>
                    <div>
                        <h3>Json Object</h3>
                        <pre>
                            {JSON.stringify(
                                { newPlans, newContentDetails, newStatus },
                                undefined,
                                2,
                            )}
                        </pre>
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
