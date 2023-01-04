'use strict';

import FetchHelper from "./FetchHelper.js";
import { loadNavbar } from "./navbar.js";
import { loadCards } from "./card.js";

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