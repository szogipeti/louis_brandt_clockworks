'use strict';

export function loadNavbar(tags, brands){
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
    a.href = `./search-items.html?brand=${brand.name}`;
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
    a.href = `./search-items.html?tag=${tag.name}`;
    li.append(a);
    return li;
}