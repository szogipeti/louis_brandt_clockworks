'use strict';

let itemIds = [];

Promise.all([fetchIds()]).then((data) => itemIds = data[0]);

Promise.all([fetchItems()]).then((data) => loadItems(data[0]));

function fetchIds(){
    return new Promise(async function(resolve, reject){
        const res = await fetch("http://localhost:8888/shopping_cart_item_ids");

        resolve(res.json());
    
    });
}


function fetchItems(){
    return new Promise(async function(resolve, reject){
        const res = await fetch("http://localhost:8888/items");

        resolve(res.json());
    });
}


function loadItems(items){


    
    const itemContainer = document.querySelector('#item-container');

    for(const item of items){

        let a = !itemIds.includes(item.id);
        if( a ){
            continue;
        }

        const template = document.getElementsByTagName("template")[0];

        const templateContent = template.content.querySelector("a");

        let templateCopy = document.importNode(templateContent,true);

        templateCopy.querySelector("img").setAttribute("src", "src/img/" + "wristwatch-1.jpg");
    
        templateCopy.querySelector("h5").innerHTML = item.title;
    
        templateCopy.querySelector("h6").innerHTML = item.brandId;
       
        templateCopy.querySelector("p").innerHTML = item.description;
       
        
        /*
        const badges = templateCopy.getElementById("badge-container");

        for(const tagId of item.tagIds){
            const p = document.createElement('p');
            p.classList.add('badge',  'bg-secondary');
            p.innerHTML = "Férfiú";
            badges.appendChild(p);
        }
        */


      //  templateCopy.getElementById("price").innerHTML = item.price + " " + item.currency;

        
        
        itemContainer.appendChild(templateCopy);

        /*
        const card = document.createElement('a');
        card.classList.add('card', "m-4", "shadow-lg", "text-dark", "w-75", "mx-auto");
        card.setAttribute("href", "item_page.html");
        
        const row = document.createElement('div');
        row.classList.add('row');
    
        const col3 = document.createElement('div');
        col3.classList.add('col-3');
    
        const img = document.createElement('img');
        img.classList.add('card-img');
        img.setAttribute("id", "purchase-item-image");
        img.setAttribute("src", "src/img/" + "wristwatch-1.jpg");
    
        col3.appendChild(img);
    
    
        const col9 = document.createElement('div');
        col9.classList.add('col-9');
    
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
    
        const h5 = document.createElement('h5');
        h5.classList.add('card-title');
        h5.innerHTML = "Watch numero uno";
    
        const h6 = document.createElement('h6');
        h6.classList.add('card-title');
        h6.innerHTML = "Rolex";
    
    
        const p = document.createElement('p');
        p.classList.add('card-text');
        p.innerHTML = "Lefjobb ora";
    
        const badges = document.createElement('div');
        badges.classList.add('text-dark');
        badges.setAttribute("id", "badge-container");
    
        const p1 = document.createElement('p');
        p1.classList.add('badge',  'bg-secondary');
        p1.innerHTML = "Férfiú";
    
        const p2 = document.createElement('p');
        p2.classList.add('badge',  'bg-secondary');
        p2.innerHTML = "Elegáns";
    
    
        const p3 = document.createElement('p');
        p3.classList.add('card-text', 'text-end');
        p3.innerHTML = "2000 USD";
    
    
        badges.appendChild(p1);
        badges.appendChild(p2);
    
        cardBody.appendChild(h5);
        cardBody.appendChild(h6);
        cardBody.appendChild(p);
        cardBody.appendChild(badges);
        cardBody.appendChild(p3);

        col9.append(cardBody);
    
        row.appendChild(col3);
        row.appendChild(col9);
        card.appendChild(row);
    
        itemContainer.appendChild(card);
        */
    }

    
   
}