


/*
*
*   Display AIS data UI in working window
*/

function display_ais_ui(){
    

    if (application_data == null) {
    alert("No data initialised.")
    return 0;
    }
    
    toggle_working_window();
    SetWorkingTitle("AIS Vessel Data");
    vessel_data = application_data.ais_vessel_data;
    number_vessel = vessel_data.number_of_vessels;

    application_data.add_message({ msg_time: Date.now(), message: `Displaying AIS data. Number of vessels : ${number_vessel}`, level: 1 });
    set_server_message(application_data.server_messages);


    var html = `
    
     <div id="ww-data">

       
        <div class="container">

      
        <div class="row">
        <div class="col-4">
        

        
        </div>
        
         
        </div>

        </div>





      
    
    `;

    var el = document.getElementById("nav-content-working-window");
    el.innerHTML = html;

   



}