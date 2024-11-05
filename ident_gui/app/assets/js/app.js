


var status_title = {
    0: 'started',
    1: 'building data adapter',
    2: 'data adapter already exists',
    3: 'saving new adapter',
    4: 'loading existing data adapter',
    5: 'starting run',
    11: 'starting layer three',
    12: 'layer three complete',
    13: 'spectrogram built & saved',
    10 : 'run complete'
}


el = document.getElementById('data-upload');
el.addEventListener("click", run_ident); 

function run_ident() {
    el.style.color = 'red';
    
    var base_id = Math.floor(Math.random() * 1000);
    var ident_id = base_id + "_" + Math.floor(Math.random() * 1000); // 213;
    
    var file_data = null;
    file_data = $('#upload_file').prop('files')[0];   
    if ((file_data == undefined)) {
        alert('Please submit a valid file.')
        return;
    }
   // console.log(file_data);
    
    var ele = document.getElementById('activation-level');
    activation_energy = ele.value;
    
    _80_activation_energy = document.getElementById('threshold-energy-level').value;
    var form_data = new FormData();
             
    form_data.append('upload_file', file_data);
    form_data.append('base_id', base_id);
    
    form_data.append('ident_id', ident_id);
    form_data.append('user_uid', user['user_uid']);
    form_data.append('activation-level', activation_energy);
    form_data.append('80-activation-level', _80_activation_energy);

    alert(`Your job has been submitted - ${user['user_uid']} `); 
    
    //alert(form_data);   
    el.style.color = 'blue';
    $.ajax({
        url: '../cgi-bin/upload_data.php', // <-- point to server-side PHP script 
        dataType: 'text',  // <-- what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,//'multipart/form-data',
        processData: false,
        data: form_data,                         
        type: 'post',
        
        success: function (php_script_response) {
            grab_ident_runs();
            alert(php_script_response); // <-- display response from the PHP script, if any
            // upload_data_afterrun(ident_id)
            //alert("Your data has been uploaded and run is complete. Please access results below."); 
        }
        });
};


function run_ident_wout_upload(base_id){


    var ident_id = base_id + "_" +  Math.floor(Math.random() * 1000); // 213;
    var ele = document.getElementById('activation-level');
    activation_energy = ele.value;
    _80_activation_energy = document.getElementById('threshold-energy-level').value;
    var form_data = new FormData();
    form_data.append('ident_id', ident_id);
    form_data.append('user_uid', user['user_uid']);
    form_data.append('activation-level', activation_energy);
    form_data.append('80-activation-level', _80_activation_energy);

    $.ajax({
        url: '../cgi-bin/run_ident_wout_upload.php', // <-- point to server-side PHP script 
        dataType: 'text',  // <-- what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,//'multipart/form-data',
        processData: false,
        data: form_data,                         
        type: 'post',
        
        success: function (php_script_response) {
            grab_ident_runs();
            //alert(php_script_response); // <-- display response from the PHP script, if any
            // upload_data_afterrun(ident_id)
            alert("Your data has been uploaded and run is complete. Please access results below."); 
        }
        });
}


function upload_data_afterrun(run_id){
    //load game vis
    window.open(`../game/index.php?snapshot_id=${run_id}&location=upload`,`${Math.floor(Math.random() * 99999)}`,'width=1000,height=700');

}


function grab_ident_runs(){
    var report_run_url = "https://vixen.hopto.org/rs/api/v1/data/ident/get_runs";

    var post_data = {
        "user_uid": user.user_uid
       
    }
    //console.log(JSON.stringify(post_data));
    $.post(report_run_url, JSON.stringify(post_data), function (data) {
            
       
        //console.log(data)
        build_ident_run_table(data['data']);

    });

}

function build_ident_run_table(data) {
    
    var html = ``; 
    html += `<table class="table table-hover"><tr><th>Run ID</th><th>time</th><th>target</th><th>status</th><th></th><th></th><th></th></tr>`;
    


    for (var i = 0; i < data.length; i++){
        //console.log(data[i]);
        var status = data[i]['status'];

        var html_view = ``;
        var results_html = ``;
        var run_html = ``;
        if (status > 12) {
            base_id = data[i]['run_id'].split('_')[0];
           
            
            html_view = `<button class="btn btn-primary btn-sm" onclick="upload_data_afterrun('${data[i]['run_id']}')">View</button>`;
            results_html = `<a href="https://vixen.hopto.org/rs/ident_app/ident/brahma/out/decisions_${data[i]['run_id']}.json"  download='results.json'>
            
                [results]
            </a>`;
            run_html = `<button class="btn btn-primary btn-sm" onclick="run_ident_wout_upload('${base_id}')">Run Ident</button>`;
        }

        if (data[i]['status'] in status_title) {
            status = `[${data[i]['status']}] ${status_title[data[i]['status']]}`;
        }

  
        

        html += `<tr>
        
        <td>${data[i]['run_id']}</td>
        <td>${data[i]['timestamp']}</td>
        <td>${data[i]['target']}</td>
        <td>${status}</td>
        <td>
             ${html_view}
        </td>
        <td>
            ${run_html}
        </td>
        <td>
            ${results_html}
        </td>
        
        </tr>`
    }

    html += `</table>`

    var el = document.getElementById('run-table');
    el.innerHTML = html;

}