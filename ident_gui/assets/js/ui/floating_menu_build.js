
function build_floating_menu() {
  var html = '';
  
    html = `


        <!-- FAB Vertical -->
      <div class="fab fabVertical active">
          <div class="fabNav fabNav--left" >
          <div  id = "data-items-1" style="display:none">
            <a href="#" id="search-data" style="cursor:pointer"><span class="fabTooltip">Data Query</span><i class="fas fa-search"></i></a>
            <a href="#" style="cursor:pointer" id="goto-data"><span class="fabTooltip">Goto Data</span><i class="fas fa-arrow-right"></i></a>

            <a href="#" style="cursor:pointer" id="application-load"><span class="fabTooltip">Load an Application</span><i class="fas fa-upload"></i></a>
            <a href="#" style="cursor:pointer" id="load-data"><span class="fabTooltip">Quick Load</span><i class="fas fa-upload"></i></a>
            <a href="#" style="cursor:pointer" id="label-data"><span class="fabTooltip">My Labels</span><i class="fas fa-upload"></i></a>

            </div>
          </div>
          <div class="fabTrigger">
            <a href="">
              <span class="icon"></span>
            </a>
          </div>
          <div class="fabNav fabNav--right" >
            <div id = "play-items-1" style="display:none">
            <a href="#" style="cursor:pointer" id="clear-study"><span class="fabTooltip">New Study</span><i class="fas fa-pen"></i></a>
            <a href="#" style="cursor:pointer" id="acoustic-data"><span class="fabTooltip">View Acoustic Snapshots</span><i class="fas fa-headphones-alt"></i></a>
            <a href="#" id="study-target"><span class="fabTooltip">Run Search Against Study</span><i class="fas fa-bullseye"></i></a>
            <a href="#" id="study-report"><span class="fabTooltip">Study Analysis</span><i class="fas fa-file"></i></a>
            <a href="#" id="study-tags"><span class="fabTooltip">View Study Labels</span><i class="fas fa-tag"></i></a>
            <a href="#" id="study-label"><span class="fabTooltip">Add a Study Label</span><i class="fas fa-pen"></i></a>
            <a href="#" id="save-nav"><span class="fabTooltip">Save Application</span><i class="fas fa-save"></i></a>
            <a href="#" id="close-application"><span class="fabTooltip">Close Application</span><i class="fas fa-trash" style="color:red"></i></a>

            </div>
        </div>
     </div>


   
      `;
  
 
    var el = document.getElementById("toolbar");
    el.innerHTML = html;




  }


function show_data_tools() {
  

  document.getElementById("data-items-1").style.display = "block";
  document.getElementById("play-items-1").style.display = "none";


}



function show_play_tools() {


  document.getElementById("data-items-1").style.display = "none";
  document.getElementById("play-items-1").style.display = "block";


}


// show_data_tools();
// show_play_tools();
if (application_id == 0){
build_floating_menu();
connect_toolbar();
show_data_tools();
}
else{
  build_floating_menu();
connect_toolbar();
show_play_tools();
}
/*

*
* Link toolbar buttons to actions
*/

function connect_toolbar() {


  
    el = document.getElementById("search-data");
    el.onclick = function () { ToolbarClick('search-data')};

    el = document.getElementById("goto-data");
    el.onclick = function () { ToolbarClick('goto-data') };

    el = document.getElementById("application-load");
    el.onclick = function () { ToolbarClick('load-data') };


    el = document.getElementById("label-data");
    el.onclick = function () { ToolbarClick('data-labels') };

  

  // if (version == "play") {
   
    el = document.getElementById("study-label");
    el.onclick = function () { ToolbarClick('study-label') };

    el = document.getElementById("study-report");
    el.onclick = function () { ToolbarClick('study-report') };

    el = document.getElementById("acoustic-data");
    el.onclick = function () { ToolbarClick('acoustic-data') };


    el = document.getElementById("save-nav");
    el.onclick = function () { ToolbarClick('save-nav') };

    el = document.getElementById("study-target");
    el.onclick = function () { ToolbarClick('target') };
    
  el = document.getElementById("clear-study");
    el.onclick = function () {clear_checkboxes();};

  // }
}



var setup_action_button = document.getElementById("load-data");
setup_action_button.onclick = function () {

    var result = Load();


};

var setup_action_button = document.getElementById("close-application");
setup_action_button.onclick = function () {

  application_data = null;
  map.off();
  map.remove();
  map = null;
  init_gis_engine();

  show_data_tools();

};