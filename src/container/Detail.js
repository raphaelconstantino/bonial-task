import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import currencyFormatter from 'currency-formatter';
import {OfferService} from '../services/OfferService';
import {OfferUtil} from '../util/OfferUtil';
import {Offer} from '../models/Offer';

class Detail extends Component {
  
    constructor () {
        super();
        this.state = { offer : new Offer()};
    }

    componentDidMount() {
        OfferService.fetchById(this.props.match.params.offerKey)
            .then(offer => this.setState({offer}));
    } 

    getImg(offer) {
        if (offer)
        {
            return (<img src={offer.productImagePointer} className="img-responsive" alt="" />);
        }
    }     

    render() {

        return (
            <div className="App">
            
                <nav>
                    <Link to="/" >{this.state.offer.category}</Link> - {this.state.offer.name}
                </nav>    

                <section id="category-container" className="col-md-12">

                    <div className="col-md-4">
                        {this.getImg(this.state.offer)}
                    </div>

                    <div className="col-md-8">
                        <h2>{this.state.offer.name}</h2>
                        <h3>{this.state.offer.productName}</h3>
                        <small>Category: {this.state.offer.category}</small>
                        <p>{this.state.offer.description}</p>
                        <p>Brand: <a href={this.state.offer.retailerUrl}>{this.state.offer.productBrand}</a></p>
                        <div className="new-price">
                            <span>{currencyFormatter.format(this.state.offer.reducedPrice.amount, { code: this.state.offer.reducedPrice.currencyCode })}</span>
                        </div>
                        <div>
                            Price: 
                            <span className="text-strike">{currencyFormatter.format(this.state.offer.originalPrice.amount, { code: this.state.offer.originalPrice.currencyCode })}</span><span className="off"> ({OfferUtil.percentageOff(this.state.offer.originalPrice.amount, this.state.offer.reducedPrice.amount)} off)</span>
                        </div>
                        <small>{OfferUtil.formatDate(this.state.offer.createdAt)}</small>
                            

                    </div>    

                </section> 

            </div>
        );
    }
}

export default Detail;
