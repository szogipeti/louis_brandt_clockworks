'use strict';

import FetchHelper from "./FetchHelper";

export function loadCards(items){
    for (const item of items){
        createCardTemplate(item);
    }
}

async function createCardTemplate(item){
    const itemContainer = document.querySelector('#item-container .row');

    const template = document.getElementsByTagName("template")[1];
    const templateContent = template.content.querySelector(".template-card");
    let templateCopy = document.importNode(templateContent,true);
    
    const img = templateCopy.querySelector('img');
    await FetchHelper.read(`images?id=${item.imageId}`).then(data => img.src = `./img/${data[0].name}`)

    const cardTitle = templateCopy.querySelector('h5');
    cardTitle.textContent = item.title;

    const cardBrand = templateCopy.querySelector('h6');
    await FetchHelper.read(`brands?id=${item.brandId}`).then(data => cardBrand.textContent = data[0].name);

    const cardDescription = templateCopy.querySelector('#description');
    cardDescription.textContent = item.description;

    for(const tagId of item.tagIds){
        let badgeText = "";
        await FetchHelper.read(`tags?id=${tagId}`).then(data => badgeText = data[0].name).then(data => console.log(data));
        templateCopy.querySelector('#badge-container').append(createBadge(badgeText));
    }

    const cardPrice = templateCopy.querySelector('#price');
    cardPrice.textContent = `${item.price} ${item.currency}`;

    itemContainer.append(templateCopy);
}

function createBadge(badgeText){
    const badge = document.createElement('p');
    badge.classList.add('badge', 'bg-secondary', 'mx-1');
    badge.textContent = badgeText;
    return badge;
}