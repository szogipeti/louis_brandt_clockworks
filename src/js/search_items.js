'use strict';

import FetchHelper from "./FetchHelper";
import { loadNavbar } from "./navbar.js";
import { loadCards } from "./card.js";

let items = new Map();
let brands = new Map();
let tags = new Map();
let imgs = new Map();

onload = onLoad;

async function onLoad(){
    await FetchHelper.read('brands').then(data => brands = data);
    await FetchHelper.read('tags').then(data => tags = data);
    await FetchHelper.read('images').then(data => imgs = data);

    loadNavbar(tags, brands);

    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');
    const brand = urlParams.get('brand');
    let fetchParams = 'items?';
    if(brand != null){
        fetchParams += `brandId=${brands.filter(x=>x.name==brand)[0]['id']}`;
    }
    await FetchHelper.read(fetchParams).then(data => items = data);
    if(tag != null){
        items = items.filter(x=>x.tagIds.includes(tags.filter(x=>x.name==tag)[0]['id']));
    }
    loadCards(items);
}