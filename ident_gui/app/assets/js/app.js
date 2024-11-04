



el = document.getElementById('data-upload');
el.onclick = function(){
    var ident_id = Math.floor(Math.random() * 1000); // 213;
    var file_data = $('#upload_file').prop('files')[0];   
    var form_data = new FormData();                  
    form_data.append('upload_file', file_data);
    form_data.append('ident_id', ident_id);
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
            alert(php_script_response); // <-- display response from the PHP script, if any
            // upload_data_afterrun(ident_id)
            alert("Your data has been uploaded"); 
        }
        });
};

function upload_data_afterrun(run_id){
    //load game vis
    window.open(`game/index.php?snapshot_id=${run_id}&location=upload`,`${Math.floor(Math.random() * 99999)}`,'width=1000,height=700');

}


function show_ident_runs(){
    var report_run_url = "https://vixen.hopto.org/rs/api/v1/data/ident/get_runs";

    var post_data = {
        'user_uid': user_uid
       
    }

    $.post(report_run_url, JSON.stringify(post_data), function (data) {
            
       
        console.log(data)
         

    });

}