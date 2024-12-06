


var status_title = {
    0: 'Server has accepted job.',
    1: 'building data adapter for input data. This may take a while!',
    2: 'Data adapter already exists.',
    3: 'Saving new data adapter.',
    4: 'Loading existing data adapter.',
    5: 'Starting feature run.',
    11: 'Starting decision making.',
    12: 'Decision making complete.',
    13: 'Spectrogram built & saved.',
    10: 'Run complete.',
    4.5: 'Loading bots. This may take a while!',
    1.1: 'Downloading data file. This may take a while!',
    1.2: 'Building data adapter.',
    1.3: 'About to prepare marlin_data.',
    12.1: 'Merging multiple processor threads.',
    12.2: 'Saving game.',
    12.3: 'Building plots.',
    12.4: 'Saving decisions.'
}


// showDiv(id)
// hideDiv(id)

param_show = false;
run_table_show = false;
data_table_show = true;

ele = document.getElementById('run-toggle');

ele_data = document.getElementById('data-toggle');

console.log(ele);
ele.addEventListener("click", function () {
    
    if (run_table_show ==false) {
        showDiv('run-table'); 
        run_table_show = true;
        return;
    }
    if (run_table_show ==true) {
        hideDiv('run-table'); 
        run_table_show  = false;
        return;
    }

   
    

});

var data_table_show = false;

ele_data.addEventListener("click", function () {
    
    if (data_table_show ==false) {
        showDiv('data-table'); 
        data_table_show = true;
        return;
    }
    if (data_table_show ==true) {
        hideDiv('data-table'); 
        data_table_show  = false;
        return;
    }

   
    

});

ele = document.getElementById('param-toggle');
console.log(ele);
ele.addEventListener("click", function () {
    
    if (param_show==false) {
        showDiv('params'); 
        param_show = true;
        return;
    }
    if (param_show==true) {
        hideDiv('params'); 
        param_show = false;
        return;
    }

   
    

}); 

el = document.getElementById('data-upload');
el.addEventListener("click", run_ident); 

el = document.getElementById('data-upload-only');
el.addEventListener("click", run_ident_upload_only); 


function toggle_run_data(div_id) {
    console.log(div_id + "_config");
    elem = document.getElementById(div_id);
    elem2 = document.getElementById(div_id+"_config");
    if (elem.style.display == "none") {
        elem.style.display = "block";
        elem2.style.display = "block";
        active_run_ids.push(div_id);
        return;
    }
     if (elem.style.display == "block") {
         elem.style.display = "none";
         elem2.style.display = "none";
        var index = active_run_ids.indexOf(div_id);
        if (index !== -1) {
        active_run_ids.splice(index, 1);
        }
        return;
    }

}

var waiting_run = false;
var waiting_id = 0;
var waiting_data = {}

function run_ident() {
    
    el.style.color = 'red';
    
    var base_id = Math.floor(Math.random() * 1000);
    var ident_id = base_id + "_" + Math.floor(Math.random() * 1000); // 213;
    
    waiting_run = true;
    waiting_id = ident_id;
    waiting_data = {
        'run_id' : ident_id,
        'status' : "Submitted: Waiting for server..."
    }

    var file_data = null;
    file_data = $('#upload_file').prop('files')[0];   
    if ((file_data == undefined)) {
        alert('Please submit a valid file.')
        return;
    }
   // console.log(file_data);
    
    number_features = document.getElementById('number_features').value;
    var ele = document.getElementById('activation-level');
    activation_energy = ele.value;
    
    _80_activation_energy = document.getElementById('above_e_threshold').value;
    structure_similarity = document.getElementById('structure_similarity').value;
    feature_version_selector = document.getElementById('feature_version_selector').value;
    environment_selector = document.getElementById('environment_selector').value;
    version_time_from = document.getElementById('version_time_from').value;
    version_time_to = document.getElementById('version_time_to').value;

    var form_data = new FormData();
    
    form_data.append('upload_file', file_data);
    form_data.append('base_id', base_id);
    form_data.append('ident_id', ident_id);
    form_data.append('environment_selector', environment_selector);
    form_data.append('feature_version_selector', feature_version_selector);
    form_data.append('user_uid', user['user_uid']);
    form_data.append('activation-level', activation_energy);
    form_data.append('80-activation-level', _80_activation_energy);
    form_data.append('number_features', number_features);
    form_data.append('structure_similarity', structure_similarity)
    form_data.append('version_time_from', version_time_from)
    form_data.append('version_time_to', version_time_to)


    alert(`Your job has been submitted - ${user['user_uid']} `); 
    
    // send data notes here. Can't wait below as it may take too long. Must assume data is uploaded. Maybe x check after success.
    // audit data
    var notes = document.getElementById('data-notes').value;
    post_data = {
        'user_uid': user['user_uid'],
        'notes': notes,
        'data_id' : base_id
    }

    notes_url = 'https://vixen.hopto.org/rs/api/v1/data/datanotes/';
        $.post(notes_url, JSON.stringify(post_data), function (data) {
    });

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


function run_ident_upload_only() {
    alert('uploading data only.')
    el.style.color = 'red';
    
    var base_id = Math.floor(Math.random() * 1000);
    var ident_id = base_id + "_" + Math.floor(Math.random() * 1000); // 213;
    
    waiting_run = true;
    waiting_id = ident_id;
    waiting_data = {
        'run_id' : ident_id,
        'status' : "Submitted: Waiting for server..."
    }

    var file_data = null;
    file_data = $('#upload_file').prop('files')[0];   
    if ((file_data == undefined)) {
        alert('Please submit a valid file.')
        return;
    }
   // console.log(file_data);
    
    number_features = document.getElementById('number_features').value;
    var ele = document.getElementById('activation-level');
    activation_energy = ele.value;
    
    _80_activation_energy = document.getElementById('above_e_threshold').value;
    structure_similarity = document.getElementById('structure_similarity').value;
    feature_version_selector = document.getElementById('feature_version_selector').value;
    environment_selector = document.getElementById('environment_selector').value;
    version_time_from = document.getElementById('version_time_from').value;
    version_time_to = document.getElementById('version_time_to').value;

    var form_data = new FormData();
    
    form_data.append('upload_file', file_data);
    form_data.append('base_id', base_id);
    form_data.append('ident_id', ident_id);
    form_data.append('environment_selector', environment_selector);
    form_data.append('feature_version_selector', feature_version_selector);
    form_data.append('user_uid', user['user_uid']);
    form_data.append('activation-level', activation_energy);
    form_data.append('80-activation-level', _80_activation_energy);
    form_data.append('number_features', number_features);
    form_data.append('structure_similarity', structure_similarity)
    form_data.append('version_time_from', version_time_from)
    form_data.append('version_time_to', version_time_to)


    alert(`Your job has been submitted - ${user['user_uid']} `); 
    
    // send data notes here. Can't wait below as it may take too long. Must assume data is uploaded. Maybe x check after success.
    // audit data
    var notes = document.getElementById('data-notes').value;
    post_data = {
        'user_uid': user['user_uid'],
        'notes': notes,
        'data_id' : base_id
    }

    notes_url = 'https://vixen.hopto.org/rs/api/v1/data/datanotes/';
    $.post(notes_url, JSON.stringify(post_data), function (data) {
        // console.log(data);
    });

    //alert(form_data);   
    el.style.color = 'blue';
    $.ajax({
        url: '../cgi-bin/upload_data_only.php', // <-- point to server-side PHP script 
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


function rerun_ident(base_id, run_id){

    


    console.log('replay');
    alert(`Rerun Job submitted for [${base_id}] [${run_id}]`)
    // var ident_id = base_id + "_" + Math.floor(Math.random() * 1000); // 213;
    var ident_id = run_id
    var new_game_id = base_id + "_" + Math.floor(Math.random() * 1000); // 213;
    
    waiting_run = true;
    waiting_id = ident_id;
    waiting_data = {
        'run_id' : ident_id,
        'status' : "Submitted: Waiting for server..."
    }

    number_features = document.getElementById('number_features').value;

    var ele = document.getElementById('activation-level');
    activation_energy = ele.value;
    _80_activation_energy = document.getElementById('above_e_threshold').value;
    structure_similarity = document.getElementById('structure_similarity').value;
    feature_version_selector = document.getElementById('feature_version_selector').value;
    environment_selector = document.getElementById('environment_selector').value;

    version_time_from = document.getElementById('version_time_from').value;
    version_time_to = document.getElementById('version_time_to').value;
    var form_data = new FormData();
    form_data.append('ident_id', ident_id);
    form_data.append('new_game_id', new_game_id);
    form_data.append('base_id', base_id);
    form_data.append('user_uid', user['user_uid']);
    form_data.append('activation-level', activation_energy);
    form_data.append('80-activation-level', _80_activation_energy);
    form_data.append('number_features', number_features);
    form_data.append('structure_similarity', structure_similarity);
    form_data.append('feature_version_selector', feature_version_selector);
    form_data.append('environment_selector', environment_selector);
    form_data.append('version_time_from', version_time_from);
    form_data.append('version_time_to', version_time_to);
    console.log(form_data);
    $.ajax({
        url: '../cgi-bin/replay.php', // <-- point to server-side PHP script 
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
            alert("Your data has been uploaded and run is complete. Please access results below."); 
        }
        });
}




function run_batch_wout_upload(){

    base_id = "batch";



    alert(`Job submitted for [${base_id}]`)

    var ident_id = base_id + "_" + Math.floor(Math.random() * 1000); // 213;
    
    waiting_run = true;
    waiting_id = ident_id;
    waiting_data = {
        'run_id' : ident_id,
        'status' : "Submitted: Waiting for server..."
    }

    number_features = document.getElementById('number_features').value;

    var ele = document.getElementById('activation-level');
    activation_energy = ele.value;
    _80_activation_energy = document.getElementById('above_e_threshold').value;
    structure_similarity = document.getElementById('structure_similarity').value;
    feature_version_selector = document.getElementById('feature_version_selector').value;
    environment_selector = document.getElementById('environment_selector').value;
    version_time_from = document.getElementById('version_time_from').value;
    version_time_to = document.getElementById('version_time_to').value;
    
    var form_data = new FormData();
    form_data.append('ident_id', ident_id);
    form_data.append('user_uid', user['user_uid']);
    form_data.append('activation-level', activation_energy);
    form_data.append('80-activation-level', _80_activation_energy);
    form_data.append('number_features', number_features);
    form_data.append('structure_similarity', structure_similarity);
    form_data.append('feature_version_selector', feature_version_selector);
    form_data.append('environment_selector', environment_selector);
    form_data.append('version_time_from', version_time_from);
    form_data.append('version_time_to', version_time_to);
    form_data.append('batch_params', batch_string);

    console.log(form_data);
    
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
            alert(php_script_response); // <-- display response from the PHP script, if any
            // upload_data_afterrun(ident_id)
            alert("Your data has been uploaded and run is complete. Please access results below."); 
        }
        });
}




function run_ident_wout_upload(base_id){

    



    alert(`Job submitted for [${base_id}]`)

    var ident_id = base_id + "_" + Math.floor(Math.random() * 1000); // 213;
    
    waiting_run = true;
    waiting_id = ident_id;
    waiting_data = {
        'run_id' : ident_id,
        'status' : "Submitted: Waiting for server..."
    }

    number_features = document.getElementById('number_features').value;

    var ele = document.getElementById('activation-level');
    activation_energy = ele.value;
    _80_activation_energy = document.getElementById('above_e_threshold').value;
    structure_similarity = document.getElementById('structure_similarity').value;
    feature_version_selector = document.getElementById('feature_version_selector').value;
    environment_selector = document.getElementById('environment_selector').value;
    version_time_from = document.getElementById('version_time_from').value;
    version_time_to = document.getElementById('version_time_to').value;
    
    var form_data = new FormData();
    form_data.append('ident_id', ident_id);
    form_data.append('user_uid', user['user_uid']);
    form_data.append('activation-level', activation_energy);
    form_data.append('80-activation-level', _80_activation_energy);
    form_data.append('number_features', number_features);
    form_data.append('structure_similarity', structure_similarity)
    form_data.append('feature_version_selector', feature_version_selector)
    form_data.append('environment_selector', environment_selector)
    form_data.append('version_time_from', version_time_from)
    form_data.append('version_time_to', version_time_to)

    console.log(form_data);
    
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
            alert(php_script_response); // <-- display response from the PHP script, if any
            // upload_data_afterrun(ident_id)
            alert("Your data has been uploaded and run is complete. Please access results below."); 
        }
        });
}


function upload_data_afterrun(run_id){
    //load game vis
    window.open(`../game/index.php?snapshot_id=${run_id}&location=upload`,`${Math.floor(Math.random() * 99999)}`,'width=1000,height=700');

}

//

function show_data_uploads() {

        var notes_post_data = {
              "user_uid": user.user_uid
        }
        notes_run_url = "https://vixen.hopto.org/rs/api/v1/data/getdatanotes";
        $.post(notes_run_url, JSON.stringify(notes_post_data), function (data_notes) {
           // console.log(data_notes['data']);
            build_upload_data_table(data_notes['data']);
        });


       

    

}

function data_check_click(data_id) {
    
    data_check_state[data_id] = !data_check_state[data_id];
    // console.log(data_check_state);
    batch_string = "";
    number_batch = 0;
    for (const [key, value] of Object.entries(data_check_state)) {
        if (value == true) {
            number_batch += 1;
            var run_id = `${key}_${Math.floor(Math.random() * 99999)}`;
            batch_string += ` ${run_id}`;
        }
    }

    batch_string = `${number_batch} ${batch_string}`;
    console.log(batch_string);

}

var data_check_state = {};
number_batch = 0;
batch_string = "";

function build_upload_data_table(upload_data) {
    

    var html = `<table class="table table-hover">`;

    html += `
        <tr class="table">
        <td>data id</td>
        <td>upload time</td>
        <td>notes</td>
        <td></td>
        </tr>
    `;
    
    for (var i = 0; i < upload_data.length; i++) {
        // // console.log()
        // var base_id = upload_data[i]['data_id'].split('_')[0];
        var run_html = `<button class="btn btn-primary btn-sm" onclick="run_ident_wout_upload('${upload_data[i]['data_id']}')">Run Ident</button>`;
        var check_box_html = "";
          check_box_html = `
                    <input type="checkbox"  value="${upload_data[i]['data_id']}" onclick = "data_check_click('${upload_data[i]['data_id']}') " >
                 `;
        // for (const state in data_check_state) {
            
        //     if (state == true){
        //         check_box_html = `
        //             <input type="checkbox"  value="${upload_data[i]['data_id']}" onclick = "data_check_click('${upload_data[i]['data_id']}') checked">
        //          `;
        //     }
        //     else {
        //          check_box_html = `
        //             <input type="checkbox"  value="${upload_data[i]['data_id']}" onclick = "data_check_click('${upload_data[i]['data_id']}')">
        //          `;
        //     }
        // }
        if (data_check_state[upload_data[i]['data_id']]) {
             check_box_html = `
                    <input type="checkbox"  value="${upload_data[i]['data_id']}" onclick = "data_check_click('${upload_data[i]['data_id']}')" checked>
                 `;
        }
        
        html += `
        <tr>
        <td>${check_box_html}</td>
        <td>${upload_data[i]['data_id']}</td>
        <td>${upload_data[i]['timestamp']}</td>
         <td>${upload_data[i]['notes']}</td>
         <td> ${run_html} </td>
        </tr>
        `;
    }



    html += `</table>`;


    var el = document.getElementById('data-table');
    el.innerHTML = html;


}


function grab_ident_runs(){
    var report_run_url = "https://vixen.hopto.org/rs/api/v1/data/ident/get_runs";

    var post_data = {
        "user_uid": user.user_uid
       
    }
    //console.log(JSON.stringify(post_data));
    $.post(report_run_url, JSON.stringify(post_data), function (data) {
            
        
        //get data notes
        var notes_post_data = {
              "user_uid": user.user_uid
        }
        notes_run_url = "https://vixen.hopto.org/rs/api/v1/data/getdatanotes";
        $.post(notes_run_url, JSON.stringify(post_data), function (data_notes) {
            // console.log(data_notes['data']);
            build_ident_run_table(data['data'], data_notes['data']);
        });


       

    });

}


var active_run_ids = []

function build_ident_run_table(data, notes = []) {
    

    var html = ``; 
    html += `<table class="table table-hover"><tr><th>Run ID</th><th>data notes</th><th>time</th><th>target</th><th>status</th><th></th><th></th><th></th><th><th></th></th><th></th><th></th></tr>`;
 

    if (waiting_run == true) {
        html += `
        <tr class="table-success">
        <td>${waiting_id}</td>
        <td>---</td>
        <td>now</td>
        <td>---</td>
        <td>${waiting_data['status']}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        </tr>
        `;
    }
    
    if ('success' in data[0]) {
        
    }
    else {
        for (var i = 0; i < data.length; i++) {
            var parent = false;
            d = data[i]['run_id'].split('_');
            if (d.length == 2) {
                base = d[0];
                id = d[1]
                parent = true;
            }
            
            if (parent == true) {

                if (data[i]['run_id'] == waiting_id) {
                    waiting_run = false;
                    waiting_id = 0;
                    waiting_data = {};
                }

                //console.log(data[i]);
                base_id = data[i]['run_id'].split('_')[0];
                var status = data[i]['status'];
                var data_notes = 'no notes';
                for (note in notes) {
                    if (notes[note]['data_id'] == base_id) {
                        data_notes = notes[note]['notes'];
                    }
                }
            
                var config_obj = '';
                var img_html = '';
                var toggle_html = '';
                var html_view = ``;
                var results_html = ``;
                var run_html = ``;
                var rerun_html = ``;
                var config_html = '';
                if ("0" in data[i]) {
                    config_obj = data[i]["0"];
                }
                if (config_obj == null) {
                    config_html = '';
                }
                else {
                    config_obj = (data[i]["0"]);
                    //console.log(config_obj);
                    config_html = '';
                    for (const [key, value] of Object.entries(config_obj)) {
                    
                        config_html += `<tr><td>${key}</td><td></td><td>${value}</td></tr>`;
                  
                    }
                
                

                }

            //     var init_html = `
            // <a href="https://vixen.hopto.org/rs/ident_app/ident/brahma/out/f_d_${data[i]['run_id']}_init_all.png" target="_blank"> init </a>
                
            // `;
                 var init_html = 
           `<button class="btn btn-primary btn-sm" onclick=" build_init_window('${data[i]['run_id']}')">Init</button>`;    
            ;
                

                var spec_pop_out_html = '';
                if (status > 12) {
                
                    base_id = data[i]['run_id'].split('_')[0];
           
                
                    html_view = `<button class="btn btn-primary btn-sm" onclick="upload_data_afterrun('${data[i]['run_id']}')">View</button>`;
                    results_html = `<a href="https://vixen.hopto.org/rs/ident_app/ident/brahma/out/decisions_${data[i]['run_id']}.json"  download='${data[i]['run_id']}.json'>
                
                [results]
            </a>`;
                //build_params_window
                    // toggle_html = `<div style= "cursor:pointer;"id="toggle_${data[i]['run_id']}" onclick="toggle_run_data('run_data_${data[i]['run_id']}')">+/-</div>`;
                    run_html = `<button class="btn btn-primary btn-sm" onclick="run_ident_wout_upload('${base_id}')">Run Ident</button>`;
                    toggle_html = `<button class="btn btn-primary btn-sm" onclick="build_params_window('${config_html}')">Config</button>`;
               
                    rerun_html = `<button class="btn btn-primary btn-sm" onclick="rerun_ident('${base_id}','${data[i]['run_id']}')">Replay</button>`;
                    img_html = `<img src="https://vixen.hopto.org/rs/ident_app/ident/brahma/out/spec/${data[i]['run_id']}.png"></img>`;
                    spec_pop_out_html = `<button class="btn btn-primary btn-sm" onclick=" build_spec_window('${data[i]['run_id']}')">Spec</button>`;
               
                }

                if (data[i]['status'] in status_title) {
                    status = `[${data[i]['status']}] ${status_title[data[i]['status']]}`;
                }

                //console.log(active_run_ids)
                var run_style = `style="display:none"`;
                //console.log(`run_data_${data[i]['run_id']}`);
                if (active_run_ids.includes(`run_data_${data[i]['run_id']}`)) {
                    //console.log('found');
                    run_style = `style="display:block"`;
                }
            


                html += `<tr class="table-success">
        
        <td>${data[i]['run_id']}</td>
        <td>${data_notes}</td>
        <td>${data[i]['timestamp']}</td>
        <td>${data[i]['target']}</td>
        <td><span class="text-bg-success">${status}</span></td>
        <td>
            ${html_view}
        </td>
        <td>
            ${run_html}
        </td>
        <td>
            ${rerun_html}
        </td>
        <td>
            ${results_html}
        </td>
        <td>
        ${spec_pop_out_html}
        </td>
         <td>
            ${toggle_html}
        </td>
        <td>
           ${init_html}
           </td>
        


        </tr>
       
        <tr class="table-success" id ="run_data_${data[i]['run_id']}_config" ${run_style}">
       
        

        </tr>
       

        <tr id ="run_data_${data[i]['run_id']}" ${run_style}">
        <td colspan=9>
            ${img_html}
        </td>
        
        </tr>`;
            
      
        for (var j = 0; j < data.length; j++) {
        d = data[j]['run_id'].split('_');
        
        if (d.length > 2) {
            
            p_id = d[0] + '_' + d[1];
            // console.log(p_id);
            if (p_id == `${ data[i]['run_id'] }`)
            {
                var spec_pop_out_html = '';
                var results_html = '';
                var html_view = '';
                var init_html = `
                <a href="https://vixen.hopto.org/rs/ident_app/ident/brahma/out/f_d_${data[j]['run_id']}_init_all.png" target="_blank"> init </a>
                    
                `;
                if (data[j]['status'] > 12) {
                html_view = `<button class="btn btn-primary btn-sm" onclick="upload_data_afterrun('${data[j]['run_id']}')">View</button>`;
                
                results_html = `<a href="https://vixen.hopto.org/rs/ident_app/ident/brahma/out/decisions_${data[j]['run_id']}.json"  download='results.json'>
                
                [results]
                </a>`;
                    
                spec_pop_out_html = `<button class="btn btn-primary btn-sm" onclick=" build_spec_window('${data[j]['run_id']}')">Spec</button>`;
               
                    
                }


                if (data[j]['status'] in status_title) {
                    status = `[${data[j]['status']}] ${status_title[data[j]['status']]}`;
                }
                else {
                    status = data[j]['status'];
                }
                 
                html += `
            
                <tr>
                <td>${data[j]['run_id']}</td>
                <td></td>
                <td>${data[j]['timestamp']}</td>
                <td>${data[j]['target']}</td>
                <td>${status}</td>
                <td>${html_view}</td>
                <td></td>
                <td></td>
                <td>${results_html}</td>
                <td>${spec_pop_out_html}</td>
                <td></td>
                <td></td>
                </tr>
            
                `;
                
            }
        
        }
    }

                
       
        
        html += `
        </div>

        `;
            }//parent
            
           

            } // we have data 

            html += `</table>`;
        }
    
        var el = document.getElementById('run-table');
        el.innerHTML = html;
        

    // build children data
    // for (var i = 0; i < data.length; i++) {
    //     d = data[i]['run_id'].split('_');
        
    //     if (d.length > 2) {
            
    //         p_id = d[0] + '_' + d[1];
    //         console.log(p_id);
    //         var html = `
            
    //             <tr>
    //             <td>
    //                 ${data[i]['run_id']}
    //             </td>
    //             </tr>
            
    //         `;


    //         // var el = document.getElementById(`children_${p_id}`);
    //         // console.log(el);
    //         // el.innerHTML += html;
    //     }
    // }



    // add to table
   

}
children_data = {}

function build_spec_window(identifier) {
    var title = `${Math.floor(Math.random() * 99999)}`;
    const windowFeatures = "left=200,top=100,width=700,height=500";
    w=window.open("", title,windowFeatures);
    
    var page_html = `
    <img src = "http://vixen.hopto.org/rs/ident_app/ident/brahma/out/spec/${identifier}.png" width=400 heigh=300></img>
    `;
    w.document.body.innerHTML = page_html;
    
    // w.title = `${location} | ${time_start} --> ${time_end}`;
    // w.innerHTML = html;
    // console.log(`${location} | ${time_start} --> ${time_end}`);
    

}

function build_init_window(identifier) {
    var title = `${Math.floor(Math.random() * 99999)}`;
    const windowFeatures = "left=200,top=100,width=700,height=500";
    w=window.open("", title,windowFeatures);
    
    var page_html = `
    <img src = "http://vixen.hopto.org/rs/ident_app/ident/brahma/out/f_d_${identifier}_init_all.png" width=400 heigh=300></img>
    `;
    w.document.body.innerHTML = page_html;
    
    // w.title = `${location} | ${time_start} --> ${time_end}`;
    // w.innerHTML = html;
    // console.log(`${location} | ${time_start} --> ${time_end}`);
    

}
https://vixen.hopto.org/rs/ident_app/ident/brahma/out/f_d_80_89_init_all.png
function build_params_window(config_html) {
    console.log(config_html);
    var title = `${Math.floor(Math.random() * 99999)}`;
    const windowFeatures = "left=200,top=100,width=400,height=400";
    w=window.open("", title,windowFeatures);
    
    var html = `
    <table><tr><th></th><th><th></th></th></tr>
    ${config_html}
    </table>
    `;

    w.document.body.innerHTML = html;

}

