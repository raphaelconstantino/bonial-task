import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactFileReader from 'react-file-reader';
import FormErrorMessage from './FormErrorMessage';

class FormUpload extends Component {

	static propTypes = {
        showError : PropTypes.bool.isRequired,
        errorText : PropTypes.string,
        label : PropTypes.string.isRequired,
        handleFiles : PropTypes.func.isRequired
    }

    render () {
        return (
            <div className="form-group row">
                <label  className="col-md-1 col-form-label">{this.props.label}</label>
                <div className="col-md-5">
                    <ReactFileReader handleFiles={this.props.handleFiles}>
                        <span className='btn btn-info'>Upload</span>
                    </ReactFileReader>
                    <FormErrorMessage showError={this.props.showError} errorText={this.props.errorText} />
                </div>
            </div>
        )
    }

}

export default FormUpload;