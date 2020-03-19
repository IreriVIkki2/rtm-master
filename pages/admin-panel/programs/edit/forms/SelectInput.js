import PropTypes from "prop-types";

const Input = ({
    onInputChange,
    selectInputId,
    initialValue,
    selectValues,
    disabled,
}) => {
    const handleInputChange = e => {
        e.preventDefault();
        onInputChange(e.target.value);
    };

    return (
        <select
            className="form__reset form__select"
            id={selectInputId}
            onChange={handleInputChange}
            disabled={disabled || false}
        >
            <option className="form__reset" value={initialValue.value}>
                {initialValue.label}
            </option>
            {selectValues.map((item, index) => {
                return (
                    <option
                        className="form__reset"
                        key={index}
                        value={item.value}
                    >
                        {item.label}
                    </option>
                );
            })}
        </select>
    );
};

Input.propTypes = {
    selectInputId: PropTypes.string.isRequired,
    initialValue: PropTypes.object.isRequired,
    onInputChange: PropTypes.func.isRequired,
    selectValues: PropTypes.array.isRequired,
};

export default Input;
