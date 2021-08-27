// Initialiser les containers
let productImage = document.getElementById('product-image');
let productTitle = document.getElementById('product-title');
let productText = document.getElementById('product-text');
let productPrice = document.getElementById('product-price');
let quantityInput = document.getElementById('quantity');
let btnAddBasket = document.getElementById('btn-valid');
let messageBasket = document.getElementById('message-basket');
let selectOption = document.getElementById('selectOption');

let priceArticle = 0;
let cam;
let basket = [];
let articlesStorage = [];

//Récuperer id
let params = new URLSearchParams (document.location.href.split('?')[1]);
let id = params.get("id");

//récupération de tous les articles de la référence sélectionnée
function loadBasket() {
    basket = JSON.parse(localStorage.getItem('basket'));
    if(basket == null) {
        basket = [];
    }
    showMessage(); 
 }
 
 function setBasket() {
     localStorage.setItem('basket', JSON.stringify(basket));
     loadBasket();
 }

 function showMessage() {
    messageBasket.setAttribute('style', "visibility: hidden;");
    if (basket) {
        basket.forEach(art => {
            if(art.id == id && art.option == selectOption.selectedIndex) {
                messageBasket.setAttribute('style', "visibility: visible");
                messageBasket.textContent = 'Vous avez ' + art.quantity + ' article(s) de ce modèle dans votre panier.'
            } 
        })
    }
    
 }

 function AddValuePage(camera) {

    productImage.setAttribute('src',camera.imageUrl);
    productImage.setAttribute('alt',"Image de la caméra " + camera.name);
    productTitle.textContent = camera.name;
    productText.textContent = camera.description;
    productPrice.textContent = "Prix: " + (camera.price/100).toFixed(2) + " €";
    priceArticle = camera.price;

    for (i=0; i<camera.lenses.length; i++) {
        let option = document.createElement("option");
        option.setAttribute('value', i+1);
        option.textContent = camera.lenses[i];
        selectOption.appendChild(option);
    }
}



loadBasket();

//Appel Api getitem by id
fetch('http://localhost:3000/api/cameras/'+ id)
.then(response => response.json())
.then(camera => {
    //Add values to the page
    AddValuePage(camera);  
}).catch(error => console.log(error))

//Add eventListerner bouton ajouter au panier
btnAddBasket.addEventListener('click', function(event) {
    event.preventDefault();
    
    //vérification si lentilles option sélectionné
    if (selectOption.selectedIndex == 0) {
        alert('Veuillez sélectionner un type de lentille.');
    } else {
        
        art = basket.find(art => art.id == id && art.option == selectOption.selectedIndex);

        if(!art) {
            let newArt = {
                id: id,
                option: selectOption.selectedIndex,
                quantity: quantityInput.value,
                price: priceArticle
            }
            
            basket.push(newArt);

        } else {
            //Si l'article est présent dans le panier --> Ajout quantité à la quantité du panier
            art.quantity = Number(art.quantity) + Number(quantityInput.value);
        
        }
        
        setBasket();
    }
})


selectOption.onchange = 
    function() {
        showMessage();                
    }
