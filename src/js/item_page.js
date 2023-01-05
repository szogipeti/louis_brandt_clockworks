'use strict';

import FetchHelper from "./FetchHelper";

let item;
let brand;
let tags = [];
let img;

window.onload = onLoad();

async function onLoad(){

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    await FetchHelper.read(`items?id=${id}`).then(data => item = data[0]);
    await FetchHelper.read(`brands?id=${item.brandId}`).then(data => brand = data[0]);
    await FetchHelper.read('tags').then(data => tags = data);
    await FetchHelper.read(`images?id=${item.imageId}`).then(data => img = data[0]);
    tags = tags.filter(x=>item.tagIds.includes(x.id));

    importDataToCard();

    document.getElementById('fab').onclick = addToBasket;
}

function importDataToCard(){
    const watchImage = document.getElementById('watchImage');
    const title = document.getElementById('watchTitle');
    const brandText = document.getElementById('brand');
    const description = document.getElementById('description');
    const price = document.getElementById('price');
    
    const badgeContainer = document.getElementById('badge-container');
    for (const tag of tags){
        const p = document.createElement('p');
        p.classList.add('badge', 'bg-secondary', 'mx-1');
        p.textContent = tag.name;
        badgeContainer.append(p);
    }
    
    watchImage.src = `../img/${img.name}`;
    title.textContent = item.title;
    brandText.textContent = brand.name;
    description.textContent = item.description;
    price.textContent = `${item.price} ${item.currency}`;
}

function addToBasket(){
    const data = {
        "itemId": item.id,
    };
    FetchHelper.create("shopping_cart_item_ids", data);
}