


function build_working_window() {
   var html = document.getElementById("working-window").innerHTML;

    html += `

        <div id="nav-bar-working-window">
        <input id="nav-toggle-working-window" type="checkbox" checked/>
        <div id="nav-header-working-window">
            <a id="nav-title-working-window" href="https://www.marlin-ai.com" target="_blank">Application Window</a>
            <label for="nav-toggle-working-window"><span id="nav-toggle-burger-working-window"></span></label>
            <hr/>
        </div>

        <div id="nav-content-working-window">
          
       
        
        
        </div>
         
        
   
        
        </div>`;



    const el = document.getElementById("working-window");
    el.innerHTML = html; 
}


build_working_window();



// nav-header-working-window -> title
