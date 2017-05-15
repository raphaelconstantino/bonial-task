import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {OfferService} from '../services/OfferService';
import {OfferUtil} from '../util/OfferUtil';
import currencyFormatter from 'currency-formatter';

class OfferList extends Component {
  
    constructor () {
        super();
        this.state = { offers : []};
    }

    componentDidMount() {
        OfferService.fetch()
            .then(offerList => this.setState({offers : offerList.offers}));
    }

    deleteOffer (id, e) {
        e.preventDefault();
        OfferService.delete(id)
            .then(() => {
                OfferService.fetch()
                    .then(offerList => this.setState({offers : offerList.offers}));    
            });
    }         

    getImg(offer) {
        if (offer)
        {
            return (<img src={offer.productImagePointer} className="img-responsive" alt="" />);
        }
    }

    getNoDataMsg () {
        if (this.state.offers.length === 0)
        {
            return (<p>You currently does not have any record. Add your first one on "Insert New Offer".</p>);
        }
    }    


    render() {
    
        return (
            <div className="App">
                
                <header>
                    <Link to="/insert" className="btn btn-primary">Insert New Offer</Link>
                </header>    

                <section id="category-container" className="col-md-12">

                    {this.getNoDataMsg()}

                    {this.state.offers.map(offer => {
                        return (<div key={offer.key} className="col-md-3 offer-box">
                                    <div className="col-md-9">
                                        <Link to={"detail/" + offer.key}>{this.getImg(offer)}</Link>
                                    </div> 
                                    <div className="col-md-12">   
                                        <h2><Link to={"detail/" + offer.key}>{offer.name}</Link></h2>
                                        <div className="new-price">
                                            <span>{currencyFormatter.format(offer.reducedPrice.amount, { code: offer.reducedPrice.currencyCode })}</span>
                                        </div>
                                        <div>
                                            Price: 
                                            <span className="currency text-strike">{currencyFormatter.format(offer.originalPrice.amount, { code: offer.originalPrice.currencyCode })}</span><span className="off"> ({OfferUtil.percentageOff(offer.originalPrice.amount, offer.reducedPrice.amount)} off)</span>
                                            <br/>
                                            <small>{OfferUtil.formatDate(offer.createdAt)}</small>
                                        </div>
                                        <div>
                                            <Link to={"/update/" + offer.key}  className="btn btn-xs btn-primary">Update</Link>&nbsp;
                                            <a href="#" onClick={this.deleteOffer.bind(this, offer.key)} className="btn btn-xs btn-danger">Delete</a>
                                        </div> 
                                    </div>                           

                                </div>); 
                    })}

                </section>

            </div>
        );
    }
}

export default OfferList;
