'use strict';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/style.css";
import FetchHelper from "./FetchHelper.js";

let items = [];
let brands = [];
let tags = [];
let imgs = [];


window.onload = onLoad;

async function onLoad(){
    await FetchHelper.read('items').then(data => items = data);
    await FetchHelper.read('brands').then(data => brands = data);
    await FetchHelper.read('tags').then(data => tags = data);
    await FetchHelper.read('images').then(data => imgs = data);
    loadNavbar(tags, brands);
    loadCards(items);
}

function loadNavbar(){
    const categoryNavbar = document.querySelector('#categoryNavbar');

    const template = document.getElementsByTagName('template')[0];
    const templateContent = template.content.querySelector(".template-nav");
    const templateCopy = document.importNode(templateContent, true);

    const dropdownMenu = templateCopy.querySelector('.dropdown-menu');
    for(const brand of brands){
        const li = createBrandListItem(brand);
        dropdownMenu.append(li);
    }

    const navbar = templateCopy.querySelector('.navbar-nav')
    for(const tag of tags){
        const li = createTagListItem(tag);
        navbar.append(li);
    }

    categoryNavbar.append(templateCopy);
}

function createBrandListItem(brand){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('dropdown-item');
    a.textContent = brand.name;
    li.append(a);
    return li;
}

function createTagListItem(tag){
    const li = document.createElement('li');
    li.classList.add('nav-item', 'mx-3');
    const a = document.createElement('a');
    a.classList.add('nav-link');
    a.textContent = tag.name;
    a.href = '#';
    li.append(a);
    return li;
}

function loadCards(){
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