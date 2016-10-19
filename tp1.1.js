var panier;
var sousTotal = 0.00;
var itemsPanier = [];

document.addEventListener('DOMContentLoaded', function () {
	panier = document.getElementById("listeItems");
});

function ajouterPates(idElements) {
	var elements = idElements.split(",");
	var nbPates = document.getElementById(elements[2]).value;
	var radios = [elements[0], elements[1]];
	var label;
	var prixItem;
	
	if(nbPates > 0){
		for(var i = 0; i < radios.length; i++){
			var radio = document.getElementById(radios[i]);
			if(radio.checked){
				label = radio.getAttribute("label");
				prixItem = radio.getAttribute("prix");
				break;			
			}
		}
		itemsPanier.push({item:label, quantite:nbPates, prix:(prixItem*nbPates)});
		if(elements.length === 4){
			if(document.getElementById(elements[3]).checked){
				itemsPanier.push({item:"Extra pepperoni", quantite:nbPates, prix:(1.99 * nbPates)});
			}
		}	
		mettrePanierAJour();
		document.getElementById(elements[2]).value = 0;
	}
}

function mettrePanierAJour(){
	panier.innerHTML = "";
	
	for(var i = 0; i < itemsPanier.length; i++){
		panier.innerHTML += "<img class=\"croixRouge\" src=\"croixRouge.png\" id=\"" + i + "\" onclick=\"supprimerItem(this)\"></img>" +
							"<div class=\"itemListe\">" + itemsPanier[i].item + "</div>" +
							"<div class=\"quantiteItem\">" + itemsPanier[i].quantite + "</div><br>" +
							"<div class=\"prixItem\">" + itemsPanier[i].prix + "$</div><br><br>";
	}
	
	modifierSousTotal();	
}

function supprimerItem(item){	
	if((itemsPanier.length > (parseInt(item.id) + 1)) && (itemsPanier[parseInt(item.id) + 1].item === "Extra pepperoni")){
		itemsPanier.splice(parseInt(item.id) + 1, 1);
	}
	itemsPanier.splice(item.id, 1);
	mettrePanierAJour();
}

function modifierSousTotal() {
	sousTotal = 0.00;
	
	for(var i = 0; i < itemsPanier.length; i++){
		sousTotal += itemsPanier[i].prix;
	}
	document.getElementById("sousTotal").innerHTML = sousTotal.toFixed(2) + "$";
	
	modififerTaxes();
}

function modififerTaxes(){
	var tps = parseFloat(Math.round(sousTotal * 0.05 * 100) / 100).toFixed(2);
	var tvq = parseFloat(Math.round(sousTotal * 0.09975 * 100) / 100).toFixed(2);
	var total = parseFloat(sousTotal) + parseFloat(tps) + parseFloat(tvq);

	document.getElementById("TPS").innerHTML = tps + "$";
	document.getElementById("TVQ").innerHTML = tvq + "$";
	document.getElementById("montantTotal").innerHTML = total.toFixed(2) + "$";
}
