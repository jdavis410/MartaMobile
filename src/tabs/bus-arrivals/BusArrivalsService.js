var stop_list = require('./BusArrivalsList.json');

const axios = require('axios');

const base_url = 'http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetBusByRoute/';


export async function getBusArrivalsByStop(stop) {
	var proxy = 'https://cors-anywhere.herokuapp.com/';
	var url = 'https://cors-anywhere.herokuapp.com/http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetBusByRoute/';
	
	//TODO lookup route by stop
	if(stop == undefined) {
		return {};
	}
	
	var route_list = [];
	var resp;
	
	for(var i in stop_list){
		if(stop_list[i].stop_id == stop){
			var rt = stop_list[i].route_id;
			if(rt == 'GREEN' || rt == 'GOLD' || rt == 'BLUE'
			|| rt == 'RED'){
				continue;
			}
			
			if(route_list.indexOf(rt) === -1){
				route_list.push(stop_list[i].route_id);
			}
		}
	}
	
	console.log(route_list);
	
	
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            //return(xmlHttp.responseText);
		var hi = 0;
    }
    if(route_list[0] != undefined){
		xmlHttp.open("GET", url + route_list[0].toString(), false); // true for asynchronous 
		xmlHttp.send(null);
	
		resp = JSON.parse(xmlHttp.responseText);
	}
    
	
	if(route_list[0] == undefined){
		resp = [{"ROUTE":"No Routes Currently Servicing","LATITUDE":"0","LONGITUDE":"0"},{"ROUTE":"No Routes Currently Servicing","LATITUDE":"0","LONGITUDE":"0"}];
	}
	
	console.log(resp);
	
	return resp;

	
	
}