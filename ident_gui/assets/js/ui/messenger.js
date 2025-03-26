


function build_messenger(){
    
    var el = document.getElementById(app_message_content_id);
    var dt = Date.now();

    var html = ` <div class="container">
    <h5>IDent Messages</h5>
    <div class = "messenger">
        <table class="table">`;
  
    for (var i = messages.length-1; i > -1 ; i--) {
        var msg_time = messages[i].msg_time;
        var dt = new Date(msg_time);
        var print_time = dt.toLocaleTimeString();
        var msg = messages[i].message;
        html += `
   
            <tr>
            <td>${print_time}</td>
            <td>  </td>
            <td>${msg}</td>
            </tr>
         
       
    `;
    }

    html += `</table></div ></div >`;
    el.innerHTML = html;

}


// console.log(dt);
// get readable message time.
