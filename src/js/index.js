'use strict';

const tagPromise = loadTags();
const brandPromise = loadBrands();
Promise.all([tagPromise, brandPromise]).then((data) => loadNavbar(data[0], data[1]));

function loadTags(){
    return new Promise(async function(resolve, reject){
        const res = await fetch("http://localhost:8888/tags");
        resolve(res.json());
    });
}

function loadBrands(){
    return new Promise(async function(resolve, reject){
        const res = await fetch("http://localhost:8888/brands");
        resolve(res.json());
    });
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