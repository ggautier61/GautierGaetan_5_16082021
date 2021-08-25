let basketContainer = document.getElementById('basketList');

// let basket = [
//     { 
//         id: "5be1ed3f1c9d44000030b061",
//         quantity: 2,
//         option: 1
//     }
// ]

// basket.push({
//     id: '5be1ef211c9d44000030b062',
//     quantity: 3,
//     option: 1
// })


// localStorage.setItem('basket', JSON.stringify(basket));

let basket = JSON.parse(localStorage.getItem('basket'));

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
            option.textContent = camera.lenses[cam.option - 1];
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
            btnDelete.setAttribute('id', cam.id);
            rowButton.appendChild(btnDelete);

            let iconDelete = document.createElement('i');
            iconDelete.setAttribute('class', 'fas fa-trash-alt');
            btnDelete.appendChild(iconDelete);

            //Ajout de l'event click sur les boutons
            let buttons = rowButton.querySelectorAll(".btn-adjust");

            buttons.forEach(button => {

                switch (button.firstChild.className) {

                    case 'fas fa-minus':
                        button.addEventListener('click', function(event) {
                            
                            console.log(event);
                            console.log('minus');
                        })                        
                        break;
                    
                    case 'fas fa-plus':
                        button.addEventListener('click', function() {
                            console.log('plus');
                        })
                        break;

                    case 'fas fa-trash-alt':
                        button.addEventListener('click', function() {

                            //suppression de l'article de basket
                            const deletedItemIndex = basket.findIndex(element => element.id == button.id);
                            basket.splice(deletedItemIndex,1);

                            localStorage.setItem('basket', JSON.stringify(basket));
                            window.location.reload();

                        })
                        break;

                    default:
                        console.log('no case');
                        break;
                }
                
            })
            
            // console.log(buttons);
}


//Création des élément html du panier
basket.forEach(cam => {
    console.log(cam);

    fetch('http://localhost:3000/api/cameras/'+ cam.id)
        .then(response => response.json())
        .then(camera => {
    
            createCardBasket(camera, cam);

    
        }).catch(error => console.log(error))

    

})




console.log(basket);
