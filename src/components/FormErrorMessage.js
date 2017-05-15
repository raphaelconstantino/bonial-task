import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormErrorMessage extends Component {

	static propTypes = {
        showError : PropTypes.bool.isRequired,
        errorText : PropTypes.string,
    }

    fnErroMsg () {
        if (this.props.showError && this.props.errorText)
        {
            return (
                <div className="validation-error">
                    <span className="text-danger">{this.props.errorText}</span>
                </div>
            );
        }        
    }

    render () {
        return this.fnErroMsg() || (<div></div>);
        
    }

}

export default FormErrorMessage;