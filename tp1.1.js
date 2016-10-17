var panier;
var sousTotal = 0.00;
var itemsPanier = [];

document.addEventListener('DOMContentLoaded', function () {
	panier = document.getElementById("listeItems");
});

function ajouterSpaghetti() {
	var nbSpag = document.getElementById("nbSpag").value;
	var sauceSpag = document.getElementById("sauceSpag").checked;
	var prixSpag;
	var spag;
	
	if(nbSpag > 0) {
		if(sauceSpag){
			spag = "Spaghetti sauve à la viande";
			prixSpag = 12.99;
		} else {
			spag = "Spaghetti végétarien";
			prixSpag = 10.99;
		}
		itemsPanier.push({item:spag, quantite:nbSpag, prix:(nbSpag * prixSpag)});
		
		mettrePanierAJour();
	}
	
	document.getElementById("nbSpag").value = 0;				 	
}

function ajouterLasagne() {
	var nbLasagne = document.getElementById("nbLasagne").value;
	var sauceLasage = document.getElementById("sauceLasagne").checked;
	var extra = document.getElementById("extraLasagne").checked;
	var prixLasagne;
	var lasagne;
	
	if(nbLasagne > 0) {
		if(sauceLasage){
			lasagne = "Lasagne sauve à la viande";
			prixLasagne = 14.99;
		} else {
			lasagne = "Lasagne végétarienne";
			prixLasagne = 12.99;
		}
		itemsPanier.push({item:lasagne, quantite:nbLasagne, prix:(nbLasagne * prixLasagne)});
		if(extra){
			itemsPanier.push({item:"Extra pepperoni", quantite:nbLasagne, prix:(1.99 * nbLasagne)});
		}
		
		mettrePanierAJour();
	}
	
	document.getElementById("nbLasagne").value = 0;
	document.getElementById("extraLasagne").checked = false;			 	
}

function ajouterLinguini() {
	var nbLin = document.getElementById("nbLin").value;
	var sauceLin = document.getElementById("sauceLin").checked;
	var prixLin;
	var lin;
	
	if(nbLin > 0) {
		if(sauceLin){
			lin = "Linguini sauce rosée";
			prixLin = 13.99;
		} else {
			lin = "Linguini aux fruits de mer";
			prixLin = 19.99;
		}
		itemsPanier.push({item:lin, quantite:nbLin, prix:(nbLin * prixLin)});
		
		mettrePanierAJour();
	}				 	
	
	nbLin = document.getElementById("nbLin").value = 0;
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
