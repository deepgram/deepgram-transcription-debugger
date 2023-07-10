let wordsRegionKey = 'wordRegion';
let overviewRegionKey = 'overviewRegion';
let playTimeout = null;
let playing = false;
let dragging = false;
let transcript = null;
document.getElementById("fileinput").addEventListener('change', function(e){
    var file = this.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
            var blob = new window.Blob([new Uint8Array(evt.target.result)]);
            let audio = new Audio();
            audio.src = URL.createObjectURL(blob);
            
            wavesurfer.load(audio.src);
            wavesurferOverview.load(audio.src);
        };

        reader.onerror = function (evt) {
            console.error("An error ocurred reading the file: ", evt);
        };

        reader.readAsArrayBuffer(file);
    }
}, false);

document.getElementById('play').addEventListener('click', () => {
    wavesurfer.playPause()
    let val = document.getElementById('play').value;
    if(val == 'Play'){
        document.getElementById('play').value = 'Pause';
    } else {
        document.getElementById('play').value = 'Play';
    }
})

function loadAudioTranscript(){
    let loading = document.getElementById('loading');
    loading.style.display = 'block';
    var input = document.getElementById('fileinput');

    var data = new FormData();
    data.append('file', input.files[0]);

    const formData = new FormData()
    formData.append('files', input.files[0])

    fetch('https://satori-ai.glitch.me/upload_files', {
        method: 'post',
        body: formData,
    })
    .then(response => response.json())
    .then((res) => {
        transcript = res.transcript.results.channels[0].alternatives[0].words;
        let html = '';
        transcript.forEach((word, index)=>{
            html += createWord(word, index);
            wavesurfer.addRegion({
                start: word.start,
                end: word.end,
                color: '#38edac44',
                drag: false,
                resize: false,
                attributes: {
                    label: word.word
                  }
            })

            wavesurferOverview.addRegion({
                start: word.start,
                end: word.end,
                color: '#38edac44',
                drag: false,
                resize: false,
                // attributes: {
                //     label: word.word
                //   }
            })
        })
        document.getElementById('words').innerHTML = html;
        loading.style.display = 'none';
    })
    .catch((err) => ('Error occurred', err))
}

function createWord(word, index){
    let similar = similarity(word.word, word.punctuated_word);
    let similarityClass = '';
    let similarityThreshold = 0.75;
    // Ignore single letters
    if(word.word.length == 1){
        similarityThreshold = 0;
    } 
    // Check if half the two letters are the same
    else if(word.word.length == 2){
        similarityThreshold = 0.5;
    } 
    // Check if 1 of the 3 letters are the same
    else if(word.word.length == 3){
        similarityThreshold = 0.66;
    }

    if(similar < similarityThreshold){
        similarityClass = 'warning';
    }
    let html = `<div class="wordDiv ${similarityClass}" id="word_div_${index}">
        <span class="word" id="word_${index}">${word.word}</span>
        <br>
        <span class="punctuation" id="punctuation_${index}">${word.punctuated_word}</span>
    </div>`;

    return html;
}

function linkTimelines(){
    // let wordRegion = {
    //     id: wordsRegionKey,
    //     start: 0,
    //     end: 5,
    //     color: '#0000FF88',
    //     drag: false,
    //     resize: false
    // }
    // wavesurfer.addRegion(wordRegion);

    let overviewRegion = {
        id: overviewRegionKey,
        start: 0,
        end: 5,
        color: '#0000FF88',
        drag: true,
        resize: false,
    };
    wavesurferOverview.addRegion(overviewRegion);

    wavesurferOverview.on('region-click', (region) => {
        if(region.id == overviewRegionKey){
            wavesurfer.pause();
            document.getElementById('play').value = 'Play';
        }
    });
        

    wavesurferOverview.on('region-updated', (region) => {
        if(region.id == overviewRegionKey && !playing){
            dragging = true;
            let start = region.start;
            let end = region.end;
            let center = (start + ((end-start) / 2));
            wavesurfer.play(center);
            wavesurfer.pause();
            wavesurferOverview.play(center);
            wavesurferOverview.pause();
            let progress = center / wavesurfer.backend.getDuration();
            wavesurfer.drawer.recenter(progress)
        }
    });

    wavesurferOverview.on('region-update-end', (region) => {
        if(region.id == overviewRegionKey){
            dragging = false;
            if(playing){
                wavesurfer.play();
            }
        }
    });
    

    wavesurfer.on('audioprocess', (currentTime)=>{
        playing = true;
        if(!dragging){
            wavesurferOverview.regions.list[overviewRegionKey].update({ start: currentTime, end: currentTime+5 });

            transcript.forEach((word, index)=>{
                if(currentTime > word.start && currentTime < word.end){
                    document.getElementById('word_div_'+index).style.border = '1px solid #ee028b';
                } else {
                    document.getElementById('word_div_'+index).style.border = 'none';
                }
            });
        }
    })

    wavesurfer.on('play', ()=>{
        playing = true;
    });

    wavesurfer.on('pause', ()=>{
        playing = false;
    });

    document.getElementById('waveform').addEventListener('scroll',function(e){
        let x = wavesurfer.drawer.getScrollX();
    })
}
