import fetch from "isomorphic-unfetch";

export default () => {
    const handlePay = () => {
        fetch("http://localhost:5000/rtmi-d1227/us-central1/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: 70 }),
        }).then(r => {
            open(r.headers.get("location"));
            return r.json();
        });
    };

    return (
        <div className="mt-7">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ml-7 mr-3 mt-7 mb-7">
                <input
                    class="mdl-textfield__input"
                    id="sample1"
                    type="text"
                    name="price"
                    pattern="-?[0-9]*(\.[0-9]+)?"
                    required
                />
                <label class="mdl-textfield__label" for="sample1">
                    Price
                </label>
                <span class="mdl-textfield__error">Input is not a number!</span>

                <div className="mt-7 mb-7">
                    <div className="btn btn--secondary" onClick={handlePay}>
                        pay
                    </div>
                </div>
            </div>
        </div>
    );
};
