import {ConnectionFactory} from '../support/db/ConnectionFactory';
import {OfferDAO} from '../dao/OfferDAO';

export class OfferService {


    static insert(offer) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new OfferDAO(connection))
            .then(dao => dao.insert(offer))
            .then(() => 'Offer inserted successfully')
            .catch(error => {
                console.log(error);
                throw new Error('It was not possible to insert offer')
            });
    }

    static fetch() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new OfferDAO(connection))
            .then(dao => dao.fetch())
            .catch(error => {
                console.log(error);
                throw new Error('It was not possible to fetch offers')
            })
    }    

    static fetchById(id) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new OfferDAO(connection))
            .then(dao => dao.fetchById(id))
            .catch(error => {
                console.log(error);
                throw new Error('It was not possible to fetch offer by Id')
            })
    }     

   static delete(id) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new OfferDAO(connection))
            .then(dao => dao.delete(id))
            .then(() => 'Offer deleted successfully')
            .catch(error => {
                console.log(error);
                throw new Error('It was not possible to delete offer')
            });
    }

    static update(offer, id) {

        return ConnectionFactory
            .getConnection()
            .then(connection => new OfferDAO(connection))
            .then(dao => dao.update(offer, id))
            .then(() => 'Offer updated successfully')
            .catch(error => {
                console.log(error);
                throw new Error('It was not possible to update offer')
            });
    }    

}