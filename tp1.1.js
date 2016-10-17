var itemPanier;
var sousTotal = 0.00;

document.addEventListener('DOMContentLoaded', function () {
	itemPanier = document.getElementById("listeItems");
});

function ajouterSpaghetti() {
	var nbSpag = document.getElementById("nbSpag").value;
	var sauceSpag = document.getElementById("sauceViandeSpag").checked;
	var prixSpag;
	
	if(nbSpag > 0) {
		if(sauceSpag){
			spag = "Spaghetti sauve à la viande";
			prixSpag = 12.99 * nbSpag;
		} else {
			spag = "Spaghetti végétarien";
			prixSpag = 10.99 * nbSpag;
		}
		itemPanier.innerHTML += "<div class=\"itemListe\">" + spag + "</div>" +
								"<div class=\"quantiteItem\">" + nbSpag + "</div><br>" +
								"<div class=\"prixItem\">" + prixSpag + "$</div><br><br>";
	}
	
	modifierSousTotal(nbSpag * prixSpag);					 	
}

function modifierSousTotal(ajout) {
	sousTotal += ajout;
	document.getElementById("sousTotal").innerHTML = sousTotal + "$";
	
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
