'use strict';

import FetchHelper from "./FetchHelper";

let itemIds = [];
let items = [];

window.onload = onLoad;

async function onLoad(){
    createCountPrototype();

    document.getElementById('purchaseBtn').onclick = purchase;

    let itemIdArray = [];
    getItemIdArray().then(data => itemIdArray = data);

    await FetchHelper.read("items").then(data => items = data);
    items = items.filter(x=>itemIdArray.includes(x.id));

    const fullPrice = document.getElementById('fullPrice');
    getFullPrice().then(data => fullPrice.textContent = `Full Price: ${data} USD`);
    
    loadItems();
}

function createCountPrototype(){
    Object.prototype.count = function(id) {
        let count = 0;
        for (const item of this.values()){
            if(item.itemId == id){
                count++;
            }
        }
        return count;
    }
}

async function getItemIdArray(){
    let itemIdArray = [];
    await FetchHelper.read("shopping_cart_item_ids").then(data => itemIds = data).then((data) =>{
        const itemIdArray =  [];
        for(const item of data){
            itemIdArray.push(item.itemId);
        }
        return itemIdArray;
    }).then(data => itemIdArray = data);
    return itemIdArray;
}

async function getFullPrice(){
    let fullPrice = 0;
    for(const item of itemIds){
        await FetchHelper.read(`items/${item.itemId}`).then(data => fullPrice += parseInt(data.price));
    }
    return fullPrice;
}

async function loadItems(){
    const itemContainer = document.querySelector('#item-container');

    for(const item of items){

        const template = document.getElementsByTagName("template")[0];
        const templateContent = template.content.querySelector("#horizontal-card-template");
        let templateCopy = document.importNode(templateContent,true);

        const img = templateCopy.querySelector("img");
        await FetchHelper.read(`images?id=${item.imageId}`).then(data => img.setAttribute("src", `./img/${data[0].name}`))
        
        templateCopy.querySelector('#closeBtn').addEventListener("click", () => rmFromBasket(item.id));
        templateCopy.querySelector("h5").innerHTML = item.title;
    
        const cardBrand = templateCopy.querySelector('h6');
        await FetchHelper.read(`brands?id=${item.brandId}`).then(data => cardBrand.textContent = data[0].name);
       
        templateCopy.querySelector("p").innerHTML = item.description;

        for(const tagId of item.tagIds){
            let badgeText = "";
            await FetchHelper.read(`tags?id=${tagId}`).then(data => badgeText = data[0].name);
            templateCopy.querySelector('#badge-container').append(createBadge(badgeText));
        }
        
        templateCopy.querySelector("#quantity").textContent = itemIds.count(item.id);
        templateCopy.querySelector("#price").innerHTML = item.price * itemIds.count(item.id) + " " + item.currency;
        templateCopy.querySelector('#plusBtn').addEventListener("click", () => plus(item.id));
        templateCopy.querySelector('#minusBtn').addEventListener("click", () => minus(item.id));
        
        itemContainer.appendChild(templateCopy);
    }
}

function createBadge(badgeText){
    const badge = document.createElement('p');
    badge.classList.add('badge', 'bg-secondary', 'mx-1');
    badge.textContent = badgeText;
    return badge;
}

async function rmFromBasket(id){
    for(const item of itemIds){
        if(item.itemId == id){
            await FetchHelper.delete('shopping_cart_item_ids', item.id);
        }
    }
    location.href = "../shopping-cart.html";
}

async function purchase(){
    for(const item of itemIds){
        await FetchHelper.delete('shopping_cart_item_ids', item.id).then(data => console.log(data));
    }
    location.href = "../index.html";
}

async function plus(id){
    const data = {
        "itemId": id
    };
    await FetchHelper.create('shopping_cart_item_ids', data);
    location.href = "../shopping-cart.html";
}

async function minus(id){
    try{
        for(const item of itemIds){
            if(item.itemId == id){
                await FetchHelper.delete('shopping_cart_item_ids', item.id);
                break;
            }
        }
        location.href = "../shopping-cart.html";
    }
    catch{

    }
}