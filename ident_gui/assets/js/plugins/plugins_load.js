

function load_plugins(){


        // add plugins
        /*
        *  Init / Add plugins - hard code now
        */
            
        //track plugin
        var tracks_plugin = new ShowTracksPlugin();
        var marlin_plugin = tracks_plugin.create_plugin();
        application_data.application_plugins.add_gis_plugin(marlin_plugin);
         // OverlayAISHits
        var hits_plugin = new OverlayAISHitsPlugin();
        var marlin_plugin = hits_plugin.create_plugin();
        application_data.application_plugins.add_gis_plugin(marlin_plugin);
    
        
       
        //ShowVesselTracksPlugin
        var v_track_plugin = new ShowVesselTracksPlugin();
        var marlin_plugin = v_track_plugin.create_plugin();
        application_data.application_plugins.add_gis_plugin(marlin_plugin);
        
        //ShowVesselApproachesPlugin
        var v_approach_plugin = new ShowVesselApproachesPlugin();
        var marlin_plugin = v_approach_plugin.create_plugin();
        application_data.application_plugins.add_gis_plugin(marlin_plugin);

       
    
        //DynamicOverlayAISHitsPlugin
        var dynamic_plot = new DynamicOverlayAISHitsPlugin();
        var marlin_plugin = dynamic_plot.create_plugin();
        application_data.application_plugins.add_gis_plugin(marlin_plugin);

        // OverlayAISHits
        var hits_plugin = new OverlayInterpolatedAISHitsPlugin();
        var marlin_plugin = hits_plugin.create_plugin();
        application_data.application_plugins.add_gis_plugin(marlin_plugin);
    
        //DynamicOverlayAISHitsPlugin
        var dynamic_plot = new DynamicOverlayInterpolatedAISHitsPlugin();
        var marlin_plugin = dynamic_plot.create_plugin();
        application_data.application_plugins.add_gis_plugin(marlin_plugin);

        //DynamicOverlayAISHitsPlugin
        var approaches_plot = new ShowApproachesPlugin();
        var marlin_plugin = approaches_plot.create_plugin();
        application_data.application_plugins.add_gis_plugin(marlin_plugin);
        //S
        
        

}    