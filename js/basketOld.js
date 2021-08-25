// import { Customer } from "../class/customer";
// const Customer = require('../class/customer');

class Customer {

    constructor(firstname, lastname, address, postalCode, city, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.postalCode = postalCode;
        this.city = city;
        this.email = email;
        
    }

}

let cameras = function() {
    for (const camera in localStorage) {
        if (object.hasOwnProperty camera)) {localStorage       const element = object camera];
 localStorage     
        }
    }
};

let main = document.querySelector('main');
let modele = document.getElementById('modele');
let btnDelete = document.getElementById('btn-delete');
let btnDeteleArray = [];
let montantTotal = 0;

let creation = new Promise((resolve, reject) => {

    let result = createCard();

    resolve(result);

    }).then((value) => {

        console.log('value', value);

    //Calcul montant total
    let row = document.createElement('div');
    row.setAttribute('class', 'row p-3 m-3');
    let p = document.createElement('p');    
    p.textContent = 'Total de la commande: ' +(calculMontant()/100).toFixed(2) + " € TTC";
    row.appendChild(p);

    //ajout bouton Valider Panier
    // let btnvalid = document.createElement('div');
    // btnvalid.setAttribute('id', 'btn-valid');
    // btnvalid.setAttribute('class', 'btn btn-success');
    // btnvalid.setAttribute('type', 'submit');
    // btnvalid.textContent = 'Passer commande';
    // row.appendChild(btnvalid);
    main.appendChild(row);

    let btnvalid = document.getElementById('valid-button');

    btnvalid.onclick = function(event) {
        console.log(event);
        event.defaultPrevented;
        console.log('commande validée');

        let contact = new Customer(
            document.getElementById('firstname').value,
            document.getElementById('lastname').value,
            document.getElementById('address').value,
            document.getElementById('postalcode').value,
            document.getElementById('city').value,
            document.getElementById('email').value
        );


        let order = {
            contact: contact,
            products: []
        }

        console.log(order);

        fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            boby: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(response=> {
            console.log(response);

        })
    }

})


addEventListernerBtn();
deleteCardModele();


function createCard() {

    for(let i=0; i<localStorage.length; i++) {

        const id = localStorage.key(i).split('_')[0];
    
        fetch('http://localhost:3000/api/cameras/'+ id)
        .then(response => response.json())
        .then(camera => {
    
            let divLigneCam = modele.cloneNode(true);
            divLigneCam.setAttribute('id', localStorage.key(i));
    
            //Image
            let image = divLigneCam.getElementsByClassName('img-fluid');
            image[0].setAttribute('src', camera.imageUrl);
    
            //Titre
            divLigneCam.getElementsByClassName('col-8')[0].querySelector('h5').textContent = camera.name;
    
            //Recupération de ligne option dans la page
            let option = divLigneCam.getElementsByClassName('col-8')[0].getElementsByClassName('card-text')[0];
    
            //Recupération de la collection en cours dans localStorage
            let storageCam = JSON.parse(localStorage.getItem(localStorage.key(i)));
    
            //Option
            option.textContent = camera.lenses[Number(storageCam.option) - 1];
    
            //Price
            divLigneCam.getElementsByClassName('col-8')[0].getElementsByClassName('card-text')[1].textContent = "Prix: " + (camera.price/100).toFixed(2) + " €";
    
            //Quantité
            let input = divLigneCam.getElementsByClassName('col-8')[1].querySelector('input');
            input.value = storageCam.quantity;
            // montantTotal += Number(camera.price) * storageCam.quantity;
            // console.log(montantTotal);

            //Bouton Delete
            
            const name = 'btn-delete-' + storageCam.id;
            btnDelete.setAttribute('id', name);
            btnDeteleArray.push(name);
            
            main.appendChild(divLigneCam);                
    
        }).catch(error => console.log(error))
    }  
    
    return true;
  
}

function addEventListernerBtn() {
    console.log('Array.length', btnDeteleArray.length);
    console.log(btnDeteleArray);

    for(let i=0; i<btnDeteleArray.length; i++) {
        console.log('on passe ici');
    }




    // btnDeteleArray.forEach(id => {
        
    //     document.getElementById(id).addEventListener('click', function(event) {
    //         console.log(event);
    //     })
    // });
    // console.log(id);
    // let btnfind = document.getElementById(id);
    // btnfind.addEventListener('click', function(event) {
    //     console.log(event);
    // })

    
}

function deleteCardModele() {
   main.removeChild(modele); 
}

function deleteCard() {

    //Il faut récupérer l'id du div parent par rapport au btn click



}

function calculMontant() {

    let montant = 0;

    for(let i=0; i<localStorage.length; i++) {

         //Recupération de la collection en cours dans localStorage
         let storageCam = JSON.parse(localStorage.getItem(localStorage.key(i)));
         
        montant += Number(storageCam.prix) * Number(storageCam.quantity);

    }

    return montant;
}

function getCameras() {



}

function getCamera(id) {

    fetch('http://localhost:3000/api/cameras/'+ id)
        .then(response => response.json())
        .then(camera => {
            return camera;
        }).catch(error => console.log(error))

}



