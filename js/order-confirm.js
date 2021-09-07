let params = new URLSearchParams (document.location.href.split('?')[1]);
let total = params.get("total");
let order = JSON.parse(params.get("order"));
let messageContainer = document.getElementById('message');

let paraph = document.createElement('p');
paraph.innerHTML = "<strong>" + order.contact.firstName + "</strong> toute l'équipe d'OriCamera vous remercie pour votre achat sur notre site de vente en ligne."
let paraph2 = document.createElement('p');
paraph2.innerHTML = "Votre numéro de commande est <strong>" + order.orderId + "</strong> pour un montant total de <strong>" + (total/100).toFixed(2) + "</strong> €."
let paraph3 = document.createElement('p');
paraph3.textContent = "A trés bientôt - L'équipe OriCamera."
messageContainer.appendChild(paraph);
messageContainer.appendChild(paraph2);
messageContainer.appendChild(paraph3);

let btnAccueil = document.createElement('a');
btnAccueil.classList.add('btn');
btnAccueil.setAttribute('style', "justify-content: center;display: flex;border: 1px solid gray;max-width: 250px;");
btnAccueil.href = "../index.html"
btnAccueil.innerHTML = "Retour au shopping";

let div = document.createElement('div');
div.setAttribute('style', 'display: flex; justify-content: center');
div.appendChild(btnAccueil);

messageContainer.appendChild(div);
