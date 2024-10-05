

/*
*
*   Display acoustic data UI in working window
*/

function display_acoustic_ui() {

    if (application_data == null) {
        alert("No data initialised.")
        return 0;
    }
    
    toggle_working_window();
    SetWorkingTitle("Acoustic Data");


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