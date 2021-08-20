// Initialiser les containers

let productImage = document.getElementById('product-image');
let productTitle = document.getElementById('product-title');
let productText = document.getElementById('product-text');
let productPrice = document.getElementById('product-price');
let quantity = document.getElementById('quantity');
let addBasket = document.getElementById('btn-valid');
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
    cam = camera;
    cam_id = cam._id+"_"+selectOption.selectedIndex.toString();
    storageCam = JSON.parse(localStorage.getItem(cam_id));

    productImage.setAttribute('src',camera.imageUrl);
    productImage.setAttribute('alt',"Image de la caméra " + camera.name);

    productTitle.textContent = camera.name;

    productText.textContent = camera.description;

    productPrice.textContent = "Prix: " + (camera.price/100).toFixed(2) + " €";

    for (i=0; i<camera.lenses.length; i++) {
        let option = document.createElement("option");
        option.setAttribute('value', i+1);
        console.log('option', i+1 +' ' + camera.lenses[i]);
        option.textContent = camera.lenses[i];
        selectOption.appendChild(option);
    }

    if (!storageCam) {

        messageBasket.setAttribute('style', "visibility: hidden");
    } else {
        messageBasket.setAttribute('style', "visibility: visible");
    }

  
}).catch(error => console.log(error))



addBasket.addEventListener('click', function(event) {
    event.preventDefault();
    
    //vérification si lentilles option sélectionné
    if (selectOption.selectedIndex == 0) {
        alert('Veuillez sélectionner un type de lentille.');
    } else {       
        
        // let addCamera = {
        //     id: id,
        //     optionproduct: selectOption.selectedIndex.toString(),
        //     quantity: quantity.value
        // }

        if(storageCam) {
            addCamera.quantity = Number(storageCam.quantity)+Number(addCamera.quantity);            
        } 

        localStorage.setItem(id, JSON.stringify(addCamera));
        localStorage.
        console.log(localStorage);

    }
    
})

