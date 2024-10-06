


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
            //build_energy_plot(times, energies);
        });

}


