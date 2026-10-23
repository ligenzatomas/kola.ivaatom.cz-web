function buildZnacka(nazev, type) {
	var color;

	switch (type) {
		case 0:
			color = "blue";
			break;
		case 1:
			color = "black";
			break;
		case 2:
			color = "orange";
			break;
		case 3:
			color = "red";
			break;
		default:
			color = "blue";
			break
	}

	var znacka = JAK.mel("div");
	var obrazek = JAK.mel("img", {src:"./drop-" + color + ".png"});
	znacka.appendChild(obrazek);

	var popisekA = JAK.mel("div", {}, {position:"absolute", left:"0px", top:"3px", textAlign:"center", width:"23px", color:"white", fontWeight:"bold"});
	popisekA.innerHTML = nazev;

	znacka.appendChild(popisekA);

	return znacka;
}

var markers = {
 chvaletice: { text:"A", type: 3, coordA: 15.4188492, coordB: 50.0373814},
 chvaletickaVyhlidka: { text:"B", type: 3, coordA: 15.4276872, coordB: 50.0234478},
 kukuricneBludiste: { text:"C", type: 1, coordA: 15.4305042, coordB: 49.9937092},
 zanikleRybniky: { text: "D", type: 2, coordA: 15.4144253, coordB: 49.9874569},
 skalkaZehusice: { text: "E", type: 1, coordA: 15.3937275, coordB: 49.9743856},
 kamajka: { text: "F", type: 2, coordA: 15.3724961, coordB: 49.9625814},
 kostelZabori: { text: "G", type: 1, coordA: 15.3484461, coordB: 50.0237572},
 oresakCerny: { text: "H", type: 2, coordA: 15.3663417, coordB: 50.0210233},
 pomnikKobylnice: { text: "I", type: 1, coordA: 15.3781236, coordB: 50.0077794},
 vdVeletov: { text: "J", type: 2, coordA: 15.3103714, coordB: 50.0230075},
 svKaterinaKostal: { text: "K", type: 1, coordA: 15.3336850, coordB: 50.0045992},
 zameckyParkKacina: { text: "L", type: 1, coordA: 15.3476508, coordB: 49.9838917},
 plavebniKanalSifovka: { text: "M", type: 1, coordA: 15.2903367, coordB: 50.0014250},
 pomnikyNaPamatkuPozemkovychUprav: { text: "N", type: 1, coordA: 15.2994200, coordB: 49.9787144},
 lipaSvobody: { text: "O", type: 1, coordA: 15.3029439, coordB: 49.9684008},
 turkankZastavka5: { text: "P", type: 2, coordA: 15.2845244, coordB: 49.9765092},
 vrcholKanku: { text: "R", type: 2, coordA: 15.2785839, coordB: 49.9721475},
 komunitniZahrada: { text: "S", type: 1, coordA: 15.2831744, coordB: 49.9602614},
 startCil: { text: "", type: 0, coordA: 15.2717289, coordB: 49.9778822 }
};

_.forEach(markers, (marker) => {
 marker.znacka = buildZnacka(marker.text, marker.type);
});


/***************************************************************/

function buildCoords(a,b) {
 return SMap.Coords.fromWGS84(a,b);
}

_.forEach(markers, (marker) => {
 marker.coords = buildCoords(marker.coordA, marker.coordB);
});

/***************************************************************/

function buildMarker(coords, znacka) {
 return new SMap.Marker(coords, null, {url:znacka});
}

_.forEach(markers, (marker) => {
 marker.marker = buildMarker(marker.coords, marker.znacka);
});

/***************************************************************/
// mapa
var center = SMap.Coords.fromWGS84(15.2878469, 49.9786092);
var m = new SMap(JAK.gel("m"), center, 16);
m.addDefaultLayer(SMap.DEF_TURIST).enable();
//m.addDefaultControls();

var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
m.addControl(mouse);

var keyboard = new SMap.Control.Keyboard(SMap.KB_PAN | SMap.KB_ZOOM); /* Ovládání klávesnicí */
m.addControl(keyboard);

var sync = new SMap.Control.Sync({bottomSpace:0});
m.addControl(sync);

/***************************************************************/
// vrstva
var vrstva = new SMap.Layer.Marker();
m.addLayer(vrstva);
vrstva.enable();

/**************************************************************/
// pridani znacek do vrstvy
_.forEach(markers, (marker) => {
 vrstva.addMarker(marker.marker);
});

