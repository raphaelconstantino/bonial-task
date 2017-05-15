import React, { Component } from 'react';

class FormRow extends Component {
    
    render () {
        return (
            <div className="form-group row">
                <label  className="col-md-1 col-form-label">{this.props.label}</label>
                <div className="col-md-5">
                    {this.props.children}
                </div>
            </div>
        )
    }

}

export default FormRow;