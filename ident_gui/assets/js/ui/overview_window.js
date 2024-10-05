


function build_overview_menu() {
   var html = document.getElementById("overview-data-window").innerHTML;

    html += `

        <div id="nav-bar-overview">
    <input id="nav-toggle-overview" type="checkbox" />
        <div id="nav-header-overview"><a id="nav-title-overview" href="https://www.marlin-ai.com" target="_blank"></a>
            <label for="nav-toggle-overview"><span id="nav-toggle-burger-overview"></span></label>
            <hr/>
        </div>
        <div id="nav-content-overview">
           
            <div id="nav-content-highlight-overview"></div>
        </div>
   
        
        </div>`;



    const el = document.getElementById("overview-data-window");
    el.innerHTML = html; 
}


//build_overview_menu();
