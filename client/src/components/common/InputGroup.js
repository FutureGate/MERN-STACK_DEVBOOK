import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange
}) => {
  return (
    <div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>

            <input
            value={value}
            onChange={onChange}
            className={classnames('form-control form-control-lg', {
                'is-invalid': error
            })}
            placeholder={placeholder}
            name={name}
            type={type}
            />

            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    </div>
  )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

InputGroup.defaultProps = {
    type: "text"
};

export default InputGroup;