


var map=null;

function init_gis_engine(){

    map = L.map('gis_engine', { attributionControl: false }).setView([50.71714333, -0.09], 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}


init_gis_engine();





/*
*
*   LOADED APPLICATION FUNTIONS
*   **********************************************************************************************
*   
*   
*/










/*
*
*   GIS Classes & Routines API
*   **********************************************************************************************
*   
*   
*/



class MarlinGISLayer {



    // constituent layers before grouping
    layers = [];

    // group of layers
    export_layer = null; // this is a GIS layer group
 
    name = "";

    add_layer(layer) {
        this.layers.push(layer);
    }

    create_layer_group(layers_to_group_start, layers_to_group_end) {
        

        // console.log(layers_to_group_start, layers_to_group_end);

        if (this.layers.length > 0) {

            
            var _local_group = [];

            for (var i = layers_to_group_start; i == layers_to_group_end; i++){
                console.log(i);
                _local_group.push(this.layers[i]);
            }

            var _group = L.layerGroup(this.layers);
            this.export_layer = L.layerGroup(this.layers);
            
           // console.log(this.export_layer);

        }
        else {
            return (0);
        }
    }

    get_export_layer() {
         if (this.layers.length > 0) {
            return this.export_layer;
        }
        else {
            return (0);
        }
    
    }

}

/*
*
*   Create Map
*/

function create_mark(position, description, color_, mmsi, time_ms) {
    
    var lat = position.latitude;
    var long = position.longitude;
    var circle = L.circle([lat, long], {
        color: color_,
        fillColor: color_,
        fillOpacity: 0.8,
        radius: 20,
    }).bindPopup(description).openPopup().on("click", function(e) {
        onClick(e, mmsi, time_ms);
    });

    //console.log(time_ms);

    //'mouseover
    circle.on('click',function(ev) {
        ev.target.openPopup();
    });

    return circle;
}




function create_flag(position, description, color_, mmsi) {
    var lat = position['latitude'];
    var long = position['longitude'];

    var marker = L.marker([lat, long], {color:color_, fillOpacity: 0.8,}).addTo(map);
    marker.bindPopup(`<b>${description}</b>`).openPopup();

    return marker;
}




function onClick(e,mmsi, time_ms) {
    
    
    // update custom study time?!
    gis_study_select(time_ms);
    
    // alert(time_ms);
    

    application_data.ais_vessel_data.active_vessel = mmsi;
    console.log(application_data.ais_vessel_data.active_vessel);
    console.log(vessel_huds);
    populateHud();
    console.log(`select mmsi ${mmsi}`);
    // get active approach profile
    var approach_profile = grab_approach_profile(mmsi);
    
    //console.log(approach_profile);
    // plot active profile
    //plot_dynamics(application_data.ais_vessel_data.vessels[i].vessel_dynamics.vessel_approaches_custom[j].profile, `interpolated approach dynamics${j+1}`, mmsi, `smooth_approach_plot${j}`);

    plot_vessel_profile_new(approach_profile, mmsi);
    playAcousticLabel(time_ms);

}


function update_vessel_plots() {
    var active_mmsi = application_data.ais_vessel_data.active_vessel;
    if (active_mmsi != 0){
        console.log(`active mmsi ${active_mmsi}`);
        var approach_profile = grab_approach_profile(active_mmsi);
        //console.log(approach_profile);
        plot_vessel_profile_new(approach_profile, active_mmsi);
        

    }
}


/*
*
*   positions -> [{latitude : , longitude}]
*/
function create_track(positions, description, color_) {

    var track_layer;
    var pt_array = [];
    for (i = 0; i < positions.length; i++){
        var lat = positions[i]['latitude'];
        var long = positions[i]['longitude'];

        pt_array.push([lat, long]);
        //console.log(pt_array);

    }
    track_layer = L.polyline(pt_array,
         {
    color: color_,
   
   
    }).bindPopup(description);
    // track_layer.addTo(map);
    return track_layer;

    
}



/*
*
*   Build Map
*   **********************************************************************************************
*   
*   
*/



// // Add layers and groups to map
// function build_map(application_data) {
//     var layerControl = null; 
//     for (i = 0; i < application_data.application_plugins.marlin_gis_plugins.length; i++){
//         var gis_export_layer = application_data.application_plugins.marlin_gis_plugins[i].export_function();
//         console.log(gis_export_layer);

//         //L.control.layers(gis_export_layer).addTo(map);
//     }


// }

// var layerControl;
// Add layers and groups to map
// layers is a vector of groups.
var GroupControl = null;
var DynamicGroupControl = null;
var DynamicOverlay = null;
var map_upload = null;
var map_upload2 = null;

var all_map_layers = []; // track all layers
var all_map_controls = [];

function build_map(layers, pi_type) {
    
    var overlays = {};
    // for (var i=0; i<layers.length; i++){
    //     var test_layer = layers[i];
    //     var layer_name = `tracks_${i}`;
    //     var overlay =  { "test_layer" : test_layer};
    //     overlays.push(overlay);
        
       
    // }

    // console.log(overlays[0]);


    //var grouped_layers = [];
   // grouped_layers.push(layers);
    
    names = [];
    for (var i=0;i<layers.length;i++){

        if (layers[i]['data'] != null) {
                var _name = `<span>${layers[i]['name']}</span>`;
                names.push(_name);
                overlays[_name] = layers[i]['data'];
        }

    }
    
    // overlays = {
    //     [names[0]] : layers[0]['data'],
    //     [names[1]] : layers[0]['data'],
    //     [names[2]] : layers[0]['data']
    // };

   
    if (GroupControl == null){
        GroupControl = L.control.layers(null, overlays, { "collapsed": true }).addTo(map);
        all_map_controls.push(GroupControl);
    }
    // if (pi_type = "dynamic"){
    //     dynamic_group_control = layerControl;
    // }


}




function build_dynamic_map(layers){
    var overlays = {};
    // for (var i=0; i<layers.length; i++){
    //     var test_layer = layers[i];
    //     var layer_name = `tracks_${i}`;
    //     var overlay =  { "test_layer" : test_layer};
    //     overlays.push(overlay);
        
       
    // }

    // console.log(overlays[0]);


    //var grouped_layers = [];
   // grouped_layers.push(layers);
    
    names = [];
    for (var i=0;i<layers.length;i++){
        var _name = `<span>${layers[i]['name']}</span>`;
        names.push(_name);
        overlays[_name] = layers[i]['data'];
    }
    
    //console.log(overlays);
    // overlays = {
    //     [names[0]] : layers[0]['data'],
    //     [names[1]] : layers[0]['data'],
    //     [names[2]] : layers[0]['data']
    // };

   
    if (DynamicGroupControl != null){
        map.removeControl(DynamicGroupControl);
        all_map_controls = [];
        // if (map.hasLayer(map_upload)) {
        //     console.log("layer present");
        // }
        // else {
        //     console.log("no layer present");
        // }
        if (map_upload != null) {

            map.removeLayer(map_upload);
        }
        if (map_upload2 != null) {
            map.removeLayer(map_upload2);
        }

        map_upload = null;
        map_upload2 = null;
        DynamicGroupControl = null;
    }

    if (DynamicGroupControl == null) {
        //map.addLayer(overlays);
        //map_upload = layers[0]['data'];

        
        

        if (layers.length > 1) {
            map_upload2 = layers[1]['data'];
            map.addLayer(map_upload2);
        }
        
        //map.addLayer(map_upload);

        // console.log(map_upload);
        DynamicGroupControl = L.control.layers(null, overlays, { "collapsed": false }).addTo(map);
        all_map_controls.push(DynamicGroupControl);
    }
    else {
        //map_upload = map.addLayer(layers[0]['data']);
        //DynamicGroupControl = L.control.layers(null,overlays, {"collapsed" : false}).addTo(map); 
    }

    // if (GroupControl != null) {
    //     if (DynamicOverlay != null) {
    //         //GroupControl.removeLayer(DynamicOverlay);
    //     }
            
        
    //     DynamicOverlay = GroupControl.addOverlay(layers[0]['data'], layers[0]['name']);
    // }

    // if (pi_type = "dynamic"){
    //     dynamic_group_control = layerControl;
    // }
}




function ResetMap() {

    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });

    for (var i = 0; i < all_map_controls.length; i++){
        map.removeControl(all_map_controls[i]);
    }
    
     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(map);

    GroupControl = null;
    DynamicGroupControl = null;
    DynamicOverlay = null;
    map_upload = null;

    all_map_layers = []; // track all layers
    all_map_controls = [];

    
    

}


function focus_gis_engine(position, location_str, search_r, approach_r) {

    lat = position.latitude;
    long = position.longitude;

    // focus and place marker
    // var marker = L.marker([lat, long]).addTo(map);
    // marker.bindPopup(`<b>${location_str}Acoustic Lander Location.</b>`).openPopup();
    map.setView([lat, long], gis_zoom_level);

    var circle = L.circle([lat, long], {
    color: '#1A4950',
    fillColor: '#1A4950',
    fillOpacity: 0.1,
    radius: search_r,
    }).addTo(map);

    var circle = L.circle([lat, long], {
    color: '#1A4950',
    fillColor: '#1A4950',
    fillOpacity: 0.1,
    radius: approach_r,
    }).addTo(map);

    

    var marker = L.marker([lat, long]).addTo(map);
    marker.bindPopup(`<b>${location_keys[location_str]} listening location.</b>`).openPopup();
    

}





/*
*
*   FILTERED DATA FUNTIONS
*   **********************************************************************************************
*   
*   
*/

var epoch_markers = [];

function filter_epoch_gis_view(epoch_id){
    console.log(epoch_id)
    
    var epoch = null;
    var epochs = filtered_data.filter_data;

    for (var i = 0; i < epochs.length; i++){
        if (epochs[i].id == epoch_id) {
            epoch = epochs[i];
        }
    }

    console.log(epoch);
    showGISEpoch(epoch);


}

function removeFilterFlags(){

    for (var i=0; i<epoch_markers.length; i++){
        var flag = epoch_markers[i];
        map.removeLayer(flag);
    }

}


function showGISEpoch(epoch){

    if (epoch_markers.length > 0){
        removeFilterFlags();
        epoch_markers = [];
    }

    console.log("sffs");
    var mmsis = Object.keys(epoch.unique_vessels);
    for (var i = 0; i < mmsis.length; i++){
        var mmsi = mmsis[i];
        var position = {
            'latitude': epoch.unique_vessels[mmsi].t_lat,
            'longitude': epoch.unique_vessels[mmsi].t_long
        };
        console.log(epoch.unique_vessels[mmsi]);
        var description = `${epoch.unique_vessels[mmsi].name}  ${vessel_types[epoch.unique_vessels[mmsi].vessel_type]}`;
        var color_ = 'red';
       

        // marker = create_flag(position, description, color_, mmsi);
        // epoch_markers.push(marker);
    }

    for (var i = 0; i < epoch.vessels.length; i++){
        var position = {
        'latitude': epoch.vessels[i].t_lat,
        'longitude': epoch.vessels[i].t_long
        };
        
        var description = `${epoch.vessels[i].name} @ ${epoch.vessels[i].distance} [${epoch.vessels[i].vessel_type}] [${epoch.vessels[i].mmsi}]`;
        var color_ = 'red';
       

        marker = create_flag(position, description, color_, mmsi);
        epoch_markers.push(marker);
        
    }

}

function filter_activity_gis_view(epoch_id, activity_idx) {
   
    var epoch = null;
    var epochs = filtered_data.filter_data;

    for (var i = 0; i < epochs.length; i++){
        if (epochs[i].id == epoch_id) {
            epoch = epochs[i];
        }
    }

    
    var activities = epoch.activity;
    var active_activity =  epoch.activity[activity_idx];
    console.log(active_activity);
    showGISActivity(active_activity);

}

function showGISActivity(activity){
     if (epoch_markers.length > 0){
        removeFilterFlags();
        epoch_markers = [];
    }
     for (var i = 0; i < activity.unique_vessels.length; i++){
        var position = {
        'latitude': activity.unique_vessels[i].t_lat,
        'longitude': activity.unique_vessels[i].t_long
        };
         console.log(activity.unique_vessels[i]);
         var description = `${activity.unique_vessels[i].name} @ ${activity.unique_vessels[i].distance.toFixed(2)} <br>
        ${vessel_types[activity.unique_vessels[i].vessel_type]} (${activity.unique_vessels[i].vessel_type}) [${activity.unique_vessels[i].mmsi}]`;
        var color_ = 'red';
       

        marker = create_flag(position, description, color_);
        epoch_markers.push(marker);
        
    }
}

