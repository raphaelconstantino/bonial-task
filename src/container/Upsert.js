import React, { Component } from 'react';
import { Redirect } from 'react-router'
import {Offer} from '../models/Offer';
import {OfferService} from '../services/OfferService';
import FormUpload from '../components/FormUpload';
import FormText from '../components/FormText';
import FormTextArea from '../components/FormTextArea';
import FormSelect from '../components/FormSelect';
import ValidationRuleExecutor from '../support/validation/ValidationRuleExecutor';
import ValidationRules from '../support/validation/ValidationRules';

const fieldValidations = [ 
    ValidationRuleExecutor.ruleRunner("name", "Name", ValidationRules.required),
    ValidationRuleExecutor.ruleRunner("productName", "Product Name", ValidationRules.required),
    ValidationRuleExecutor.ruleRunner("retailerUrl", "Retailer Url", ValidationRules.required, ValidationRules.url),
    ValidationRuleExecutor.ruleRunner("productBrand", "Product Brand", ValidationRules.required),
    ValidationRuleExecutor.ruleRunner("category", "Category", ValidationRules.required),
    ValidationRuleExecutor.ruleRunner("description", "Description", ValidationRules.required),
    ValidationRuleExecutor.ruleRunner("originalPrice.amount", "Amount", ValidationRules.required, ValidationRules.positiveNumber),
    ValidationRuleExecutor.ruleRunner("reducedPrice.amount", "Amount", ValidationRules.required, ValidationRules.positiveNumber),
    ValidationRuleExecutor.ruleRunner("originalPrice.currencyCode", "Currency", ValidationRules.required),
    ValidationRuleExecutor.ruleRunner("reducedPrice.currencyCode", "Currency", ValidationRules.required),
    ValidationRuleExecutor.ruleRunner("productImagePointer", "Image", ValidationRules.required),
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
                .then(offer => this.setState({offer, validationErrors : ValidationRuleExecutor.run(offer, fieldValidations)}));
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
        this.setState({offer, validationErrors : ValidationRuleExecutor.run(offer, fieldValidations)});
    }   	

    handleFiles (files) {
        
        let offer = this.state.offer;
        let reader  = new FileReader()
        reader.readAsDataURL(files[0]);

        reader.onloadend = function () {
            offer.productImagePointer = reader.result;
            this.setState({offer, validationErrors : ValidationRuleExecutor.run(offer, fieldValidations)});
        }.bind(this);

    }        

	sendData (e) {
        
        e.preventDefault(); 

        var offerKey = this.props.match.params.offerKey;
        var offer = this.state.offer;
        offer.createdAt = new Date();

        this.setState({showErrors: true});

        // Validation
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

                    <FormSelect 
                        label="Category" 
                        val={this.state.offer.category} 
                        change={this.setField.bind(this, "category")} 
                        options={[{key : "Computer", val : "Computer"}]} 
                        showError={this.state.showErrors} 
                        errorText={this.state.validationErrors["category"]}/>    

                    <FormTextArea label="Description" val={this.state.offer.description} change={this.setField.bind(this, "description")} showError={this.state.showErrors} errorText={this.state.validationErrors["description"]}/>

                    <FormText label="Product Name" val={this.state.offer.productName} change={this.setField.bind(this, "productName")} showError={this.state.showErrors} errorText={this.state.validationErrors["productName"]}/>

                    <FormText label="Retailer Url" val={this.state.offer.retailerUrl} change={this.setField.bind(this, "retailerUrl")} showError={this.state.showErrors} errorText={this.state.validationErrors["retailerUrl"]}/>

                    <FormText label="Product Brand" val={this.state.offer.productBrand} change={this.setField.bind(this, "productBrand")} showError={this.state.showErrors} errorText={this.state.validationErrors["productBrand"]}/>                                                
  
                    <FormText label="Reduced Price" type="number" val={this.state.offer.reducedPrice.amount} change={this.setFieldObj.bind(this, "reducedPrice", "amount")} showError={this.state.showErrors} errorText={this.state.validationErrors["reducedPrice.amount"]}/>                              

                    <FormSelect 
                        label="Reduced Currency" 
                        val={this.state.offer.reducedPrice.currencyCode} 
                        change={this.setFieldObj.bind(this, "reducedPrice", "currencyCode")} 
                        options={[{key : "USD", val : "US Dollar"}, {key : "GBP", val : "Pound"}, {key : "EUR", val : "Euro"}]} 
                        showError={this.state.showErrors} 
                        errorText={this.state.validationErrors["reducedPrice.currencyCode"]}/>

                    <FormText label="Original Price" type="number" val={this.state.offer.originalPrice.amount} change={this.setFieldObj.bind(this, "originalPrice", "amount")} showError={this.state.showErrors} errorText={this.state.validationErrors["originalPrice.amount"]}/>

                    <FormSelect 
                        label="Original Currency" 
                        val={this.state.offer.originalPrice.currencyCode} 
                        change={this.setFieldObj.bind(this, "originalPrice", "currencyCode")} 
                        options={[{key : "USD", val : "US Dollar"}, {key : "GBP", val : "Pound"}, {key : "EUR", val : "Euro"}]} 
                        showError={this.state.showErrors} 
                        errorText={this.state.validationErrors["originalPrice.currencyCode"]}/>

                    <FormUpload label="Image" handleFiles={this.handleFiles.bind(this)} showError={this.state.showErrors} errorText={this.state.validationErrors["productImagePointer"]}/>                                                                                                                          

                    <button type="submit" className="btn btn-primary">Submit</button>&nbsp;
                    <button onClick={this.fnCancel.bind(this)} type="submit" className="btn btn-danger">Cancel</button>

                </form>    

            </section>     

        </div>
        );
    }
}

export default Upsert;
