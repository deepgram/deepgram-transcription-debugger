
document.getElementById("fileinput").addEventListener('change', function(e){
    var file = this.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
            var blob = new window.Blob([new Uint8Array(evt.target.result)]);
            audio = new Audio();
            audio.src = URL.createObjectURL(blob);
            
            wavesurfer.load(audio.src);
            wavesurferOverview.load(audio.src);
            let controls = document.getElementById('controls');
            controls.style.display = '';
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

document.getElementById("params").addEventListener('change', function(e){
    try{
        let params = document.getElementById("params").value.split('&');
        let elms = {
            model: document.getElementById('model'),
            tier: document.getElementById('tier'),
            language: document.getElementById('language'),
            multichannel: document.getElementById('multichannel'),
            sentiment: document.getElementById('sentiment'),
            
            smart_format: document.getElementById('smart_format'),
            punctuate: document.getElementById('punctuation'),
            paragraphs: document.getElementById('paragraphs'),
            utterances: document.getElementById('utterances'),
            
            numerals: document.getElementById('numerals'),
            profanity_filter: document.getElementById('profanity_filter'),
            redact: document.getElementById('redaction'),
            replace: document.getElementById('find_replace'),
        
            search: document.getElementById('search'),
            keywords: document.getElementById('keywords'),
            diarize: document.getElementById('diarization'),
            
            summarize: document.getElementById('summarization'),
            detect_topics: document.getElementById('topic_detection'),
            detect_entities: document.getElementById('entity_detection')
        }
        params.forEach((param)=>{
            let keyValue = param.split('=');
            let key = keyValue[0];
            let value = keyValue[1];
            if(key == 'model' || key == 'tier' || key == 'language' && elms[key]){
                elms[key].value = value;
            } else if(key == 'redact' || key == 'replace' || key == 'search' || key == 'keywords' && elms[key]) {
                if(!elms[key].value){
                    elms[key].value = key +'='+value;
                } else {
                    elms[key].value += '&' + key +'='+value;
                }
            } else if(elms[key]) {
                elms[key].checked = value == 'true' ? true : false;
            }
        })
    } catch(err){
        console.log(err);
    }
});

document.getElementById('play').addEventListener('click', () => {
    let play = document.getElementById('play');
    let pause = document.getElementById('pause');
    wavesurfer.play();
    let className = play.className;
    if(className != 'pressed'){
        play.classList.add('pressed');
        pause.classList.remove('pressed');
    } else {
        play.classList.remove('pressed');
        pause.classList.add('pressed');
    }
})

document.getElementById('pause').addEventListener('click', () => {
    let play = document.getElementById('play');
    let pause = document.getElementById('pause');
    wavesurfer.pause();
    let className = pause.className;
    if(className != 'pressed'){
        pause.classList.add('pressed');
        play.classList.remove('pressed');
    } else {
        pause.classList.remove('pressed');
        play.classList.add('pressed');
    }
})

document.getElementById('update').addEventListener('click', () => {
    loadAudioTranscript();
    document.getElementById('words').innerHTML = '';
    document.getElementById('paragraphs').innerHTML = '';
    document.getElementById('summary').innerHTML = '';
    document.getElementById('diarization').innerHTML = '';
})
