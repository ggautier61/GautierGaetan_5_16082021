// Initialiser les containers

let cardImage = document.getElementById('card-image');
let cardTitle = document.getElementById('card-title');
let cardText = document.getElementById('card-text');
let cardPrice = document.getElementById('card-price');
let selectOption = document.getElementById('selectOption');


//Récuperer id
let params = new URLSearchParams (document.location.href.split('?')[1]);
let id = params.get("id");
console.log(id);
fetch('http://localhost:3000/api/cameras/'+ id)
.then(response => response.json())
.then(camera => {
    console.log(camera);
    cardImage.setAttribute('src',camera.imageUrl);
    cardImage.setAttribute('alt',"Image de la caméra " + camera.name);

    cardTitle.textContent = camera.name;
    cardText.textContent = camera.description;
    cardPrice.textContent = (camera.price/100).toFixed(2) + " €";

    for (i=0; i<camera.lenses.length; i++) {
        let option = document.createElement("option");
        option.setAttribute('value', i+1);
        console.log('option', i+1 +' ' + camera.lenses[i]);
        option.textContent = camera.lenses[i];
        selectOption.appendChild(option);
    }





    
}).catch(error => console.log(error))

