// Initialiser les containers

let productImage = document.getElementById('product-image');
let productTitle = document.getElementById('product-title');
let productText = document.getElementById('product-text');
let productPrice = document.getElementById('product-price');
let selectOption = document.getElementById('selectOption');


//Récuperer id
let params = new URLSearchParams (document.location.href.split('?')[1]);
let id = params.get("id");
console.log(id);
fetch('http://localhost:3000/api/cameras/'+ id)
.then(response => response.json())
.then(camera => {
    console.log(camera);
    productImage.setAttribute('src',camera.imageUrl);
    productImage.setAttribute('alt',"Image de la caméra " + camera.name);

    productTitle.textContent = camera.name;

    productText.textContent = camera.description;
    
    productPrice.textContent = (camera.price/100).toFixed(2) + " €";

    for (i=0; i<camera.lenses.length; i++) {
        let option = document.createElement("option");
        option.setAttribute('value', i+1);
        console.log('option', i+1 +' ' + camera.lenses[i]);
        option.textContent = camera.lenses[i];
        selectOption.appendChild(option);
    }





    
}).catch(error => console.log(error))

