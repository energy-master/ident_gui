/*
*
*   Custom Plugin 
*   **********************************************************************************************
*   This is a static plugin. Doesn't run with clock tick!
*   Show tracks in AIS data structure via GIS 
*
*   static plugins are run once per data set.
*   dynamic plugins are run per clock tick   
*
*   1 plugin - grouplayer or layer
*/



/*
*
*   pass vessels list
*/
class ShowTracksPlugin{

    my_plugin_function = function (application_data) {
    
        // pull vessels
        //console.log(application_data.ais_vessel_data);
        var vessels = application_data.ais_vessel_data.vessels;
        
        //console.log("running track plugin");
        
        // create a gis layer group
        var plugin_gis_layer = new MarlinGISLayer();


        for (var i = 0; i < vessels.length; i++) {
            var vessel_name = vessels[i].vessel_overview_data.name;
            var vessel_type_str = vessels[i].vessel_overview_data.vessel_type_str;
            for (var j = 0; j < vessels[i].vessel_dynamics.vessel_tracks.length; j++) {
                var track_positions = [];
                var iter_step = 0;
                if (vessels[i].vessel_dynamics.vessel_tracks[j].profile.length > gis_max_data_count) {
                    var iter_step = Math.floor(vessels[i].vessel_dynamics.vessel_tracks[j].profile.length / gis_max_data_count);
                }
                for (var k = 0; k < vessels[i].vessel_dynamics.vessel_tracks[j].profile.length; k++) {
                    //each track
                    //build locations for pass to GIS engine
                    //positions -> [{latit: long}]
                    var lat = vessels[i].vessel_dynamics.vessel_tracks[j].profile[k]['latitude'];
                    var long = vessels[i].vessel_dynamics.vessel_tracks[j].profile[k]['longitude'];
                    var position = { 'latitude': lat, 'longitude': long };
                    track_positions.push(position);
                    
                    k += iter_step;

                }
                var track_layer = create_track(track_positions, `${vessel_name} (${vessel_type_str})`, "green");
                plugin_gis_layer.add_layer(track_layer);
               

            }
        
        }


        // console.log(plugin_gis_layer);
        //create layer group -> this will be exported
        plugin_gis_layer.create_layer_group(0,plugin_gis_layer.layers.length);
        // console.log(plugin_gis_layer.export_layer);
        return (plugin_gis_layer.export_layer); // export layer is a vector of all the grouped layers.


    }



    my_export_function = function () {
    
    // export gis layergroup to GIS engine.
        return (this.plugin_gis_layer);


    }

    create_plugin() {
        
        // create the plugin
        return new MarlinPlugin("Track Display Plugin", "Show tracks on GIS", this.my_plugin_function, this.my_export_function, "static");
    
    }

}


/*
*
*   pass vessels list
*/
class ShowApproachesPlugin{

    my_plugin_function = function (application_data) {
    
        // pull vessels
        //console.log(application_data.ais_vessel_data);
        var vessels = application_data.ais_vessel_data.vessels;
        
        //console.log("running track plugin");
        
        // create a gis layer group
        var plugin_gis_layer = new MarlinGISLayer();


        for (var i = 0; i < vessels.length; i++) {
            var vessel_name = vessels[i].vessel_overview_data.name;
            var vessel_type_str = vessels[i].vessel_overview_data.vessel_type_str;
            for (var j = 0; j < vessels[i].vessel_dynamics.vessel_approaches_custom.length; j++) {
                var track_positions = [];
                var iter_step = 0;
                if (vessels[i].vessel_dynamics.vessel_approaches_custom[j].profile.length > gis_max_data_count) {
                    var iter_step = Math.floor(vessels[i].vessel_dynamics.vessel_approaches_custom[j].profile.length / gis_max_data_count);
                }
                for (var k = 0; k < vessels[i].vessel_dynamics.vessel_approaches_custom[j].profile.length; k++) {
                    //each track
                    //build locations for pass to GIS engine
                    //positions -> [{latit: long}]
                    var lat = vessels[i].vessel_dynamics.vessel_approaches_custom[j].profile[k]['latitude'];
                    var long = vessels[i].vessel_dynamics.vessel_approaches_custom[j].profile[k]['longitude'];
                    var position = { 'latitude': lat, 'longitude': long };
                    track_positions.push(position);
                    k += iter_step;

                }
                var track_layer = create_track(track_positions, `${vessel_name} (${vessel_type_str})`, "green");
                plugin_gis_layer.add_layer(track_layer);
               

            }
        
        }


        // console.log(plugin_gis_layer);
        //create layer group -> this will be exported
        plugin_gis_layer.create_layer_group(0,plugin_gis_layer.layers.length);
        // console.log(plugin_gis_layer.export_layer);
        return (plugin_gis_layer.export_layer); // export layer is a vector of all the grouped layers.


    }



    my_export_function = function () {
    
    // export gis layergroup to GIS engine.
        return (this.plugin_gis_layer);


    }

    create_plugin() {
        
        // create the plugin
        return new MarlinPlugin("Approach Display Plugin", "Show all approaches on GIS", this.my_plugin_function, this.my_export_function, "static");
    
    }

}



/*
*
*   pass vessels
*/
class ShowVesselTracksPlugin{

    my_plugin_function = function (vessel) {
    

        var mmsi = vessel.vessel_overview_data.mmsi;
        // pull vessels
        // console.log(application_data.ais_vessel_data);
        // var vessels = application_data.ais_vessel_data.vessels;
        
        //console.log("running vessel track plugin");
        
        // create a gis layer group
        var plugin_gis_layer = new MarlinGISLayer();
       


       
        var vessel_name = vessel.vessel_overview_data.name;
        var vessel_mmsi = vessel.vessel_overview_data.mmsi;
        var vessel_type_str = vessel.vessel_overview_data.vessel_type_str;
        for (var j = 0; j < vessel.vessel_dynamics.vessel_tracks.length; j++) {
            var track_positions = [];
            //console.log(vessel.vessel_dynamics.vessel_tracks[j]);
            var iter_step = 0;
                if (vessel.vessel_dynamics.vessel_tracks[j].profile.length > gis_max_data_count) {
                    var iter_step = Math.floor(vessel.vessel_dynamics.vessel_tracks[j].profile.length / gis_max_data_count);
                }
            for (var k = 0; k < vessel.vessel_dynamics.vessel_tracks[j].profile.length; k++) {
                // console.log(k);
                var lat = vessel.vessel_dynamics.vessel_tracks[j].profile[k]['latitude'];
                var long = vessel.vessel_dynamics.vessel_tracks[j].profile[k]['longitude'];
                var position = { 'latitude': lat, 'longitude': long };
                // console.log(lat);
                // console.log(long);
                track_positions.push(position);
                k += iter_step;
                

            }
            
            //("creating track");
            //console.log(track_positions);
            var track_layer = create_track(track_positions, `${vessel_name} (${vessel_type_str})`, "purple");
            plugin_gis_layer.add_layer(track_layer);
            

        }
        
        


        // console.log(plugin_gis_layer);
        //create layer group -> this will be exported
        plugin_gis_layer.create_layer_group(0,plugin_gis_layer.layers.length);
        // console.log(plugin_gis_layer.export_layer);
        return (plugin_gis_layer.export_layer); // export layer is a NOT a vector of all the grouped layers.


    }



    my_export_function = function () {
    
    // export gis layergroup to GIS engine.
        return (this.plugin_gis_layer);


    }

    create_plugin() {
        
        // create the plugin
        return new MarlinPlugin("Track Display Plugin", "Show tracks on GIS", this.my_plugin_function, this.my_export_function, "static");
    
    }

}



/*
*
*   pass vessels
*/
class ShowVesselApproachesPlugin{

    my_plugin_function = function (vessel) {
    

        
        // pull vessels
        // console.log(application_data.ais_vessel_data);
        // var vessels = application_data.ais_vessel_data.vessels;
        
        //console.log("running vessel approaches plugin");
        
        // create a gis layer group
        var plugin_gis_layer = new MarlinGISLayer();
        


       
        var vessel_name = vessel.vessel_overview_data.name;
        var vessel_mmsi = vessel.vessel_overview_data.mmsi;
        var vessel_type_str = vessel.vessel_overview_data.vessel_type_str;
        //console.log(vessel.vessel_dynamics.vessel_approaches.length);
        
        for (var j = 0; j < vessel.vessel_dynamics.vessel_approaches_custom.length; j++) {
            var track_positions = [];
            //console.log(vessel.vessel_dynamics.vessel_interpolated_approaches[j]);
            var iter_step = 0;
                if (vessel.vessel_dynamics.vessel_approaches_custom[j].profile.length > gis_max_data_count) {
                    var iter_step = Math.floor(vessel.vessel_dynamics.vessel_approaches_custom[j].profile.length / gis_max_data_count);
                }
            for (var k = 0; k < vessel.vessel_dynamics.vessel_approaches_custom[j].profile.length; k++) {
                
                var lat = vessel.vessel_dynamics.vessel_approaches_custom[j].profile[k].latitude;
                var long = vessel.vessel_dynamics.vessel_approaches_custom[j].profile[k].longitude;
                var position = { 'latitude': lat, 'longitude': long };
                // console.log(lat);
                // console.log(long);
                track_positions.push(position);
                k += iter_step;
                

            }
            

            //console.log("creating approach");
            //console.log(`app ${track_positions.length}`);
            var track_layer = create_track(track_positions, `Approach -> ${vessel_name} (${vessel_type_str})`, "purple");
            plugin_gis_layer.add_layer(track_layer);
            

        }
        
        


        // console.log(plugin_gis_layer);
        //create layer group -> this will be exported
        plugin_gis_layer.create_layer_group(0,plugin_gis_layer.layers.length);
        // console.log(plugin_gis_layer.export_layer);
        return (plugin_gis_layer.export_layer); // export layer is a NOT a vector of all the grouped layers.


    }



    my_export_function = function () {
    
    // export gis layergroup to GIS engine.
        return (this.plugin_gis_layer);


    }

    create_plugin() {
        
        // create the plugin
        return new MarlinPlugin("Approach Display Plugin", "Show Approaches on GIS", this.my_plugin_function, this.my_export_function, "static");
    
    }

}






class OverlayInterpolatedAISHitsPlugin{

    // run function
    my_plugin_function = function (application_data) {
    
        // pull vessels
        //console.log(application_data.ais_vessel_data);
        var vessels = application_data.ais_vessel_data.vessels;
        
        //console.log("running ais registered hits plugin");
        
        // create a gis layer group
        var plugin_gis_layer = new MarlinGISLayer();


        for (var i = 0; i < vessels.length; i++) {
            var vessel_name = vessels[i].vessel_overview_data.name;
            var vessel_type_str = vessels[i].vessel_overview_data.vessel_type_str;
            var mmsi = vessels[i].vessel_overview_data.mmsi;
            for (var j = 0; j < vessels[i].vessel_dynamics.vessel_interpolated_tracks.length; j++) {
                var track_positions = [];
                var iter_step = 0;
                if (vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length > gis_max_data_count) {
                    var iter_step = Math.floor(vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length / gis_max_data_count);
                }
                iter_step = 0;
                if (mmsi == "235080084") {
                    console.log(vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length);

                }
                var prev_pos = {};
                for (var k = 0; k < vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length; k++) {
                    //each track
                    //build locations for pass to GIS engine
                    //positions -> [{latit: long}]
                    
                    var lat = parseFloat(vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['latitude']);
                    var long = parseFloat(vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['longitude']);
                    var position = { 'latitude': lat, 'longitude': long };
                     if (mmsi == "235080084") {
                        //console.log(position);
                     }
                    if (k==0) {
                        prev_pos = { 'lat': lat, 'lng': long };
                    }
                    var route = [prev_pos, { 'lat': lat, 'lng': long }]; //m 
                    prev_pos = { 'lat': lat, 'lng': long } ;
                    var distance = calculateDistance(route);
                    var plot_time = vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['timestamp'];
                    var time_ms = vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['_t'];
                    //track_positions.push(position)
                    //var track_layer = create_track(track_positions, `${vessel_name} (${vessel_type_str})`, "green");
                    
                    var c_ratio = k / vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length;
                    var ratio_color = color_interpolated(c_ratio, colors['jet']);
                    //console.log(ratio_color);
                    var pos_layer = create_mark(position, `${vessel_name} (${vessel_type_str}) [${plot_time}]`, rgbToHex(ratio_color[0], ratio_color[1], ratio_color[2]), mmsi, time_ms);
                    if (mmsi == "235080084") {
                        // console.log(route);
                        // console.log(pos_layer);
                        // console.log(distance);
                    }
                    plugin_gis_layer.add_layer(pos_layer);
                    k += iter_step;

                }
               

            }
        
        }
    

        // console.log(plugin_gis_layer);
        //create layer group -> this will be exported
        plugin_gis_layer.create_layer_group(0, plugin_gis_layer.layers.length);
        // console.log(plugin_gis_layer.export_layer);
        return (plugin_gis_layer.export_layer); // export layer is a vector of all the grouped layers.
    }

    my_export_function = function () {
    
    // export gis layergroup to GIS engine.
        return (this.plugin_gis_layer);


    }

    create_plugin() {
        
        // create the plugin
        return new MarlinPlugin("AIS Interpolated Hit Display", "Show all Interpolated AIS hits", this.my_plugin_function, this.my_export_function, "static");
    
    }



}


class OverlayAISHitsPlugin{

    // run function
    my_plugin_function = function (application_data) {
    
        // pull vessels
        //console.log(application_data.ais_vessel_data);
        var vessels = application_data.ais_vessel_data.vessels;
        
        //console.log("running ais registered hits plugin");
        
        // create a gis layer group
        var plugin_gis_layer = new MarlinGISLayer();


        for (var i = 0; i < vessels.length; i++) {
            var vessel_name = vessels[i].vessel_overview_data.name;
            var vessel_type_str = vessels[i].vessel_overview_data.vessel_type_str;
            var mmsi = vessels[i].vessel_overview_data.mmsi;
            for (var j = 0; j < vessels[i].vessel_dynamics.vessel_tracks.length; j++) {
                var track_positions = [];
                var iter_step = 0;
                if (vessels[i].vessel_dynamics.vessel_tracks[j].profile.length > gis_max_data_count) {
                    var iter_step = Math.floor(vessels[i].vessel_dynamics.vessel_tracks[j].profile.length / gis_max_data_count);
                }
                for (var k = 0; k < vessels[i].vessel_dynamics.vessel_tracks[j].profile.length; k++) {
                    //each track
                    //build locations for pass to GIS engine
                    //positions -> [{latit: long}]
                    console.log(vessels[i].vessel_dynamics.vessel_tracks[j].profile[k]);
                    var time = vessels[i].vessel_dynamics.vessel_tracks[j].profile[k]['timestamp'];
                    var lat = vessels[i].vessel_dynamics.vessel_tracks[j].profile[k]['latitude'];
                    var long = vessels[i].vessel_dynamics.vessel_tracks[j].profile[k]['longitude'];
                    var position = { 'latitude': lat, 'longitude': long };
                    //track_positions.push(position)
                    //var track_layer = create_track(track_positions, `${vessel_name} (${vessel_type_str})`, "green");
                    var pos_layer = create_mark(position, `${vessel_name} (${vessel_type_str}) | ${time}`, "blue", mmsi);
                    
                    
                    
                    plugin_gis_layer.add_layer(pos_layer);
                    k += iter_step;

                }
               

            }
        
        }
    

        // console.log(plugin_gis_layer);
        //create layer group -> this will be exported
        plugin_gis_layer.create_layer_group(0, plugin_gis_layer.layers.length);
        // console.log(plugin_gis_layer.export_layer);
        return (plugin_gis_layer.export_layer); // export layer is a vector of all the grouped layers.
    }

    my_export_function = function () {
    
    // export gis layergroup to GIS engine.
        return (this.plugin_gis_layer);


    }

    create_plugin() {
        
        // create the plugin
        return new MarlinPlugin("AIS Hit Display", "Show all AIS hits", this.my_plugin_function, this.my_export_function, "static");
    
    }



}


/*
*
*   Non Static Plugin
*/



class DynamicOverlayAISHitsPlugin{
   
    // run function
    my_plugin_function = function (application_data) {
        var mmsis = [];
        var final_marks = {};
        // pull vessels
        //console.log(application_data.ais_vessel_data);
        var vessels = application_data.ais_vessel_data.vessels;
        
        //console.log("dynamically running ais registered hits plugin");
        
        // create a gis layer group
        var plugin_gis_layer = new MarlinGISLayer();

        var num_active = 0;
        
        for (var i = 0; i < vessels.length; i++) {
            var vessel_name = vessels[i].vessel_overview_data.name;
            var vessel_type_str = vessels[i].vessel_overview_data.vessel_type_str;
            var mmsi = vessels[i].vessel_overview_data.mmsi;
            for (var j = 0; j < vessels[i].vessel_dynamics.vessel_tracks.length; j++) {
                var track_positions = [];
                var iter_step = 0;
                if (vessels[i].vessel_dynamics.vessel_tracks[j].location_profile.length > gis_max_data_count) {
                    var iter_step = Math.floor(vessels[i].vessel_dynamics.vessel_tracks[j].location_profile.length / gis_max_data_count);
                }
                for (var k = 0; k < vessels[i].vessel_dynamics.vessel_tracks[j].location_profile.length; k++) {
                    //each track
                    //build locations for pass to GIS engine
                    //positions -> [{latit: long}]
                    var lat = vessels[i].vessel_dynamics.vessel_tracks[j].location_profile[k]['lat'];
                    var long = vessels[i].vessel_dynamics.vessel_tracks[j].location_profile[k]['long'];
                    var position = { 'latitude': lat, 'longitude': long };
                    //track_positions.push(position)
                    //var track_layer = create_track(track_positions, `${vessel_name} (${vessel_type_str})`, "green");
                    

                    // filter by time
                    var ais_time = vessels[i].vessel_dynamics.vessel_tracks[j].location_profile[k]['time'];
                    var current_clock = application_data.application_clock.application_time;
                    
                    var delta_t = Math.abs(current_clock - ais_time);
                    //console.log(delta_t);
                    k += iter_step;
                    if (delta_t < track_interval) {
                        if (!mmsis.includes(mmsi)) {
                            mmsis.push(mmsi);

                        }
                        num_active++;
                        // console.log("yes!");
                        var ais_time_str = time_string(ais_time);
                        var pos_layer = create_mark(position, `${vessel_name} (${vessel_type_str}) (${ais_time_str})`, "red", mmsi);
                        // plugin_gis_layer.add_layer(pos_layer);
                        final_marks[mmsi] = pos_layer;
                    }   
                }
               

            }
        
        }
        //console.log(final_marks);
        for (var i = 0; i < mmsis.length; i++){
            plugin_gis_layer.add_layer(final_marks[mmsis[i]]);
        }
        //console.log(`number actinve ${num_active} : ${mmsis.length}`);
    

        // console.log(plugin_gis_layer);
        //create layer group -> this will be exported
        plugin_gis_layer.create_layer_group(0, plugin_gis_layer.layers.length);
        // console.log(plugin_gis_layer.export_layer);
        return (plugin_gis_layer.export_layer); // export layer is a vector of all the grouped layers.
    }

    my_export_function = function () {
    
    // export gis layergroup to GIS engine.
        return (this.plugin_gis_layer);


    }

    create_plugin() {
        
        // create the plugin
        return new MarlinPlugin("Dynamic Plot", "Show all AIS hits filtered by time", this.my_plugin_function, this.my_export_function, "dynamic");
    
    }



}

var vessel_huds = {};


// main dynamic postition pluging. run in onclick
class DynamicOverlayInterpolatedAISHitsPlugin{
   
    // run function
    my_plugin_function = function (application_data) {
        var mmsis = [];
        var final_marks = {};
        var winning_pos = {};
        // pull vessels
        //console.log(application_data.ais_vessel_data);
        var vessels = application_data.ais_vessel_data.vessels;
        
        //console.log("dynamically running ais registered hits plugin");
        
        // create a gis layer group
        var plugin_gis_layer = new MarlinGISLayer();

        var num_active = 0;
        
        for (var i = 0; i < vessels.length; i++) {
            var delta_t = null;
            var vessel_name = vessels[i].vessel_overview_data.name;
            var vessel_type_str = vessels[i].vessel_overview_data.vessel_type_str;
            var mmsi = vessels[i].vessel_overview_data.mmsi;
            for (var j = 0; j < vessels[i].vessel_dynamics.vessel_interpolated_tracks.length; j++) {
                var track_positions = [];
                var iter_step = 0;
                if (vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length > gis_max_data_count) {
                    var iter_step = Math.floor(vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length / gis_max_data_count);
                }
                //console.log(`iter : ${iter_step}`);
                // for (var k = 0; k < vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length; k++) {
                //console.log(`length : ${vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length}`);
                for (var k = 0; k < vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile.length; k++) {
                    //each track
                    //build locations for pass to GIS engine
                    //positions -> [{latit: long}]
                    var lat = vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['latitude'];
                    var long = vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['longitude'];
                    
                    //var speed = vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['speed'];
                    //var distance = vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['distance'];
                    var distance = "n/a";
                    // console.log(vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]);
                    if ('ref_distance' in vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]) {
                        distance = vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['ref_distance'];
                    }
                    //console.log(distance);
                    var speed = "n/a";
                    if ('speed' in vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]) {
                        speed = vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['speed'];
                    }
                    var heading = "n/a";
                    if ('heading' in vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]) {
                        heading = vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['heading'];
                    }

                    var position = { 'latitude': lat, 'longitude': long };
                    //track_positions.push(position)
                    //var track_layer = create_track(track_positions, `${vessel_name} (${vessel_type_str})`, "green");
                    
                    //console.log(vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]);
                    // filter by time
                    if ('_t' in vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]) {
                        // var ais_time = vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['_t'];
                        var ais_time = new Date(vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['timestamp']).getTime();
                        //console.log(ais_time);
                    }
                    else {
                        console.log("no _T")
                    }

                    var current_clock = application_data.application_clock.application_time;
                    
                    var delta_t_lcl = Math.abs(current_clock - ais_time);
                    //console.log(delta_t);
                   
                    
                    if (delta_t == null) {
                        delta_t = delta_t_lcl;
                    }
                    if (mmsi == "255806433") { 
                        // console.log(delta_t, delta_t_lcl)
                        // console.log(application_data.application_clock.application_time, ais_time);
                        // console.log(vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]);
                        // console.log(vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['_i']);

                    }
                    if (delta_t_lcl <= delta_t) {
                        delta_t = delta_t_lcl;
                        if (delta_t < track_interval) {
                            console.log('we have a hit');
                            if (!mmsis.includes(mmsi)) {
                                mmsis.push(mmsi);

                            }
                            num_active++;
                            // console.log("yes!");
                            distance = Math.floor(distance);
                            speed = Math.floor(speed);
                            
                            var time_p = time_string(vessels[i].vessel_dynamics.vessel_interpolated_tracks[j].profile[k]['_t'])[2];
                            var pos_layer = create_mark(position, `${vessel_name} (${vessel_type_str}) [${time_p}][${speed} @ ${distance}]`, "green", mmsi, ais_time);
                            // **** update vessel huds ***

                            if (mmsi in vessel_huds) {
                                vessel_huds[mmsi].name = vessel_name;
                                vessel_huds[mmsi].type_str = vessel_type_str;
                                vessel_huds[mmsi].mmsi = mmsi;
                                vessel_huds[mmsi].speed = speed;
                                vessel_huds[mmsi].heading = heading;
                                vessel_huds[mmsi].distance = distance;
                            }
                            else {

                                var hud = {};
                                hud.speed = speed;
                                hud.heading = heading;
                                hud.distance = distance;
                                hud.name = vessel_name;
                                hud.type_str = vessel_type_str;
                                hud.mmsi = mmsi;

                                vessel_huds[mmsi] = hud;
                            
                            }
                            //console.log(vessel_huds);



                            // plugin_gis_layer.add_layer(pos_layer);
                            final_marks[mmsi] = pos_layer;
                        }
                    }// new delta t 



                    k += iter_step;
                }
               

            }
        
        }
        //console.log(final_marks);
        for (var i = 0; i < mmsis.length; i++){
            plugin_gis_layer.add_layer(final_marks[mmsis[i]]);
        }
        //console.log(`number actinve ${num_active} : ${mmsis.length}`);
    

        // console.log(plugin_gis_layer);
        //create layer group -> this will be exported
        plugin_gis_layer.create_layer_group(0, plugin_gis_layer.layers.length);
        //console.log(`dynamic : ${plugin_gis_layer} number layers  = ${plugin_gis_layer.layers.length}`);
        // console.log(plugin_gis_layer.export_layer);
        return (plugin_gis_layer.export_layer); // export layer is a vector of all the grouped layers.
    }

    my_export_function = function () {
    
    // export gis layergroup to GIS engine.
        return (this.plugin_gis_layer);


    }

    create_plugin() {
        
        // create the plugin
        return new MarlinPlugin("Dynamic AIS Plot", "Show all Interpolated AIS hits filtered by time", this.my_plugin_function, this.my_export_function, "dynamic");
    
    }



}