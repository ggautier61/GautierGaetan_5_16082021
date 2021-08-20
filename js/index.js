
//Initialisation du container
let container = document.getElementById("articles_container");


// Récupération de l'api
fetch('http://localhost:3000/api/cameras')
.then(response => response.json())
.then(arts => {
    // Récupération des articles. Boucle pour création éléments html
    for(let i = 0; i < arts.length; i++){
       
        // Création de la divContainer 
        let divContainer = document.createElement("div");
        divContainer.classList.add("col-12");
        divContainer.classList.add("col-md-6");
        divContainer.setAttribute('style',"display: flex;justify-content: center;margin-top: 15px;margin-bottom: 15px");
        container.appendChild(divContainer);

        //Ajout de la Card
        let divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.setAttribute('style',"width: 18rem;border-radius: 15px;box-shadow: 0px 5px 10px #F3E9F1;");
        divContainer.appendChild(divCard);

        //Ajout de l'image
        let divImg = document.createElement("img");
        divImg.classList.add("card-img-top");
        divImg.setAttribute('src', arts[i].imageUrl);
        divImg.setAttribute('alt',"Caméra");
        divImg.setAttribute('style', "border-top-left-radius: 15px;border-top-right-radius: 15px;")
        divCard.appendChild(divImg);

        //Ajout div Card Body
        let divCardBoby = document.createElement("div");
        divCardBoby.classList.add("card-body");
        divCard.appendChild(divCardBoby);

        //Ajout titre
        let divTitre = document.createElement("h5");
        divTitre.classList.add('card-title');
        divTitre.textContent = arts[i].name;
        divCardBoby.appendChild(divTitre);

        //Ajout Prix
        let prix = document.createElement("p");
        // prix.textContent = new Intl.NumberFormat('fr').format((arts[i].price/100).toFixed(2)) + " €";
        prix.textContent = (arts[i].price/100).toFixed(2) + " €";
        divCardBoby.appendChild(prix);

        //Ajout bouton Détails
        let btnDetails = document.createElement("a")
        btnDetails.classList.add("btn");
        btnDetails.setAttribute('style', "justify-content: center;display: flex;border: 1px solid gray;")
        btnDetails.href = "views/products.html?id="+arts[i]._id;
        btnDetails.innerHTML = " Détails de la caméra";
        divCardBoby.appendChild(btnDetails);
    }
}).catch(error => console.log(error))

