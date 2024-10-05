


function build_vessel_html() {
    var html = "";
    html = `<div class="v-card">

        <div class="about" id="vessel_info">
        </div>
      
        <canvas id="vessel-chart"></canvas>
       
            
        </div>
        
       
        
        
        
        `;
    
    var el = document.getElementById('vessel_focus');
    el.innerHTML = html;

}

function updateHUD() {
    if (application_data != null) {
        var active_mmsi = application_data.ais_vessel_data.active_vessel;



    }
}

function build_vessel_hud()
{

    var html = "";
    if (application_data != null) {
        var active_mmsi = application_data.ais_vessel_data.active_vessel;
        var hud_data = vessel_huds[active_mmsi];
        console.log(hud_data);
        if (hud_data != null) {
            
            console.log(hud_data);
   
        
            if (active_mmsi != 0) {
                var hud_data = vessel_huds[active_mmsi];
                console.log(hud_data);
                html = `<div class="v-card">
        <div class="about">
        <h3>${hud_data.name}</h3>
        <h4>${hud_data.type_str}</h4>
        <div class="hud_right">
            <p class="lead">${hud_data.speed} kt</p>
            <p class="lead">${hud_data.heading}&deg;</p>
            <p class="lead">${hud_data.distance}m</p>
        </div>
        </div>
      
        <!--<canvas id="vessel-chart"></canvas>-->
       
            
        </div>
        
       
        
        
        
        `;
            }
            else {
                html = `<div class="v-card">
        <div class="about">
        <h3>Active Vessel</h3>
        <p class="lead">No active vessel!</p>
        </div>
        </div>`;

            }
        }
        else {
             html = `<div class="v-card">
        <div class="about">
        <h3>Active Vessel</h3>
        <p class="lead">No vessel data available.</p>
        </div>
        </div>`;
        }
    }
    else {
         html = `<div class="v-card">
        <div class="about">
        <h3>Active Vessel</h3>
        <p class="lead">No application available.</p>
        </div>
        </div>`;

    }

    console.log("building hud");
    var el = document.getElementById('vessel_focus');
    console.log(el);
    console.log(html);
    el.innerHTML = html;




}


function populateHud(){

    build_vessel_hud();
    return (1);
    //console.log("hud");
    var active_mmsi = application_data.ais_vessel_data.active_vessel;
    

    var html = "";
    if (active_mmsi != 0){
        console.log(active_mmsi);
        console.log(vessel_huds);
        var hud_data = vessel_huds[active_mmsi];
        console.log(hud_data);
        html =  `
        
        <table>
        
        <tr>
            <td>
                ${hud_data.speed} kt(s)
            </td>
        </tr>
        <tr>
            <td>
                ${hud_data.heading}&deg;
            </td>
        </tr>
         <tr>
            <td>
                ${hud_data.distance}m
            </td>
        </tr>
       
        
        
        </table>
        
        `;


    }

    var el = document.getElementById('vessel_hud');
    el.innerHTML = html;


}