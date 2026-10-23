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
 menhir2: { text:"A", type: 3, coordA: 15.2878469, coordB: 49.9786092},
 jamaMagdalena: { text:"B", type: 2, coordA: 15.2875178, coordB: 49.9778219},
 turkankZastavkaC5: { text:"C", type: 2, coordA: 15.2845244, coordB: 49.9765092},
 rozcestnikSKrmitkem: { text: "D", type: 1, coordA: 15.2900411, coordB: 49.9699406},
 sprNaVrsich: { text: "E", type: 1, coordA: 15.2886667, coordB: 49.9693394},
 ostrovVKridlovemMori: { text: "F", type: 1, coordA: 15.2890908, coordB: 49.9689092},
 kankSad: { text: "G", type: 1, coordA: 15.2876467, coordB: 49.9687472},
 coRosteNaStepichKanku: { text: "H", type: 2, coordA: 15.2875236, coordB: 49.9679025},
 menhir1: { text: "I", type: 1, coordA: 15.2824683, coordB: 49.9704322},
 nadPramenem: { text: "J", type: 2, coordA: 15.2834906, coordB: 49.9687086},
 komunitniZahrada: { text: "K", type: 3, coordA: 15.2831744, coordB: 49.9602614},
 vrcholKanku: { text: "L", type: 2, coordA: 15.2785839, coordB: 49.9721475},
 komuPatriTatoStopa: { text: "M", type: 1, coordA: 15.2792064, coordB: 49.9710314},
 pastvinaSipsi: { text: "N", type: 1, coordA: 15.2796864, coordB: 49.9671214},
 haldaDoluKuntery: { text: "O", type: 1, coordA: 15.2690197, coordB: 49.9777642},
 sachtaPanskaJama: { text: "P", type: 1, coordA: 15.2707558, coordB: 49.9770189},
 haldaDoluFraty: { text: "R", type: 1, coordA: 15.2719383, coordB: 49.9732494},
 kaplicka: { text: "S", type: 1, coordA: 15.2709503, coordB: 49.9677097},
 umeleHriste: { text: "T", type: 2, coordA: 15.2729839, coordB: 49.9607967},
 sukovHospodar: { text: "U", type: 2, coordA: 15.2626722, coordB: 49.9733436},
 sukovPanorama: { text: "V", type: 3, coordA: 15.2628328, coordB: 49.9672983},
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

