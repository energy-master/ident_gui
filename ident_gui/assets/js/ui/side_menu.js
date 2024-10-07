



function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
function build_side_menu() {




   var html = document.getElementById("nav-bar-holder-1").innerHTML;
// <button id="btnStart" type="button" class="btn btn-primary" data-toggle="modal" data-target="#formModal">Let's fill in a form!</button>
    html += `

        <div id="nav-bar">
       <input id="nav-toggle" type="checkbox" checked/>
        <div id="nav-header">
        
     

        <a id="nav-title" href="https://www.marlin-ai.com" target="_blank">MARLIN<span style="color:red">IDent</span></a>
            <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
           
        </div>
        <div id="nav-content">

        <div class="nav-button"></div>
        
           <div class="nav-button" id="setup-nav" onclick="show_data_selection()"><i class="fas fa-cog"></i><span><span style="color:red">IDent</span> Data Query</span></div>
            
           <div class="nav-button" id="acoustic-nav">  <a href="https://vixen.hopto.org/rs/marlin/data_tracker.php"> <i class="fas fa-headphones-alt"></i><span>RS Aqua Data</span></a></div>
           
           
            <div class="nav-button" id="ais-nav"><a href="https://vixen.hopto.org/rs/ident_app/ident/brahma/" target="_blank"> <i class="fas fa-calculator"></i><span><span style="color:red">IDent</span> Console</span></a></div>
            <div class="nav-button" id="load-nav"><i class="fas fa-calculator"></i><span>Load Dataset</span></div>
            
            <div id="nav-content-highlight"></div>
        </div>
        <input id="nav-footer-toggle" type="checkbox"/>
        <div id="nav-footer">
            <div id="nav-footer-heading">
            <div id="nav-footer-avatar"><img src="https://vixen.hopto.org/rs/ident_app/ident/assets/img/avatar/flat-design-profile-icon-set/7494590.jpg" /></div>
            <!--<div id="nav-footer-titlebox">test<span id="nav-footer-subtitle">test</span></div>-->
            <div id="nav-footer-titlebox">${user.name}<span id="nav-footer-subtitle">${user.position}</span></div>
        
            <label for="nav-footer-toggle"><i class="fas fa-caret-up"></i></label>
            </div>
            <div id="nav-footer-content">
            <Lorem>MARLIN team member.</Lorem>
            </div>
            
        
        
        </div>
        </div>`;



    const el = document.getElementById("nav-bar-holder-1");
    el.innerHTML = html; 




/*
*   Link call to save applicaiton call in menu
*/

// var setup_action_button = document.getElementById("save-nav");
// setup_action_button.onclick = function () {
    
//     var result = application_data.Save("");

// };

/*
*   Link call to load applicaiton call in menu
*/

var setup_action_button = document.getElementById("load-nav");
setup_action_button.onclick = function () {
    
    var result = Load();
    

};

//     var setup_action_button = document.getElementById("time-nav");
// setup_action_button.onclick = function () {
//     alert("fs");
//     display_setup_ui();

// };//


}


//build_side_menu();

/*
 <!---->*/





function build_right_menu() {




   var html = document.getElementById("nav-bar-holder-2").innerHTML;
// <button id="btnStart" type="button" class="btn btn-primary" data-toggle="modal" data-target="#formModal">Let's fill in a form!</button>
    html += `

        <div id="nav-bar-1">
        <input id="nav-toggle-1" type="checkbox" checked/>
        <div id="nav-header-1">
        <a id="nav-title" href="https://www.marlin-ai.com" target="_blank">IDent<span style="color:red">data</span></a>

            <label for="nav-toggle-1"><span id="nav-toggle-1-burger"></span></label>
           
        </div>
        <div id="nav-content">
       
        <div class="nav-button" id="setup-nav" onclick="show_data_selection()"><i class="fas fa-headphones-alt"></i><span>Acoustic Data</span></div>
           
          
        </div>
       
       
        </div>`;



    const el = document.getElementById("nav-bar-holder-2");
    el.innerHTML = html; 



}



/*
*
*   Windowing logic
*
*/


active_window_ids = [];



function ReloadAllShownData()
{
    //iterate over active windows. Get type of data and rebuild.
    console.log("reload");
    for (let key in window_tracker) {
        console.log(key);
        // acoustic data
        if (key == "acoustic-data") {
            console.log(key + " " + window_tracker[key]);
            content_id =`${window_tracker[key]}_content`;
            BuildAppDataAcoustic(content_id);
        }

        // on the fly labelling
        if (key == "study-label") {
            content_id = `${window_tracker[key]}_content`;
            BuildStudyLabel(content_id);
        }

        // list of tags
        if (key == "study-tags") {
            content_id = `${window_tracker[key]}_content`;
            ShowStudyLabels(content_id);
        }

    }

}

// createWindow();

// Create Window
function createWindow(title, data_type) {
    
    var win_id = makeid(10);
    var html = `
    
    
        <div id = "${win_id}" class = "draggable_window">
            <div id="${win_id}_hdr" class = "draggable_window_hdr"><span style="color:red">IDent</span> Data Window [ ${title} ]<div class=close-icon onClick="closeWindow('${win_id}')">X</div></div>
            <div id="${win_id}_content" class="window-content"></div>
            <div class="window-bottom-border"></div>
        </div>
    
    `;

    var el = document.getElementById("windows");
    el.innerHTML += html;

    active_window_ids.push(win_id);
    window_tracker[data_type] = win_id;
    dragElement(document.getElementById(win_id));



    var draggableElements = document.getElementsByClassName("draggable_window");

    for(var i = 0; i < draggableElements.length; i++){
        dragElement(draggableElements[i]);
    }

    
    return win_id;
    

}

function showWindow(win_id){
    var el = document.getElementById(win_id);
    el.style.display = "block";
    active_window_ids.push(win_id);
    
}


function closeWindow(id){
    var el = document.getElementById(id);
    el.style.display = "none";
    var index = active_window_ids.indexOf(id);
if (index !== -1) {
  active_window_ids.splice(index, 1);
}
}


// dragElement(document.getElementById("draggable_window"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "_hdr")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "_hdr").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

    function dragMouseDown(e) {
      console.log("on mouse down event")
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
        pos4 = e.clientY;
        console.log(pos4);
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
