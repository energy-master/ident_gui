





function build_save(){

    html = `
    
        <div class="center-screen">
        
        Hello, Load me!
        
        </div>

    `;

    var el = document.getElementById('app-cover');
    el.innerHTML = html;

}

function build_load(){

    show_loader();
}


function launch_loader(){
    show_app_screen();
    build_loader();
    show_app_screen();
}



function launch_save(){
    show_app_screen();
    build_save();
    //hide_loader();
}



