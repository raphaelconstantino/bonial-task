export class Offer {
    
    constructor(obj = {}) {

        this._key                   = null;
        this.name                   = obj.name || "";
        this.category               = obj.category || "";
        this.description            = obj.description || "";
        this.productName            = obj.productName || "";
        this.retailerUrl            = obj.retailerUrl || "";
        this.productBrand           = obj.productBrand || "";
        this.reducedPrice           = obj.reducedPrice || { amount : 0, currencyCode : "" };
        this.originalPrice          = obj.originalPrice || {amount : 0, currencyCode : "" };
        this.productImagePointer    = obj.productImagePointer || "";
        this.createdAt              = obj.createdAt || null;


    }

    set key(key) {
        this._key = key;
    }

    get key() {
        return this._key;
    }
    
   
}