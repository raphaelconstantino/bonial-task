import {Offer} from '../models/Offer';

export class OfferDAO {

    constructor(connection) {

        this._connection = connection;
        this._store = 'offers';
    }

    insert(offer) {
        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(offer);

            request.onsuccess = e => {
                console.log(e)
                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('It was not possible do add the offer');

            };

        });
    }

    fetch() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            let offers = [];

            cursor.onsuccess = e => {

                let current = e.target.result;

                if(current) {

                    let data = current.value;
                    let offer = new Offer(data.name, data.category, data.description, data.productName, data.retailerUrl, data.productBrand, data.reducedPrice, data.originalPrice, data.productImagePointer, data.createdAt);
                    offer.key = current.key;
                    offers.push(offer);

                    current.continue();

                } else {

                    resolve(offers);
                }

            };

            cursor.onerror = e => {

                console.log(e.target.error);
                reject('It was not possible do fetch offers');
            };

        });
    }

    fetchById(id) {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .get(parseInt(id, 10));

            cursor.onsuccess = e => {

                let offer = {};
                let data = e.target.result;
                offer = new Offer(data.name, data.category, data.description, data.productName, data.retailerUrl, data.productBrand, data.reducedPrice, data.originalPrice, data.productImagePointer, data.createdAt);
                offer.key = id;

                resolve(offer);

            };

            cursor.onerror = e => {

                console.log(e.target.error);
                reject('It was not possible do fetch offers');
            };

        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .delete(parseInt(id, 10));

            request.onsuccess = e => {
                console.log(e)
                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('It was not possible do add the offer');

            };

        });
    }

    update(offer, id) {
        return new Promise((resolve, reject) => {
            
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .put(offer, parseInt(id, 10));

            request.onsuccess = e => {
                console.log(e)
                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('It was not possible do add the offer');

            };

        });
    }        

}