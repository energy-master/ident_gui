


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
            build_entropy_plot(times, energies);
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
            build_entropy_plot(times, energies);
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

