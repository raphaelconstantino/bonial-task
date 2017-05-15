export class Offer {
    
    constructor(name, category, description, productName, retailerUrl, productBrand, reducedPrice, originalPrice, productImagePointer, createdAt) {
        
        this._key                   = null;
        this.name                   = name || "";
        this.category               = category || "";
        this.description            = description || "";
        this.productName            = productName || "";
        this.retailerUrl            = retailerUrl || "";
        this.productBrand           = productBrand || "";
        this.reducedPrice           = reducedPrice || { amount : 0, currencyCode : "" };
        this.originalPrice          = originalPrice || {amount : 0, currencyCode : "" };
        this.productImagePointer    = productImagePointer || "";
        this.createdAt              = createdAt || null;


    }

    set key(key) {
        this._key = key;
    }

    get key() {
        return this._key;
    }
    
   
}