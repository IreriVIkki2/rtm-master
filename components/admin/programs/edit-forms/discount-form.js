import { Fragment } from "react";
import Input from "../../../forms/Input";
import CheckBoxForm from "../../../forms/CheckBoxForm";
import moment from "moment";

const DiscountForm = ({ onChange, plan }) => {
    return (
        <Fragment>
            <div className="form-group__two-part">
                <div className="form-group__two-part--input-container">
                    <span className="mb-sm d-block text-black">
                        Offer Price in Ksh *
                    </span>
                    <Input
                        inputId="basicPrice"
                        initialValue={plan.discountedPrice}
                        type="number"
                        onInputChange={discountedPrice =>
                            onChange({ ...plan, discountedPrice })
                        }
                    />
                </div>
            </div>

            <div className="form-group__two-part">
                <div className="form-group__two-part--input-container">
                    <div className="d-flex">
                        <CheckBoxForm
                            checkBoxId="plansBasicExpiry"
                            defaultChecked={plan.limitedOffer}
                            onInputChange={limitedOffer =>
                                onChange({ ...plan, limitedOffer })
                            }
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
                        onInputChange={val =>
                            onChange({
                                ...plan,
                                expiryDate: moment(val).toString(),
                            })
                        }
                        disabled={!plan.limitedOffer}
                        initialValue={moment(new Date(plan.expiryDate)).format(
                            "YYYY-MM-DD",
                        )}
                        inputId="plansBasicOfferExpiry"
                        type="date"
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default DiscountForm;
