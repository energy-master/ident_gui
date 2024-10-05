/*
*
*   Callback calls. Link actions to DOM elements.
*/


/*
*   Link call to main setup option in menu.
*/

var setup_action_button = document.getElementById("time-nav");
setup_action_button.onclick = function () {
    alert("fs");
    display_setup_ui();

};//

/*
*   Link call to ais data ui option in menu.
*/

var setup_action_button = document.getElementById("ais-nav");
setup_action_button.onclick = function () {
    
    display_ais_ui();

};


/*
*   Link call to acoustic data ui option in menu.
*/

var setup_action_button = document.getElementById("acoustic-nav");
setup_action_button.onclick = function () {
    
    display_acoustic_ui();

};


/*
*   Link call to save applicaiton call in menu
*/

var setup_action_button = document.getElementById("save-nav");
setup_action_button.onclick = function () {
    
    var result = application_data.Save();

};

/*
*   Link call to load applicaiton call in menu
*/

var setup_action_button = document.getElementById("load-nav");
setup_action_button.onclick = function () {
    
    var result = Load();
    

};



