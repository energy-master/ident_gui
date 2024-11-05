


var status_title = {
    0: 'started',
    
    10 : 'complete'
}


el = document.getElementById('data-upload');
el.onclick = function () {
    
    var ident_id = Math.floor(Math.random() * 1000); // 213;
    var file_data = $('#upload_file').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append('upload_file', file_data);
    form_data.append('ident_id', ident_id);
    alert("Your job has been submitted. "); 
    //alert(form_data);                             
    $.ajax({
        url: '../cgi-bin/upload_data.php', // <-- point to server-side PHP script 
        dataType: 'text',  // <-- what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,//'multipart/form-data',
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(php_script_response){
            //alert(php_script_response); // <-- display response from the PHP script, if any
            // upload_data_afterrun(ident_id)
            alert("Your data has been uploaded and run is complete. Please access results below."); 
        }
        });
};

function upload_data_afterrun(run_id){
    //load game vis
    window.open(`../game/index.php?snapshot_id=${run_id}&location=upload`,`${Math.floor(Math.random() * 99999)}`,'width=1000,height=700');

}


function grab_ident_runs(){
    var report_run_url = "https://vixen.hopto.org/rs/api/v1/data/ident/get_runs";

    var post_data = {
        'user_uid': user.user_uid
       
    }
    console.log(post_data);
    $.post(report_run_url, JSON.stringify(post_data), function (data) {
            
       
        console.log(data)
        build_ident_run_table(data['data']);

    });

}

function build_ident_run_table(data) {
    
    var html = ``; 
    html += `<table class="table table-hover"><tr><th>Run ID</th><th>time</th><th>target</th><th>status</th><th></th><th></th></tr>`;
    


    for (var i = 0; i < data.length; i++){
        console.log(data[i]);
        html += `<tr>
        
        <td>${data[i]['run_id']}</td>
        <td>${data[i]['timestamp']}</td>
        <td>${data[i]['target']}</td>
        <td>${data[i]['status']}</td>
        <td>
             <button class="btn btn-primary btn-sm" onclick="upload_data_afterrun('${data[i]['run_id']}')">View</button>
        </td>
        <td>
            <a href=""  download='csv.csv'>
                [results]
                </a>
        </td>
        
        </tr>`
    }

    html += `</table>`

    var el = document.getElementById('run-table');
    el.innerHTML = html;

}