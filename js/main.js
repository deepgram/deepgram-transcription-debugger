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
            let button = document.getElementById('play');
            button.style.display = '';
            dropzone.style.display = 'none';
            document.getElementById('sample').style.display = 'none';
        };

        reader.onerror = function (evt) {
            console.error("An error ocurred reading the file: ", evt);
        };

        reader.readAsArrayBuffer(file);
    }
}, false);

document.getElementById("compare").addEventListener('change', function(e){
    var file = this.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
            var obj = JSON.parse(evt.target.result);
            console.log('JSON:', obj);
        };

        reader.onerror = function (evt) {
            console.error("An error ocurred reading the file: ", evt);
        };

        reader.readAsText(file);
    }
}, false);

document.getElementById('play').addEventListener('click', () => {
    let button = document.getElementById('play');
    wavesurfer.playPause();
    let className = button.className;
    if(className != 'pressed'){
        button.src = './images/pause.png';
        button.classList.add('pressed');
    } else {
        button.src = './images/play.png';
        button.classList.remove('pressed');
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

    let model = document.getElementById('model').value;
    let multichannel = document.getElementById('multichannel').checked;
    
    let smart_format = document.getElementById('smart_format').checked;
    let punctuate = document.getElementById('punctuation').checked;
    let paragraphs = document.getElementById('paragraphs').checked;
    let utterances = document.getElementById('utterances').checked;
    
    let numerals = document.getElementById('numerals').checked;
    let profanity_filter = document.getElementById('profanity_filter').checked;
    //   let redact = ;
    //   let replace = ;
    
    //   let search = ;
    //   let keywords = ;
    let diarize = document.getElementById('diarization').checked;
    
    let summarize = document.getElementById('summarization').checked;
    let detect_topics = document.getElementById('topic_detection').checked;
    let detect_entities = document.getElementById('entity_detection').checked;

    let url = `https://satori-ai.glitch.me/upload_files?model=${model}&multichannel=${multichannel}&smart_format=${smart_format}&punctuate=${punctuate}&paragraphs=${paragraphs}&utterances=${utterances}&numerals=${numerals}&profanity_filter=${profanity_filter}&diarize=${diarize}&summarize=${summarize}&detect_topics=${detect_topics}&detect_entities=${detect_entities}&`;
    fetch(url, {
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
    let html = `<div class="wordDiv ${similarityClass}" id="word_div_${index}" onclick="jumpToWord(${index})">
        <span class="word" id="word_${index}">${word.word}</span>
        <br>
        <span class="punctuation" id="punctuation_${index}">${word.punctuated_word}</span>
    </div>`;

    return html;
}

function jumpToWord(index){
    let word = transcript[index];
    let progress = word.start / wavesurfer.backend.getDuration();
    wavesurfer.drawer.recenter(progress);
    wavesurfer.play(word.start);
    let button = document.getElementById('play');
    button.src = './images/pause.png';
    button.classList.add('pressed');
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
            let button = document.getElementById('play');
            button.src = './images/play.png';
            button.classList.remove('pressed');
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
                let div = document.getElementById('word_div_'+index);
                if(currentTime > word.start && currentTime < word.end){
                    div.style.border = '1px solid #ee028b';
                } else {
                    div.style.border = '1px solid transparent';
                    div.style.display = 'inline-block';
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
