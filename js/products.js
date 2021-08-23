// Initialiser les containers

let productImage = document.getElementById('product-image');
let productTitle = document.getElementById('product-title');
let productText = document.getElementById('product-text');
let productPrice = document.getElementById('product-price');
let quantity = document.getElementById('quantity');
let btnAddBasket = document.getElementById('btn-valid');
let messageBasket = document.getElementById('message-basket');
let selectOption = document.getElementById('selectOption');
let cam;
let cam_id;
let storageCam;



//Récuperer id
let params = new URLSearchParams (document.location.href.split('?')[1]);
let id = params.get("id");
console.log(id);

fetch('http://localhost:3000/api/cameras/'+ id)
.then(response => response.json())
.then(camera => {

    //Add values in page
    productImage.setAttribute('src',camera.imageUrl);
    productImage.setAttribute('alt',"Image de la caméra " + camera.name);
    productTitle.textContent = camera.name;
    productText.textContent = camera.description;
    productPrice.textContent = "Prix: " + (camera.price/100).toFixed(2) + " €";

    for (i=0; i<camera.lenses.length; i++) {
        let option = document.createElement("option");
        option.setAttribute('value', i+1);
        // console.log('option', i+1 +' ' + camera.lenses[i]);
        option.textContent = camera.lenses[i];
        selectOption.appendChild(option);
    }
    

    // value to cam to prepare the click
    cam = {
        id: camera._id + "_" + selectOption.selectedIndex,
        option: selectOption.selectedIndex.toString(),
        quantity: quantity.value,
        prix: camera.price.toString()
    };

    if (cam.option == 0) {
        messageBasket.setAttribute('style', "visibility: hidden");
    } else {
        searchStorage();
    }   
  
}).catch(error => console.log(error))



btnAddBasket.addEventListener('click', function(event) {
    event.preventDefault();
    
    //vérification si lentilles option sélectionné
    if (selectOption.selectedIndex == 0) {
        alert('Veuillez sélectionner un type de lentille.');
    } else {       

        if(storageCam) {
            cam.quantity = (Number(storageCam.quantity) + Number(quantity.value)).toString();            
        } else {
            cam.quantity = quantity.value;
        }

        localStorage.setItem(cam.id, JSON.stringify(cam));
        searchStorage();        
        console.log(localStorage);

    }
    
})

selectOption.onchange = 
    function() {
        cam.id = id + "_" + selectOption.selectedIndex;
        cam.option = selectOption.selectedIndex.toString();

        searchStorage();
        
    }



function searchStorage() {
    storageCam = JSON.parse(localStorage.getItem(cam.id));
        if (!storageCam) {

            messageBasket.setAttribute('style', "visibility: hidden");
        } else {
            messageBasket.setAttribute('style', "visibility: visible");
            messageBasket.textContent = 'Vous avez ' + storageCam.quantity + ' article(s) de ce modèle dans votre panier.'
        }
}
