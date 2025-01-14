


class AcousticData {

    // list of snapshot ids in acoustic dataset
    snapshot_ids = [];
    // list of snapshot data structures
    snapshots = {};

    // acoustic sources data structure
    // -- wave
    sound_source = null;

    // -- raw data
    raw_acoustic_data_source = null;

    // -- active snapshot id
    active_snapshot_id = 0;

    // add snaphot
    add_snapshot(snapshot) {
        this.snapshots[snapshot.snapshot_id] = snapshot;
    }
    get_snapshot(snapshot_id) {
        return this.snapshots[snapshot_id];
    }

    get_snapshots_for_timeframe(start_time_ms, end_time_ms) {


        var valid_ids = [];
        var valid_snapshots = [];

        for (var i = 0; i < this.snapshot_ids.length; i++) {
            var snap = this.snapshots[this.snapshot_ids[i]];

            var snap_start_t = snap.timeframe_start_ms;
            if ((snap_start_t >= start_time_ms) && (snap_start_t < end_time_ms)) {
                console.log(snap);
                valid_ids.push(this.snapshot_ids[i]);
            }
        }

        for (var i = 0; i < valid_ids.length; i++) {
            valid_snapshots.push(this.snapshots[valid_ids[i]]);
        }

        return valid_snapshots;


    }

    number_snapshots = 0;

}

class Snapshot {


    constructor(snapshot_id = isRequired(), timeframe_start = isRequired(), timeframe_end = isRequired(),
        timeframe_start_js = isRequired(), timeframe_end_js = isRequired(),
        timeframe_start_ms = isRequired(), timeframe_end_ms = isRequired(),
        hydrophone_location = isRequired(), spec_location = isRequired(), density = isRequired(),
        sample_rate = isRequired()) {


        this.snapshot_id = snapshot_id;
        this.timeframe_start = timeframe_start;
        this.timeframe_end = timeframe_end;
        this.timeframe_start_ms = timeframe_start_ms;
        this.timeframe_end_ms = timeframe_end_ms;
        this.timeframe_start_js = timeframe_start_js;
        this.timeframe_end_js = timeframe_end_js;
        this.hydrophone_location = hydrophone_location;
        this.spec_location = spec_location;
        this.density = density;
        this.sample_rate = sample_rate;





    }
    label_data = [];
    delta_t = 0;
    timeframe_start_ms = "";
    timeframe_end_ms = "";
    timeframe_start_js = "";
    timeframe_end_js = "";
    snapshot_id = "";
    timeframe_start = "";
    timeframe_end = "";
    hydrophone_location = "";
    sound_source = "";
    raw_acoustic_data_source = "";
    spec_location = "";
    density = 0;
    audio_filepath = "";
    sample_rate = 0;

    data = null;



}

class AcousticPlayer {

    playing = false;
    audio_source = "";
    paused = false;
    audio = null;
    seeking = false;

    constructor() {
        this.audio = document.querySelector('#audio');
        this.audio.addEventListener('timeupdate', this.song_playing);
    }


    pause() {


        var snapshot_id = application_data.acoustic_data.active_snapshot_id;
        var el = document.getElementById(`play-${snapshot_id}`);
        if (el != null) {
            el.classList.remove("play");
            el.querySelector('i.fas').classList.add('fa-play');
            el.querySelector('i.fas').classList.remove('fa-pause');
        }
        this.audio.pause();
        this.playing = false;
        this.paused = true;



    }

    set_seeking() {
        this.seeking = true;

    }
    stop_seeking() {
        this.seeking = false;
    }

    loadAndPlay() {
        if (!this.seeking) {
            this.paused = false;
            var snapshot_id = application_data.acoustic_data.active_snapshot_id;
            if (snapshot_id != 0) {
                this.playing = true;
                var _snapshot = application_data.acoustic_data.get_snapshot(snapshot_id);
                this.audio_source = _snapshot.sound_source;
                // get application time
                var current_time = application_data.application_clock.application_time;
                // ss start time
                var ss_start_time = _snapshot.timeframe_start_ms;
                // calculate seek amount
                var seek_ms = current_time - ss_start_time;
                var seek_seconds = seek_ms / 1000;
                //const audio = document.querySelector('#audio');

                var el = document.getElementById(`play-${snapshot_id}`);
                el.classList.add("play");
                el.querySelector('i.fas').classList.remove('fa-play');
                el.querySelector('i.fas').classList.add('fa-pause');







                this.audio.src = this.audio_source;
                loadSongTitle(snapshot_id);
                this.audio.currentTime = seek_seconds;
                console.log(`seek ${seek_seconds}`);
                this.audio.play();

            }

            else {
                this.playing = false;
            }
        }

    }

    song_playing = function (e) {

        //console.log("song playing");
        var snapshot_id = application_data.acoustic_data.active_snapshot_id;
        var _snapshot = application_data.acoustic_data.get_snapshot(snapshot_id);
        var ss_start_time = _snapshot.timeframe_start_ms;
        const { duration, currentTime } = e.srcElement;
        console.log(duration, currentTime);
        application_data.application_clock.application_time = _snapshot.timeframe_start_ms + (currentTime * 1000);
        console.log(application_data.application_clock.application_time);

        //document.dispatchEvent(clockTickEvent);


    }







}

