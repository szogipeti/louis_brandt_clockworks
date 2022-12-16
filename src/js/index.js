'use strict';

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

function loadNavbar(tags, brands){
    const categoryNavbar = document.querySelector('#categoryNavbar ul');
    const brandsDropdown = document.createElement('li');
    brandsDropdown.classList.add('nav-item', 'dropdown', 'mx-3');

    const dropdownToggle = document.createElement('a');
    dropdownToggle.classList.add('nav-link', 'dropdown-toggle')
    dropdownToggle.setAttribute("role", "button");
    dropdownToggle.setAttribute("data-bs-toggle", "dropdown");
    dropdownToggle.setAttribute("aria-expanded", "false");
    dropdownToggle.textContent = 'Brands';

    const dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu');

    for(const brand of brands){
        const li = document.createElement('li');
        li.classList.add('dropdown-item');
        li.textContent = brand.name;
        dropdownMenu.append(li);
    }
    categoryNavbar.append(brandsDropdown);


    for(const tag of tags){
        const li = document.createElement('li');
        li.classList.add('nav-item', 'mx-3');
        const a = document.createElement('a');
        a.classList.add('nav-link');
        a.textContent = tag.name;
        a.href = '#';
        li.append(a);
        categoryNavbar.append(li);
    }

    brandsDropdown.append(dropdownToggle);
    brandsDropdown.append(dropdownMenu);
}

function loadCards(items){
    for (const item of items){
        createCardTemplate(item);
    }
}

async function createCardTemplate(item){
    const itemContainer = document.querySelector('#item-container .row');

    const template = document.getElementsByTagName("template")[0];
    const templateContent = template.content.querySelector(".template-card");
    let templateCopy = document.importNode(templateContent,true);
    
    const img = templateCopy.querySelector('img');
    await FetchHelper.read(`images?id=${item.imageId}`).then(data => img.src = `./src/img/${data[0].name}`)

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