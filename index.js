function buildZnacka(nazev, type) {
	var color;

	switch (type) {
		case 0:
			color = "yellow";
			break;
		case 1:
			color = "black";
			break;
		case 2:
			color = "blue";
			break;
		case 3:
			color = "orange";
			break;
		case 4:
			color = "red";
			break;
		default:
			color = "blue";
			break
	}

	var znacka = JAK.mel("div", null, {"z-index": 3});
	var obrazek = JAK.mel("img", {src:"./drop-" + color + ".png"}, {"z-index": 3});
	znacka.appendChild(obrazek);

	var popisekA = JAK.mel("div", {}, {position:"absolute", left:"0px", top:"3px", textAlign:"center", width:"23px", color:"white", fontWeight:"bold"});
	popisekA.innerHTML = nazev;

	znacka.appendChild(popisekA);

	return znacka;
}

var markers = {
 0: { text:"S", type: 0, coordA: 15.2717550, coordB: 49.9778983},
 1: { text:"1", type: 1, coordA: 15.2729353, coordB: 49.9710661},
 2: { text:"2", type: 1, coordA: 15.2670694, coordB: 49.9759342},
 3: { text:"3", type: 1, coordA: 15.2739747, coordB: 49.9790250},
 4: { text:"4", type: 1, coordA: 15.2822908, coordB: 49.9718469},
 5: { text:"5", type: 1, coordA: 15.2663933, coordB: 49.9693992},
 6: { text:"6", type: 2, coordA: 15.2800567, coordB: 49.9608778},
 7: { text:"7", type: 2, coordA: 15.2693169, coordB: 49.9604103},
 8: { text:"8", type: 2, coordA: 15.2661789, coordB: 49.9543047},
 9: { text:"9", type: 2, coordA: 15.2520919, coordB: 49.9491083},
 10: { text:"10", type: 2, coordA: 15.2903992, coordB: 49.9503564},
 11: { text:"11", type: 2, coordA: 15.2704436, coordB: 49.9452300},
 12: { text:"12", type: 3, coordA: 15.3045131, coordB: 49.9327822},
 13: { text:"13", type: 3, coordA: 15.2524675, coordB: 49.9276589},
 14: { text:"14", type: 3, coordA: 15.3542278, coordB: 49.9259972},
 15: { text:"15", type: 3, coordA: 15.3768978, coordB: 49.9062014},
 16: { text:"16", type: 3, coordA: 15.2291858, coordB: 49.8979644},
 17: { text:"17", type: 4, coordA: 15.2574108, coordB: 49.8801408},
 18: { text:"18", type: 4, coordA: 15.2986203, coordB: 49.8820322},
 19: { text:"19", type: 4, coordA: 15.3325019, coordB: 49.8753325},
 20: { text:"20", type: 4, coordA: 15.3603967, coordB: 49.8669167}
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
m.addDefaultLayer(SMap.DEF_RELIEF).enable();
//m.addDefaultLayer(SMap.DEF_GEOGRAPHY).enable();
//m.addDefaultControls();

// body zajmu
/* znackova vrstva pro ikonky bodu zajmu; poiToolTip - zapneme title jako nazev nad POI */
var layer = new SMap.Layer.Marker(undefined, {
	poiTooltip: true
});
m.addLayer(layer).enable();

/* dataProvider zastiti komunikaci se servery */
var dataProvider = m.createDefaultDataProvider();
dataProvider.setOwner(m);
dataProvider.addLayer(layer);
dataProvider.setMapSet(SMap.MAPSET_TURIST);
dataProvider.enable();

var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
m.addControl(mouse);

var keyboard = new SMap.Control.Keyboard(SMap.KB_PAN | SMap.KB_ZOOM); /* Ovládání klávesnicí */
m.addControl(keyboard);

var sync = new SMap.Control.Sync({bottomSpace:0});
m.addControl(sync);

var c = new SMap.Control.Scale();
m.addControl(c, {left:"8px", bottom:"9px"});

/***************************************************************/
// vrstva
var vrstva = new SMap.Layer.Marker();

// pridani znacek do vrstvy
_.forEach(markers, (marker) => {
 vrstva.addMarker(marker.marker);
});

m.addLayer(vrstva);
vrstva.enable();

/**************************************************************/

