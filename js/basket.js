let basketContainer = document.getElementById('basketList');
let amount = document.getElementById('totalAmount');
let validButton = document.getElementById('valid-button');
let totalAmount = 0;

function loadBasket() {
   basket = JSON.parse(localStorage.getItem('basket')); 
}

function setBasket() {
    localStorage.setItem('basket', JSON.stringify(basket));
    loadBasket();
}

function createCardBasket(camera, cam) {

    let card = document.createElement('div');
    card.setAttribute('id', cam.id + '_' + cam.option);
    card.setAttribute('class', 'row p-2 mb-3');
    card.setAttribute('style', 'border: 1px solid gray;max-width: 900px;width: 100%;');
    basketContainer.appendChild(card);

    let colImage = document.createElement('div');
    colImage.setAttribute('class', 'col-5');
    colImage.setAttribute('style', 'justify-content: center;display: flex;align-items: center;');
    card.appendChild(colImage);

    let image = document.createElement('img');
    image.setAttribute('class', 'img-fluid rounded');
    image.setAttribute('src', camera.imageUrl);
    image.setAttribute('alt', 'Image de la :caméra');
    image.setAttribute('style', 'min-height: 100px;max-width: inherit;object-fit: cover;min-width: 100px;max-height: 130px;');
    colImage.appendChild(image);

    let colDetails = document.createElement('div');
    colDetails.setAttribute('class', 'col-7');
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
    btnMinus.setAttribute('class', 'btn-adjust');
    btnMinus.setAttribute('type', 'button');
    btnMinus.setAttribute('style', 'max-width: 26px;margin-right: 10px;');
    btnMinus.setAttribute('id', 'minBtn_' + cam.id + '_' + cam.option);
    rowButton.appendChild(btnMinus);

    let iconMinus = document.createElement('i');
    iconMinus.setAttribute('class', 'fas fa-minus');
    btnMinus.appendChild(iconMinus);

    let colQuantite = document.createElement('div');
    colQuantite.setAttribute('style', 'display: flex;padding: 0px;margin-right: 10px;justify-content: center;max-width: 60px;');
    rowButton.appendChild(colQuantite);

    let quantity = document.createElement('input');
    quantity.setAttribute('style', 'text');
    quantity.setAttribute('style', 'text-align: center;width: 100%;');
    quantity.setAttribute('id', 'Qty_' + cam.id + '_' + cam.option);
    quantity.value = cam.quantity;
    colQuantite.appendChild(quantity);


    let btnPlus = document.createElement('div');
    btnPlus.setAttribute('class', 'btn-adjust');
    btnPlus.setAttribute('style', 'max-width: 26px;margin-right: 10px;');
    btnPlus.setAttribute('type', 'button');
    btnPlus.setAttribute('id', 'plusBtn_' + cam.id + '_' + cam.option);
    rowButton.appendChild(btnPlus);

    let iconPlus = document.createElement('i');
    iconPlus.setAttribute('class', 'fas fa-plus');
    btnPlus.appendChild(iconPlus);

    let btnDelete = document.createElement('div');
    btnDelete.setAttribute('class', 'btn-adjust');
    btnDelete.setAttribute('style', 'max-width: 26px;margin-right: 10px;');
    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('id', 'delBtn_' + cam.id + '_' + cam.option);
    rowButton.appendChild(btnDelete);

    let iconDelete = document.createElement('i');
    iconDelete.setAttribute('class', 'fas fa-trash-alt');
    btnDelete.appendChild(iconDelete);

    //Ajout de l'event click sur les boutons
    let buttons = rowButton.querySelectorAll(".btn-adjust");

    buttons.forEach(button => {

        switch (button.firstChild.className) {

            case 'fas fa-minus':
                button.addEventListener('click', function() {
                    basket.find(element => {
                        if(element.id == button.id.split('_')[1] && element.option == cam.option) {
                            if(element.quantity > 1) {
                                element.quantity--;
                                document.getElementById('Qty_' + element.id + '_' + element.option).value = element.quantity;
                                setBasket();

                                //recalcul du montant total
                                totalAmount -= element.price;
                                amount.textContent = 'Le montant total de votre panier est de ' + (totalAmount/100).toFixed(2) + ' €';
                            }
                        }
                    });                      
                })                        
                break;
            
            case 'fas fa-plus':
                button.addEventListener('click', function() {
                    basket.find(element => {
                        if(element.id == button.id.split('_')[1] && element.option == cam.option) {
                                element.quantity++;
                                document.getElementById('Qty_' + element.id + '_' + element.option).value = element.quantity;
                                setBasket();
                                totalAmount += element.price;
                                amount.textContent = 'Le montant total de votre panier est de ' + (totalAmount/100).toFixed(2) + ' €';
                        }
                    });        
                })
                break;

            case 'fas fa-trash-alt':
                button.addEventListener('click', function() {
                    //suppression de l'article de basket
                    const deletedItem = basket.find(element => element.id == button.id.split('_')[1] && element.option == cam.option);
                    
                    basket.splice(basket.findIndex(element => element.id == button.id.split('_')[1] && element.option == cam.option),1);
                    setBasket();

                    //supression du div correspond
                    let deleteDiv = document.getElementById(deletedItem.id + '_' + deletedItem.option);
                    basketContainer.removeChild(deleteDiv);

                    //Recalcul du montant total
                    totalAmount -= deletedItem.quantity * deletedItem.price;
                    amount.textContent = 'Le montant total de votre panier est de ' + (totalAmount/100).toFixed(2) + ' €';

                })
                break;

            default:
                break;
        }
    })
 
}

//Création des élément html du panier
function init() {
    loadBasket();
    basket.forEach(cam => {
        fetch('http://localhost:3000/api/cameras/'+ cam.id)
            .then(response => response.json())
            .then(camera => {
    
                createCardBasket(camera, cam);
                totalAmount += camera.price * cam.quantity;
                amount.textContent = 'Le montant total de votre panier est de ' + (totalAmount/100).toFixed(2) + ' €';
            }).catch(error => console.log(error))
        
    });  
}

init();

validButton.addEventListener('click', function(event) {
    event.preventDefault();



    console.log('validation commande');
})


