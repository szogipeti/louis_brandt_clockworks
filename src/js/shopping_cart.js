'use strict';

import FetchHelper from "./FetchHelper";

let itemIds = [];
let items = [];

window.onload = onLoad;

async function onLoad(){

    await FetchHelper.read("shopping_cart_item_ids").then((data) =>{
        const itemIds =  [];
        for(const item of data){
            itemIds.push(item.itemId);
        }
        return itemIds;
    }).then(data => itemIds = data);
    await FetchHelper.read("items").then(data => items = data);
    items = items.filter(x=>itemIds.includes(x.id));
    loadItems();
}


async function loadItems(){
    const itemContainer = document.querySelector('#item-container');

    for(const item of items){

        const template = document.getElementsByTagName("template")[0];

        const templateContent = template.content.querySelector("#horizontal-card-template");

        let templateCopy = document.importNode(templateContent,true);

        const img = templateCopy.querySelector("img");
        console.log(templateCopy.querySelector('#purchase-item-image'));
        await FetchHelper.read(`images?id=${item.imageId}`).then(data => img.setAttribute("src", `./img/${data[0].name}`))
        
       templateCopy.querySelector('#closeBtn').onclick = RmFromBasket;
    
        templateCopy.querySelector("h5").innerHTML = item.title;
    
        templateCopy.querySelector("h6").innerHTML = item.brandId;
       
        templateCopy.querySelector("p").innerHTML = item.description;
       
        
        
        const badges = templateCopy.querySelector("#badge-container");

        for(const tagId of item.tagIds){
            const p = document.createElement('p');
            p.classList.add('badge', 'bg-secondary', 'mx-1');
            p.innerHTML = "Férfiú";
            badges.appendChild(p);
        }
        


       templateCopy.querySelector("#price").innerHTML = item.price + " " + item.currency;

        
        
        itemContainer.appendChild(templateCopy);
    }
}

function  RmFromBasket(){

}