
//Initialisation du container
let container = document.getElementById("articles_container");


// Récupération de l'api
fetch('http://localhost:3000/api/cameras')
.then(response => response.json())
.then(arts => {
    // Récupération des articles
    for(let i = 0; i < arts.length; i++){

        // <div class="col-12" style="justify-content: center;display: flex;">
		// 			<div class="card" style="width: 18rem;">
            // 			<img src="./images/vcam_1.jpg" class="card-img-top" alt="Caméra">
            // 			<div class="card-body">
            // 			  <h5 class="card-title">Card title</h5>
            // 			  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            // 			  <a href="#" class="btn btn-primary">Go somewhere</a>
            // 			</div>
		// 		  </div>
		// 		</div>

       
        // Création de la divContainer 
        let divContainer = document.createElement("div");
        divContainer.classList.add("col-12");
        divContainer.classList.add("col-md-6");
        divContainer.setAttribute('style',"display: flex;justify-content: center;margin-top: 15px;margin-bottom: 15px");
        container.appendChild(divContainer);

        //Ajout de la Card
        let divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.setAttribute('style',"width: 18rem;");
        divContainer.appendChild(divCard);

        //Ajout de l'image
        let divImg = document.createElement("img");
        divImg.classList.add("card-img-top");
        divImg.setAttribute('src', arts[i].imageUrl);
        divImg.setAttribute('alt',"Caméra")
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


        

       

        // //Ajout de l'image
        // let imgTeddy = document.createElement("img");
        // imgTeddy.classList.add("card-img");
        // imgTeddy.setAttribute('src', teddies[i].imageUrl);
        // divcontainer.appendChild(imgTeddy);

        // // Ajout du h2
        // let h2Teddy = document.createElement("h2");
        // h2Teddy.classList.add("card-title");
        // h2Teddy.innerHTML = teddies[i].name;
        // divcontainer.appendChild(h2Teddy);

        // //création du lien vers le produit
        // let linkTeddy = document.createElement("a");
        // linkTeddy.classList.add("btn");
        // linkTeddy.classList.add("btn__centre");
        // linkTeddy.href = "html/produit.html?id_ourson="+teddies[i]._id;
        // linkTeddy.innerHTML = " Détails du produit";
        // divcontainer.appendChild(linkTeddy);
    }
}).catch(error => console.log(error))

