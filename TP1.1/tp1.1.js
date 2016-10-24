var itemsPanier = [];

function ajouterItem(idElements) {
	var elements = idElements.split(",");
	var nbItem = document.getElementById(elements[0]).value;
	var radios = [];
	var label;
	var prixItem;
	var listeCondiments = [];
	
	resetTextAreas();
	
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
		
		var item = {item:label, quantite:nbItem, prix:(prixItem*nbItem), condiments:listeCondiments, extra: false, prixUnitaire:prixItem};
		var extra;
		
		if((label === "Lasagne sauce à la viande" || label === "Lasagne végétarienne") && document.getElementById("pepperoni").checked){
			extra = {item:"Surplus pepperoni", quantite:nbItem, prix:(1.99 * nbItem), condiments:[], extra:false, prixUnitaire:1.99};
			item.extra = true;
		}
		
		if((label === "Hamburger" || label === "Cheeseburger") && document.getElementById("bacon").checked){
			extra ={item:"Surplus bacon", quantite:nbItem, prix:(0.99 * nbItem), condiments:[], extra:false, prixUnitaire:0.99};
			item.extra = true;
		}
		
		var index = indexItem(item);
		
		if(index === -1){
			itemsPanier.push(item);
			if(extra != null){
				itemsPanier.push(extra);
			}
		} else {
			itemsPanier[index].quantite = parseInt(itemsPanier[index].quantite) + parseInt(nbItem);
			itemsPanier[index].prix = (itemsPanier[index].prixUnitaire * itemsPanier[index].quantite).toFixed(2);
			if(extra != null){
				itemsPanier[index + 1].quantite = parseInt(itemsPanier[index + 1].quantite) + parseInt(nbItem);
				itemsPanier[index + 1].prix = (itemsPanier[index + 1].prixUnitaire * itemsPanier[index + 1].quantite).toFixed(2);
			}
		}
		
		mettrePanierAJour();
	} else {
		document.getElementById(elements[0]).style.borderColor = "red";
	}
}

function resetTextAreas(){
	var textAreas = document.getElementsByClassName("nbItem");
	
	for(var i = 0; i < textAreas.length; i++){
		textAreas[i].value = 0;
		textAreas[i].style.border = "";
	}
}

function indexItem(nouvelItem){
	var res = -1;
	
	for (var i = 0; i < itemsPanier.length; i++){
		 var item = itemsPanier[i];
		 
		 if(nouvelItem.item === item.item && nouvelItem.extra === item.extra){
		 	var condiments = true;
		 	for (var j = 0; j < item.condiments.length; j++){
		 		if (item.condiments[j] != nouvelItem.condiments[j]){
		 			var condiments = false;
		 			break;
		 		}
		 	}
		 	if(condiments){
		 		res = i;
		 		break;
		 	}
		 }
	}
	
	return res;
}

function viderPanier(){
	resetTextAreas();
	itemsPanier = [];
	mettrePanierAJour();
}

function mettrePanierAJour(){
	var panier = document.getElementById("listeItems");
	panier.innerHTML = "";	
	
	for(var i = 0; i < itemsPanier.length; i++){
		panier.innerHTML += "<img class=\"croixRouge\" src=\"croixRouge.png\" id=\"" + i + "\" onclick=\"supprimerItem(this)\"></img>" +
							"<div class=\"itemListe\">" + itemsPanier[i].item + "</div>" +
							"<div class=\"quantiteItem\">Qté: " + itemsPanier[i].quantite + "</div><br>";
		if(itemsPanier[i].item === "Hamburger" || itemsPanier[i].item === "Cheeseburger"){		
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
	resetTextAreas();
	
	if(item.id < itemsPanier.length - 1){
		var itemSuivant = itemsPanier[(parseInt(item.id) + 1)].item;

		if(itemSuivant === "Surplus pepperoni" || itemSuivant === "Surplus bacon"){
			itemsPanier.splice(parseInt(item.id) + 1, 1);
		}
	}
	
	if(itemsPanier[item.id].item === "Surplus pepperoni" || itemsPanier[item.id].item === "Surplus bacon"){
		itemsPanier[(parseInt(item.id) - 1)].extra = false;
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

function afficherInfos() {
	resetTextAreas();
	
	if(itemsPanier.length > 0){
		document.getElementById("sectionMenu").style.display = "none";
		document.getElementById("sectionFormulaire").style.display = "block";
		document.getElementById("boutonVider").style.display = "none";
		document.getElementById("boutonCommander").style.display = "none";
		
		var croix = document.getElementsByClassName("croixRouge");
		
		for(var i = 0; i < croix.length; i++){
			croix[i].style.display = "none";
		}
	} else {
		alert("Votre panier est vide.");
	}
}

function afficherItineraire() {
	var formulaire = document.getElementById("formulaire");
	var carte = document.getElementById("carte");
	var itineraire = document.getElementById("itineraire");
	
	var adresse = formulaire.elements["adresse1"].value;
	var codePostal = formulaire.elements["codePostal"].value;
	var ville = formulaire.elements["ville"].value;
	
	var url = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyB4KtAaEWeL1K3db3k4ZXAGsRyLhOJ-9l4&origin=145+du+President-Kennedy,+Montreal,+H2X+3Y7&destination=" + adresse + ",+" + ville + ",+" + codePostal + "&avoid=tolls|highways&mode=driving";
	carte.src = url;
	itineraire.style.display = "block";
	carte.style.display = "block";
}
