import React from "react";
import PropTypes from "prop-types";

const TextField = ({ type, label, name, value, onChange, error, maxLength }) => {
    const getClasses = () => {
        return "form-control " + (error ? "is-invalid" : "");
    };

    return <div className="mb-4">
        <label htmlFor={name}>{label}</label>
        <div className="input-group has-validation">
            <input
                className={getClasses()}
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                maxLength={maxLength} />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    </div>;
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    maxLength: PropTypes.string
};

export default TextField;
