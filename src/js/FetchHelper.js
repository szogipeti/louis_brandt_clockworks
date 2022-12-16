'use strict';
export default class FetchHelper{
    static #url = "http://localhost:8888/";

    static read(path){
        return new Promise(async function(resolve, reject){
            const res = await fetch(FetchHelper.#url + path);
    
            resolve(res.json());
        });
    }
}