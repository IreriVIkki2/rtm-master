import React from "react";
import Link from "next/link";

export default ({ main, sales, plans, handlePay }) => {
    const { basic, premium, hasPremium } = plans;
    return (
        <div className="sales">
            <header
                className="sales__header"
                style={{
                    backgroundImage: `linear-gradient(to right bottom, rgba(44, 45, 52, 0.8), rgba(44, 45, 52, 0.5)), url("${main.banner}")`,
                }}
            >
                <div className="sales__header--content">
                    <small className="title title--sm mb-3">
                        <span className="">{main.category || "Work Out"}</span>
                        {"  "} //{"  "}
                        <span className="">
                            {main.difficulty || "Intermediate"}
                        </span>
                    </small>
                    <h1 className="title title--lg bolder mb-3 text-secondary">
                        {main.title}
                    </h1>
                    <p className="mb-3">{main.description}</p>

                    <div className="mb-3">
                        {basic.discounted ? (
                            <p className="title">
                                <span className="mr-1">
                                    <del>{basic.price} Ksh</del>
                                </span>
                                <span className="title--md">
                                    {basic.discountedPrice} KSH
                                </span>
                            </p>
                        ) : (
                            <p className="title title--">{basic.price}</p>
                        )}
                    </div>

                    <button
                        onClick={() =>
                            handlePay(
                                basic.discounted
                                    ? basic.discountedPrice
                                    : basic.price,
                                main.title,
                            )
                        }
                        className="btn btn--secondary"
                    >
                        {sales.callToAction}
                    </button>
                </div>
            </header>

            <div className="sales__main">
                <div
                    className="pt-7 mb-7"
                    dangerouslySetInnerHTML={{ __html: sales.article }}
                />
            </div>
        </div>
    );
};
