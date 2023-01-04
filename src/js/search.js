'use strict';

export function redirectToSearchPage(event){
    const searchInput = document.getElementById('searchInput');
    location.href = `../search-items.html?title=${searchInput.value}`;
    event.preventDefault();
}