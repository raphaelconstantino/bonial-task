import React, { Component } from 'react';

class FormText extends Component {
    
    fnErroMsg () {
        if (this.props.showError && this.props.errorText !== "")
        {
            return (
                <div className="validation-error">
                    <span className="text">{this.props.errorText}</span>
                </div>
            );
        }        
    }

    render () {
        return (
            <div className="form-group row">
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