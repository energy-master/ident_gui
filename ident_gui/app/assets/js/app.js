


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


// showDiv(id)
// hideDiv(id)

param_show = false;
run_table_show = false;
ele = document.getElementById('run-toggle');
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




function rerun_ident(base_id, run_id){

    



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
    
    var form_data = new FormData();
    form_data.append('ident_id', ident_id);
    form_data.append('user_uid', user['user_uid']);
    form_data.append('activation-level', activation_energy);
    form_data.append('80-activation-level', _80_activation_energy);
    form_data.append('number_features', number_features);
    form_data.append('structure_similarity', structure_similarity)
    form_data.append('feature_version_selector', feature_version_selector)
    form_data.append('environment_selector', environment_selector)

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
                    
                        config_html += `<td>${key}</td><td>${value}</td>`;
                  
                    }
                
                

                }

                var init_html = `
            <a href="https://vixen.hopto.org/rs/ident_app/ident/brahma/out/f_d_${data[i]['run_id']}_init_all.png" target="_blank"> init </a>
                
            `;

                var spec_pop_out_html = '';
                if (status > 12) {
                
                    base_id = data[i]['run_id'].split('_')[0];
           
                
                    html_view = `<button class="btn btn-primary btn-sm" onclick="upload_data_afterrun('${data[i]['run_id']}')">View</button>`;
                    results_html = `<a href="https://vixen.hopto.org/rs/ident_app/ident/brahma/out/decisions_${data[i]['run_id']}.json"  download='results.json'>
                
                [results]
            </a>`;
                
                    toggle_html = `<div style= "cursor:pointer;"id="toggle_${data[i]['run_id']}" onclick="toggle_run_data('run_data_${data[i]['run_id']}')">+/-</div>`;
                    run_html = `<button class="btn btn-primary btn-sm" onclick="run_ident_wout_upload('${base_id}')">Run Ident</button>`;
                
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
            


                html += `<tr>
        
        <td>${data[i]['run_id']}</td>
        <td>${data_notes}</td>
        <td>${data[i]['timestamp']}</td>
        <td>${data[i]['target']}</td>
        <td><span class="text-bg-success">${status}</span></td>
        <td>
            
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
       
        ${config_html}

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
                    
                spec_pop_out_html = `<button class="btn btn-primary btn-sm" onclick=" build_spec_window('${data[i]['run_id']}')">Spec</button>`;
               
                    
                }


                if (data[j]['status'] in status_title) {
                    status = `[${data[i]['status']}] ${status_title[data[i]['status']]}`;
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
           


            // var el = document.getElementById(`children_${p_id}`);
            // console.log(el);
            // el.innerHTML += html;
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