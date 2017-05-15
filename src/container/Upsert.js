import React, { Component } from 'react';
import { Redirect } from 'react-router'
import ReactFileReader from 'react-file-reader';
import {Offer} from '../models/Offer';
import {OfferService} from '../services/OfferService';
import FormRow from '../components/FormRow';
import FormText from '../components/FormText';
import ValidationRuleExecutor from '../support/validation/ValidationRuleExecutor';
import ValidationRules from '../support/validation/ValidationRules';

const fieldValidations = [ 
    ValidationRuleExecutor.ruleRunner("name", "Name", ValidationRules.required),
    ValidationRuleExecutor.ruleRunner("productName", "Product Name", ValidationRules.required),
    ValidationRuleExecutor.ruleRunner("retailerUrl", "Retailer Url", ValidationRules.required),
    ValidationRuleExecutor.ruleRunner("productBrand", "Product Brand", ValidationRules.required),
];

class Upsert extends Component {

	constructor () {
		super();
        this.state = { 
            offer : new Offer(), 
            redirect : false,
            showErrors: false,
            validationErrors: {}            
        };
        this.setField = this.setField.bind(this);
        this.setFieldObj = this.setFieldObj.bind(this);

    }    

    componentDidMount() {
        
        this.setState({validationErrors : ValidationRuleExecutor.run(this.state, fieldValidations)});
        
        // Fill fields to update
        if (this.props.match.params.offerKey) {
            OfferService.fetchById(this.props.match.params.offerKey)
                .then(offer => this.setState({offer}));
        }
    } 

    setField (fieldName, e)
    {
        let offer = this.state.offer;
        offer[fieldName] = e.target.value;
        this.setState({offer, validationErrors : ValidationRuleExecutor.run(offer, fieldValidations)});
    }   	

    setFieldObj (fieldObj, fieldName, e)
    {
        let offer = this.state.offer;
        offer[fieldObj][fieldName] = e.target.value;
        this.setState({offer});
    }   	

    handleFiles (files) {
        
        let offer = this.state.offer;
        let reader  = new FileReader()
        reader.readAsDataURL(files[0]);

        reader.onloadend = function () {
            offer.productImagePointer = reader.result;
            this.setState({offer});
        }.bind(this);

    }        

	sendData (e) {
        
        e.preventDefault(); 

        var offerKey = this.props.match.params.offerKey;
        var offer = this.state.offer;
        offer.createdAt = new Date();

        this.setState({showErrors: true});
        
        if(Object.keys(this.state.validationErrors).length)
        {
            return;
        }

        if (offerKey) 
        {
            // Update
            OfferService.update(offer, offerKey)
                .then(() => this.setState({redirect : true}))
        } else {
            // Insert
            OfferService.insert(offer)
                .then(() => this.setState({redirect : true}))
        }
        
    }

    fnRedirect() {
        if (this.state.redirect) 
        {
            return <Redirect to='/'/>;
        }
    }

    fnCancel () {
        this.setState({redirect : true});
    }

    render() { 

        return (
        <div className="App">

            {this.fnRedirect()}  

            <section id="category-container" className="col-md-12">

                <form className="form-horizontal" onSubmit={this.sendData.bind(this)}>

                    <FormText label="Name" val={this.state.offer.name} change={this.setField.bind(this, "name")} showError={this.state.showErrors} errorText={this.state.validationErrors["name"]}/>

                    <FormRow label="Category">
                        <select className="form-control" placeholder="Category" value={this.state.offer.category} onChange={this.setField.bind(this, "category")}>
                            <option></option>
                            <option value="Computer">Computer</option>
                        </select> 
                    </FormRow>                        

                    <FormRow label="Description">
                        <textarea className="form-control" type="text" placeholder="Description" value={this.state.offer.description} onChange={this.setField.bind(this, "description")}></textarea>
                    </FormRow>     

                    <FormText label="Product Name" val={this.state.offer.productName} change={this.setField.bind(this, "productName")} showError={this.state.showErrors} errorText={this.state.validationErrors["productName"]}/>

                    <FormText label="Retailer Url" val={this.state.offer.retailerUrl} change={this.setField.bind(this, "retailerUrl")} showError={this.state.showErrors} errorText={this.state.validationErrors["retailerUrl"]}/>

                    <FormText label="Product Brand" val={this.state.offer.productBrand} change={this.setField.bind(this, "productBrand")} showError={this.state.showErrors} errorText={this.state.validationErrors["productBrand"]}/>                                                
  
                    <FormRow label="Reduced Price">
                        <input className="form-control" type="number" placeholder="Reduced Price" value={this.state.offer.reducedPrice.amount} onChange={this.setFieldObj.bind(this, "reducedPrice", "amount")}/>
                    </FormRow>                               

                    <FormRow label="Reduced Currency">
                        <select className="form-control" placeholder="Currency" value={this.state.offer.reducedPrice.currencyCode} onChange={this.setFieldObj.bind(this, "reducedPrice", "currencyCode")}>
                            <option></option>
                            <option value="USD">US Dollar</option>
                            <option value="GBP">Pound</option>
                            <option value="EUR">Euro</option>
                        </select>
                    </FormRow>                                  

                    <FormRow label="Original Price">
                        <input className="form-control" type="number" placeholder="Original Price" value={this.state.offer.originalPrice.amount} onChange={this.setFieldObj.bind(this, "originalPrice", "amount")}/>
                    </FormRow> 

                    <FormRow label="Original Currency">
                        <select className="form-control" placeholder="Original Currency" value={this.state.offer.originalPrice.currencyCode} onChange={this.setFieldObj.bind(this, "originalPrice", "currencyCode")}>
                            <option></option>
                            <option value="USD">US Dollar</option>
                            <option value="GBP">Pound</option>
                            <option value="EUR">Euro</option>
                        </select>       
                    </FormRow>                     

                    <FormRow label="Image">
                        <ReactFileReader handleFiles={this.handleFiles.bind(this)}>
                            <span className='btn btn-info'>Upload</span>
                        </ReactFileReader>
                    </FormRow>                                                                                                                               

                    <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
                    <button onClick={this.fnCancel.bind(this)} type="submit" className="btn btn-danger">Cancel</button>

                </form>    

            </section>     

        </div>
        );
    }
}

export default Upsert;
