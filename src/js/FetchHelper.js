'use strict';
export default class FetchHelper{
    static #url = "http://localhost:8888/";

    static #headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };

    static read(path){
        return new Promise(async function(resolve, reject){
            const res = await fetch(FetchHelper.#url + path);
    
            resolve(res.json());
        });
    }

    static create(path, data){
        return new Promise(async function(resolve, reject){
            const res = await fetch(FetchHelper.#url + path, {
                method: "POST",
                headers: FetchHelper.#headers,
                body: JSON.stringify(data)
            });
            resolve(res.json());
        });
    }
}