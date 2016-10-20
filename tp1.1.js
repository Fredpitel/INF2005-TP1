var panier;
var sousTotal = 0.00;
var itemsPanier = [];

document.addEventListener('DOMContentLoaded', function () {
	panier = document.getElementById("listeItems");
});

function ajouterItem(idElements) {
	var elements = idElements.split(",");
	var nbItem = document.getElementById(elements[0]).value;
	var radios = [];
	var label;
	var prixItem;
	var listeCondiments = [];
	
	if(nbItem > 0){
		for(var i = 1; i < elements.length; i++){
			radios.push(elements[i]);	
		}
		
		for(var i = 0; i < radios.length; i++){
			var radio = document.getElementById(radios[i]);
			if(radio.checked){
				label = radio.getAttribute("label");
				prixItem = radio.getAttribute("prix");
				break;			
			}
		}
		
		if(label === "Hamburger" || label === "Cheeseburger"){
			var elemCondiments = document.getElementsByClassName('condiment');
			
			for(var i = 0; i < elemCondiments.length; i++){
				if(elemCondiments[i].checked){
					listeCondiments.push(elemCondiments[i].id);
				}
			}
		}
		
		itemsPanier.push({item:label, quantite:nbItem, prix:(prixItem*nbItem), condiments:listeCondiments});
		
		if((label === "Lasagne sauce à la viande" || label === "Lasagne végétarienne") && document.getElementById("SurplusLasagne").checked){
			itemsPanier.push({item:"Surplus pepperoni", quantite:nbItem, prix:(1.99 * nbItem), condiments:[]});
		}
		
		if((label === "Hamburger" || label === "Cheeseburger") && document.getElementById("bacon").checked){
			itemsPanier.push({item:"Surplus bacon", quantite:nbItem, prix:(0.99 * nbItem), condiments:[]});
		}
		
		mettrePanierAJour();
		document.getElementById(elements[0]).value = 0;
	}
}

function viderPanier(){
	itemsPanier = [];
	mettrePanierAJour();
}

function mettrePanierAJour(){
	panier.innerHTML = "";
	
	for(var i = 0; i < itemsPanier.length; i++){
		panier.innerHTML += "<img class=\"croixRouge\" src=\"croixRouge.png\" id=\"" + i + "\" onclick=\"supprimerItem(this)\"></img>" +
							"<div class=\"itemListe\">" + itemsPanier[i].item + "</div>" +
							"<div class=\"quantiteItem\">Qté: " + itemsPanier[i].quantite + "</div><br>";
		if(itemsPanier[i].item === "Hamburger" || itemsPanier[i].item === "Cheeseburger"){
			console.log(itemsPanier[i]);			
			condiments = itemsPanier[i].condiments;
			if(condiments.length > 0){
				panier.innerHTML += "<div class=\"condiment\">";
				for(var j = 0; j < condiments.length - 1; j ++){
					panier.innerHTML += condiments[j] + ", ";
				}
				panier.innerHTML += condiments[condiments.length - 1] + "</div>";
			}
		}
		panier.innerHTML +=	"<div class=\"prixItem\">" + itemsPanier[i].prix + "</div><br><br>";
	}
	
	modifierSousTotal();	
}

function supprimerItem(item){	
	var itemSuivant = (itemsPanier.length > (parseInt(item.id) + 1)) && (itemsPanier[parseInt(item.id) + 1].item);
	
	if(itemSuivant === "Surplus pepperoni" || itemSuivant === "Surplus bacon"){
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
	document.getElementById("sousTotal").innerHTML = sousTotal.toFixed(2) + " $";
	
	modififerTaxes();
}

function modififerTaxes(){
	var tps = parseFloat(Math.round(sousTotal * 0.05 * 100) / 100).toFixed(2);
	var tvq = parseFloat(Math.round(sousTotal * 0.09975 * 100) / 100).toFixed(2);
	var total = parseFloat(sousTotal) + parseFloat(tps) + parseFloat(tvq);

	document.getElementById("TPS").innerHTML = tps + " $";
	document.getElementById("TVQ").innerHTML = tvq + " $";
	document.getElementById("montantTotal").innerHTML = total.toFixed(2) + " $";
}
