// Initialiser les containers
let productImage = document.getElementById('product-image');
let productTitle = document.getElementById('product-title');
let productText = document.getElementById('product-text');
let productPrice = document.getElementById('product-price');
let quantityInput = document.getElementById('quantity');
let btnAddBasket = document.getElementById('btn-valid');
let messageBasket = document.getElementById('message-basket');
let selectOption = document.getElementById('selectOption');
let cam;
let cam_id;
let storageCam;



//Récuperer id
let params = new URLSearchParams (document.location.href.split('?')[1]);
let id = params.get("id");

//récupération de tous les articles de la référence sélectionnée
let basket = JSON.parse(localStorage.getItem('basket'));
let articlesStorage = [];

basket.forEach(art => {
    if (art.id == id) {
        articlesStorage.push(art);
    }
})

function LoadBasket() {
    basket = JSON.parse(localStorage.getItem('basket'));
}


//Appel Api getitem by id
fetch('http://localhost:3000/api/cameras/'+ id)
.then(response => response.json())
.then(camera => {

    //Add values to the page
    AddValuePage(camera);  
  
}).catch(error => console.log(error))



btnAddBasket.addEventListener('click', function(event) {
    event.preventDefault();
    
    //vérification si lentilles option sélectionné
    if (selectOption.selectedIndex == 0) {
        alert('Veuillez sélectionner un type de lentille.');
    } else {
        let art = articlesStorage.find(art => art.option == selectOption.selectedIndex);
        console.log(art);

        if (!art) {
            //si l'article/option n'est pas dans le panier --> Ajout nouvel article
            let newArt = {
                id: id,
                option: selectOption.selectedIndex,
                quantity: quantityInput.value
            }

            basket.push(newArt);
        } else {
            //Si l'article est présent dans le panier --> Ajout quantité à la quantité du panier
            art.quantity = Number(art.quantity) + Number(quantityInput.value);
        }

        localStorage.setItem('basket', JSON.stringify(basket));
        // searchStorage();        
        console.log(localStorage);

    }
    
})

selectOption.onchange = 
    function() {
        messageBasket.setAttribute('style', "visibility: hidden;");
        articlesStorage.forEach(art => {
            if(art.option == selectOption.selectedIndex) {
                messageBasket.setAttribute('style', "visibility: visible");
                messageBasket.textContent = 'Vous avez ' + art.quantity + ' article(s) de ce modèle dans votre panier.'
            } 
        })
                
    }



// function searchStorage() {
    
    
//         if (!basket) {

//             messageBasket.setAttribute('style', "visibility: hidden");
//         } else {
//             messageBasket.setAttribute('style', "visibility: visible");
//             messageBasket.textContent = 'Vous avez ' + storageCam.quantity + ' article(s) de ce modèle dans votre panier.'
//         }
// }

function AddValuePage(camera) {

    productImage.setAttribute('src',camera.imageUrl);
    productImage.setAttribute('alt',"Image de la caméra " + camera.name);
    productTitle.textContent = camera.name;
    productText.textContent = camera.description;
    productPrice.textContent = "Prix: " + (camera.price/100).toFixed(2) + " €";

    for (i=0; i<camera.lenses.length; i++) {
        let option = document.createElement("option");
        option.setAttribute('value', i+1);
        option.textContent = camera.lenses[i];
        selectOption.appendChild(option);
    }
}