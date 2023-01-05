'use strict';

import FetchHelper from "./FetchHelper";

let itemIds = [];
let items = [];

window.onload = onLoad;

async function onLoad(){
    Object.prototype.count = function(id) {
        let count = 0;
        for (const item of this.values()){
            if(item.itemId == id){
                count++;
            }
        }
        return count;
    }
    let itemIdArray = [];
    await FetchHelper.read("shopping_cart_item_ids").then(data => itemIds = data).then((data) =>{
        const itemIdArray =  [];
        for(const item of data){
            itemIdArray.push(item.itemId);
        }
        return itemIdArray;
    }).then(data => itemIdArray = data);
    await FetchHelper.read("items").then(data => items = data);
    items = items.filter(x=>itemIdArray.includes(x.id));
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
        
        templateCopy.querySelector('#closeBtn').addEventListener("click", () => rmFromBasket(item.id));
    
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
        
        console.table(itemIds);
        templateCopy.querySelector("#quantity").textContent = itemIds.count(item.id);

        templateCopy.querySelector("#price").innerHTML = item.price + " " + item.currency;

        
        
        itemContainer.appendChild(templateCopy);
    }
}

async function rmFromBasket(id){
    for(const item of itemIds){
        if(item.itemId == id){
            await FetchHelper.delete('shopping_cart_item_ids', item.id);
        }
        location.href = "../shopping-cart.html";
    }
}