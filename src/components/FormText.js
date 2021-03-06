import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormErrorMessage from './FormErrorMessage';

class FormText extends Component {

	static propTypes = {
        showError : PropTypes.bool.isRequired,
        errorText : PropTypes.string,
        label : PropTypes.string.isRequired,
        val : PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
              ]),
        change : PropTypes.func.isRequired,
        type : PropTypes.string
    }

    getClasses () {
        if (this.props.showError && this.props.errorText)
        {
            return "form-group row has-error"
        }
        
        return "form-group row";

    }

    render () {
        return (
            <div className={this.getClasses()}>
                <label  className="col-md-1 col-form-label">{this.props.label}</label>
                <div className="col-md-5">
                    <input 
                        className="form-control" 
                        type={this.props.type || "text"}
                        placeholder={this.props.label} 
                        value={this.props.val} 
                        onChange={this.props.change} />

                        <FormErrorMessage showError={this.props.showError} errorText={this.props.errorText} />
                </div>
            </div>
        )
    }

}

export default FormText;