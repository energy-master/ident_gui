



function show_kurtosis_profile(analysis_id) {
    
    
    p_data = {}
    
    var url = `https://vixen.hopto.org/rs/ident_app/ident/brahma/report/kurt_0_${analysis_id}.csv`
    console.log(url);
    d3.csv(url)
        .then((data) => {
            console.log(data);
            var times = data.map(function (d) { return d.time });
            var energies = data.map(function (d) { return parseFloat(d.kurtosis) });
            p_data[1] = energies;
            console.log(times);
            console.log(energies);
            //build_entropy_plot(times, energies);
                var url = `https://vixen.hopto.org/rs/ident_app/ident/brahma/report/kurt_5_${analysis_id}.csv`
                console.log(url);
                d3.csv(url)
                    .then((data) => {
                        console.log(data);
                        var times = data.map(function (d) { return d.time });
                        var energies = data.map(function(d) {return parseFloat(d.kurtosis)});
                        console.log(times);
                        console.log(energies);
                        p_data[2] = energies;
                        build_multiple_plot(times, p_data, 'Kurtosis Profiles');
            
        });


        });



}

function show_entropy_report(analysis_id){

    var url = `https://vixen.hopto.org/rs/ident_app/ident/brahma/report/entropy_profile_${analysis_id}.csv`
    console.log(url);
    d3.csv(url)
        .then((data) => {
            console.log(data);
            var times = data.map(function (d) { return d.time });
            var energies = data.map(function(d) {return parseFloat(d.entropy)});
            console.log(times);
            console.log(energies);
            //build_entropy_plot(times, energies);
            build_bar_plot(times,energies, 'Entropy Profile')
        });

}


function build_entropy_plot(times, energies){

    var title = `tile_${Math.floor(Math.random() * 99999)}`;
    //var title = `${location} | ${time_start} --> ${time_end}`;
    //var title_s = "Spectrogram"
    const windowFeatures = "left=100,top=100,width=1700,height=500";
    var w=window.open("", title,windowFeatures);
    w.document.body.innerHTML += `<div><canvas style="position:relative; width:100%, height:100%" id="chart_one"></canvas></div>`;


    console.log(times);
    console.log(energies);
    var ctx = w.document.getElementById('chart_one').getContext('2d');
    console.log(ctx);
    var mycolors = [];
        energies.forEach(function (item, index) {
            console.log(item, index);
            // mylabels.push(item['_t']);
            // plot_data.push(item['ref_distance']);
            // var color = 'blue';
            // var color = 'rgba(160, 160, 9, 0.9)';
            a_color = color_interpolated(parseFloat(item/10), colors['jet']);
            //console.log(item, a_color);
            mycolors.push(rgbToHex(a_color[0],a_color[1],a_color[2]));

      
        });

        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: times,
                datasets: [{
                    label: 'Signal Entropy',
                    data: energies,
                    backgroundColor:mycolors,
                    borderWidth: 1,
                    fill: false,
                    tension: 0.5,
                    borderColor: 'rgb(75, 192, 192)',
                    pointRadius: 0.5



                }
                ]
     
            },
            //options: chart_options
        });

}


function show_entropy_f_report(analysis_id){

    var url = `https://vixen.hopto.org/rs/ident_app/ident/brahma/report/entropy_freq_profile_${analysis_id}.csv`
    console.log(url);
    d3.csv(url)
        .then((data) => {
            console.log(data);
            var times = data.map(function (d) { return d.time });
            var energies = data.map(function(d) {return parseFloat(d.entropy)});
            console.log(times);
            console.log(energies);
            build_bar_plot(times, energies, 'sub band entropy');
        });

}


function build_entropy_f_plot(times, energies){

    var title = `tile_${Math.floor(Math.random() * 99999)}`;
    //var title = `${location} | ${time_start} --> ${time_end}`;
    //var title_s = "Spectrogram"
    const windowFeatures = "left=200,top=100,width=1700,height=500";
    var w=window.open("", title,windowFeatures);
    w.document.body.innerHTML += `<div><canvas style="position:relative; width:100%, height:100%" id="chart_one"></canvas></div>`;


    console.log(times);
    console.log(energies);
    var ctx = w.document.getElementById('chart_one').getContext('2d');
    console.log(ctx);
    var mycolors = [];
        energies.forEach(function (item, index) {
            //console.log(item, index);
            // mylabels.push(item['_t']);
            // plot_data.push(item['ref_distance']);
            // var color = 'blue';
            // var color = 'rgba(160, 160, 9, 0.9)';
            a_color = color_interpolated(item, colors['jet']);
            //console.log(item, a_color);
            mycolors.push(rgbToHex(a_color[0],a_color[1],a_color[2]));

      
        });

        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: times,
                datasets: [{
                    label: 'Signal Entropy',
                    data: energies,
                    backgroundColor:mycolors,
                    borderWidth: 1,
                    fill: false,
                    tension: 0.5,
                    borderColor: 'rgb(75, 192, 192)',
                    pointRadius: 0.5



                }
                ]
     
            },
            //options: chart_options
        });

}



function show_frequency_report(analysis_id) {
    var url = `https://vixen.hopto.org/rs/ident_app/ident/brahma/report/frequency_profile_${analysis_id}.csv`
    console.log(url);
    d3.csv(url)
        .then((data) => {
            console.log(data);
            var times = data.map(function (d) { return d.time });
            var energies = data.map(function(d) {return parseFloat(d.frequency)});
            console.log(times);
            console.log(energies);
            build_bar_plot(times, energies, 'Frequency Profile');
        });
}


function build_line_plot(times, energies, plot_title){

    var title = `tile_${Math.floor(Math.random() * 99999)}`;
    //var title = `${location} | ${time_start} --> ${time_end}`;
    //var title_s = "Spectrogram"
    const windowFeatures = "left=200,top=100,width=600,height=400";
    var w=window.open("", title,windowFeatures);
    w.document.body.innerHTML += `<div><canvas style="position:relative; width:100%, height:100%" id="chart_one"></canvas></div>`;


    console.log(times);
    console.log(energies);
    var ctx = w.document.getElementById('chart_one').getContext('2d');
    console.log(ctx);
    var mycolors = [];
        energies.forEach(function (item, index) {
            //console.log(item, index);
            // mylabels.push(item['_t']);
            // plot_data.push(item['ref_distance']);
            // var color = 'blue';
            // var color = 'rgba(160, 160, 9, 0.9)';
            // a_color = color_interpolated(item, colors['jet']);
            //console.log(item, a_color);
            // mycolors.push(rgbToHex(a_color[0],a_color[1],a_color[2]));

      
        });

        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: times,
                datasets: [{
                    label: plot_title,
                    data: energies,
                    backgroundColor:mycolors,
                    borderWidth: 1,
                    fill: false,
                    tension: 0.5,
                    borderColor: 'rgb(75, 192, 192)',
                    pointRadius: 0.5



                }
                ]
     
            },
            //options: chart_options
        });

}
function build_multiple_plot(times, data, plot_title){

    var title = `tile_${Math.floor(Math.random() * 99999)}`;
    //var title = `${location} | ${time_start} --> ${time_end}`;
    //var title_s = "Spectrogram"
    const windowFeatures = "left=200,top=400,width=600,height=400";
    var w=window.open("", title,windowFeatures);
    w.document.body.innerHTML += `<div><canvas style="position:relative; width:100%, height:100%" id="chart_one"></canvas></div>`;


    // console.log(times);
    // console.log(energies);
    var ctx = w.document.getElementById('chart_one').getContext('2d');
    console.log(ctx);
    var mycolors = [];
        // energies.forEach(function (item, index) {
        //     //console.log(item, index);
        //     // mylabels.push(item['_t']);
        //     // plot_data.push(item['ref_distance']);
        //     // var color = 'blue';
        //     // var color = 'rgba(160, 160, 9, 0.9)';
        //     // a_color = color_interpolated(item, colors['jet']);
        //     //console.log(item, a_color);
        //     // mycolors.push(rgbToHex(a_color[0],a_color[1],a_color[2]));

      
        // });
    console.log(data[1])
    console.log(data[2])
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: times,
                datasets: [{
                    label: plot_title,
                    data: data[1],
                    backgroundColor:mycolors,
                    borderWidth: 1,
                    fill: false,
                    tension: 0.2,
                    borderColor: 'rgb(75, 192, 192)',
                    pointRadius: 0.5



                },
                    {
                    label: plot_title,
                    data: data[2],
                    backgroundColor:mycolors,
                    borderWidth: 1,
                    fill: false,
                    tension: 0.5,
                    borderColor: 'blue',
                    pointRadius: 0.5

                    }
                ]
     
            },
            //options: chart_options
        });

}

function build_bar_plot(times, energies, plot_title){

    var title = `tile_${Math.floor(Math.random() * 99999)}`;
    //var title = `${location} | ${time_start} --> ${time_end}`;
    //var title_s = "Spectrogram"
    const windowFeatures = "left=200,top=100,width=600,height=200";
    var w=window.open("", title,windowFeatures);
    w.document.body.innerHTML += `<div><canvas style="position:relative; width:100%, height:100%" id="chart_one"></canvas></div>`;


    console.log(times);
    console.log(energies);
    var ctx = w.document.getElementById('chart_one').getContext('2d');
    console.log(ctx);
    var mycolors = [];
        max_val = Math.max.apply(Math,energies);
        energies.forEach(function (item, index) {
            //console.log(item, index);
            // mylabels.push(item['_t']);
            // plot_data.push(item['ref_distance']);
            // var color = 'blue';
            // var color = 'rgba(160, 160, 9, 0.9)';
            console.log(parseFloat(item/max_val));
            console.log(max_val);

            a_color = color_interpolated(parseFloat(item/max_val), colors['jet']);
            //console.log(item, a_color);
            mycolors.push(rgbToHex(a_color[0],a_color[1],a_color[2]));

      
        });

        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: times,
                datasets: [{
                    label: plot_title,
                    data: energies,
                    backgroundColor:mycolors,
                    borderWidth: 1,
                    fill: true,
                    tension: 0.5,
                    borderColor: 'rgb(75, 192, 192)',
                    pointRadius: 0.5



                }
                ]
     
            },
            //options: chart_options
        });

}


function show_report_downloads(calling_window_id){


     /*
        * href for ss_ids
       */
     track_analysis_snap_ids = []
     for (var ij = 0; ij < application_data.track_analysis.acoustic_snapshots.length; ij++) {
         track_analysis_snap_ids.push(application_data.track_analysis.acoustic_snapshots[ij].snapshot_id);
     }

     var ss_link = JSON.stringify(track_analysis_snap_ids);
     var data = new Blob([ss_link]);
     // var a = document.getElementById('a');
     var data_href = URL.createObjectURL(data);

    var html = `
     <div class="center-message">
    <table>
    <tr>
    <td>
    <a href="${data_href}" type='text/csv' download='ss_data.csv'><button  class="action-btn">
<i class="fas fa-file-download"></i>
</button></a>
</td>
<td>
    <a href="${application_data.track_analysis.audio_file_url}"  download='custom_wav.wav'><button  class="action-btn">
<i class="fas fa-file-download"></i>
</button></a>
</td>
<td>
    <a href="${application_data.track_analysis.mp3_file_url}" download='custom_mp3.mp3'><button  class="action-btn">
<i class="fas fa-file-download"></i>
</button></a>
</td>
</tr>
</table>
</div>
`;


var el = document.getElementById(`download_${calling_window_id}`);
el.innerHTML = html;
}