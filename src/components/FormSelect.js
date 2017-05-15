import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormErrorMessage from './FormErrorMessage';

class FormSelect extends Component {

	static propTypes = {
        showError : PropTypes.bool.isRequired,
        errorText : PropTypes.string,
        label : PropTypes.string.isRequired,
        val : PropTypes.string,
        change : PropTypes.func.isRequired,
        options : PropTypes.array.isRequired
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

                    <select className="form-control" placeholder={this.props.label} value={this.props.val} onChange={this.props.change}>
                        
                        <option></option>
                        {this.props.options.map(o => {
                            return <option key={o.key} value={o.key}>{o.val}</option>
                        })}
                    </select> 
                    
                    <FormErrorMessage showError={this.props.showError} errorText={this.props.errorText} />

                </div>
            </div>
        )
    }

}

export default FormSelect;