import React, { Component } from 'react';

class FormText extends Component {
    
    fnErroMsg () {
        if (this.props.showError && this.props.errorText !== "")
        {
            return (
                <div className="validation-error">
                    <span className="text-danger">{this.props.errorText}</span>
                </div>
            );
        }        
    }

    getClasses () {
        if (this.props.showError && this.props.errorText !== "")
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
                        type="text" 
                        placeholder={this.props.label} 
                        value={this.props.val} 
                        onChange={this.props.change} />

                        {this.fnErroMsg()}
                </div>
            </div>
        )
    }

}

export default FormText;