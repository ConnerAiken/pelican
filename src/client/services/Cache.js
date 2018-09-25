import _ from "lodash";

export default class CacheService {

    constructor() { 
        this.listenForCartEvents = this.listenForCartEvents.bind(this);
        this.listenForEvents = this.listenForEvents.bind(this);
        this.saveCache = this.saveCache.bind(this);

        this.cache = {};
        this.hydrateCache();
    }

    listenForEvents() {
        this.listenForCartEvents();
    }

    hydrateCache() {
        const cacheKeys = [];

        for (var key in localStorage) {
            if(_.includes(key, 'pd-')) {
                cacheKeys.push(key);
            }
        }

        this.cache = _.extend(this.cache, cacheKeys.map(key => JSON.parse(localStorage.getItem(key))));

        return this.cache;
    }
    saveCache() {
        const cacheKeys = Object.keys(this.cache); 

        cacheKeys.forEach(key => { 
            localStorage.setItem(`pd-${key}`, JSON.stringify(this.cache[key]));
        });  

        return cacheKeys;
    }

    listenForCartEvents() {  
        document.querySelector("#root").addEventListener('cart::added', e => {  
            this.cache.cart.push(e.detail); 
            this.saveCache();
        }, false);
        document.querySelector("#root").addEventListener('cart::removed', e => {   
            this.cache.cart = this.cache.cart.slice(0).filter(item => item.id != e.original.id);  
            this.saveCache();
        }, false);
        document.querySelector("#root").addEventListener('cart::emptied', e => {  
            this.cache.cart = [];
            this.saveCache();
        }, false);
      }
}
