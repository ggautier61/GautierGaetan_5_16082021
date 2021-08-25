let basketContainer = document.getElementById('basketList');

let basket = [
    { 
        id: "5be1ed3f1c9d44000030b061",
        quantity: 2,
        option: 1
    }
]

basket.push({
    id: '5be1ef211c9d44000030b062',
    quantity: 3,
    option: 1
})

    
localStorage.setItem('basket', JSON.stringify(basket));

let storage = JSON.parse(localStorage.getItem('basket'));


//Création des élément html du panier
storage.forEach(cam => {
    console.log(cam);

    fetch('http://localhost:3000/api/cameras/'+ cam.id)
        .then(response => response.json())
        .then(camera => {
    
            createCardBasket(camera, cam)
            .then();

    
        }).catch(error => console.log(error))


})

function createCardBasket(camera, cam) {

    let card = document.createElement('div');
            card.setAttribute('class', 'row p-3 m-3');
            card.setAttribute('style', 'border: 1px solid gray;');
            basketContainer.appendChild(card);

            let colImage = document.createElement('div');
            colImage.setAttribute('class', 'col-4');
            colImage.setAttribute('style', 'display: flex;justify-content: center;')
            card.appendChild(colImage);
        
            let image = document.createElement('img');
            image.setAttribute('class', 'img-fluid rounded');
            image.setAttribute('src', camera.imageUrl);
            image.setAttribute('alt', 'Image de la caméra');
            image.setAttribute('style', 'height: 85px;');
            colImage.appendChild(image);

            let colDetails = document.createElement('div');
            colDetails.setAttribute('class', 'col-8');
            card.appendChild(colDetails);

            let titre = document.createElement('h5');
            titre.textContent = camera.name;
            colDetails.appendChild(titre);

            let option = document.createElement('p');
            //Rercherche nom de l'option
            console.log(camera.lenses);
            option.textContent = cam.option;
            colDetails.appendChild(option);

            let price = document.createElement('p');
            price.textContent = "Prix: " + (camera.price/100).toFixed(2) + " €";
            colDetails.appendChild(price);

            //Création de la ligne des boutons et quantité

            let rowButton = document.createElement('div');
            rowButton.setAttribute('class', 'row row-button');
            colDetails.appendChild(rowButton);

            let btnMinus = document.createElement('div');
            btnMinus.setAttribute('class', 'col-2 btn-adjust ms-2 me-2');
            btnMinus.setAttribute('type', 'button');
            rowButton.appendChild(btnMinus);

            let iconMinus = document.createElement('i');
            iconMinus.setAttribute('class', 'fas fa-minus');
            btnMinus.appendChild(iconMinus);

            let colQuantite = document.createElement('div');
            colQuantite.setAttribute('class', 'col-8');
            rowButton.appendChild(colQuantite);

            let quantity = document.createElement('input');
            quantity.setAttribute('style', 'text');
            quantity.setAttribute('style', 'width: 100%;height: 100%; text-align: center;');
            quantity.value = cam.quantity;
            colQuantite.appendChild(quantity);


            let btnPlus = document.createElement('div');
            btnPlus.setAttribute('class', 'col-2 btn-adjust ms-2 me-2');
            btnPlus.setAttribute('type', 'button');
            rowButton.appendChild(btnPlus);

            let iconPlus = document.createElement('i');
            iconPlus.setAttribute('class', 'fas fa-plus');
            btnPlus.appendChild(iconPlus);

            let btnDelete = document.createElement('div');
            btnDelete.setAttribute('class', 'btn btn-alert col-2 btn-adjust ms-2 me-2');
            btnDelete.setAttribute('type', 'button');
            rowButton.appendChild(btnDelete);

            let iconDelete = document.createElement('i');
            iconDelete.setAttribute('class', 'fas fa-trash-alt');
            btnDelete.appendChild(iconDelete);
}


//Ajout de l'event click sur les boutons
let buttons = document.querySelectorAll(".btn-adjust");
console.log(buttons);


console.log(storage);
