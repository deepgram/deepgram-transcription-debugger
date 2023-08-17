let audio2 = null;
document.getElementById("fileinput").addEventListener('change', function(e){
    var file = this.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
            var blob = new window.Blob([new Uint8Array(evt.target.result)]);
            audio = new Audio();
            audio.controls = false
            audio.src = URL.createObjectURL(blob);

            loadOverview(audio);
            loadWords(audio);

            audio2 = new Audio();
            audio2.id = 'audio2';
            audio2.controls = true
            audio2.src = URL.createObjectURL(blob);
            let uiContainer = document.getElementById('ui-container');
            uiContainer.appendChild(audio2);
            
            audio2.onplay = function(){
                window.cancelAnimationFrame(animationID);
                demo.render();
            }
            audio2.onpause = function(){
                window.cancelAnimationFrame(animationID);
            }

            wavesurfer.load(audio.src);
            wavesurferOverview.load(audio.src);
            let controls = document.getElementById('controls');
            controls.style.display = '';
            dropzone.style.display = 'none';
            document.getElementById('sample').style.display = 'none';
            audioObj = true;
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
            keyword_boost: document.getElementById('keyword_boost'),
            diarize: document.getElementById('diarization'),
            
            summarize: document.getElementById('summarization'),
            detect_topics: document.getElementById('topic_detection'),
            detect_entities: document.getElementById('entity_detection')
        }
        let queryParams = {};
        params.forEach((param)=>{
            let keyValue = param.split('=');
            let key = keyValue[0];
            let value = keyValue[1];
            if(key == 'model' || key == 'tier' || key == 'language' && elms[key]){
                elms[key].value = value;
                queryParams[key] = elms[key].value;
            } else if(key == 'redact' || key == 'replace' || key == 'search' || key == 'keywords' && elms[key]) {
                if(!elms[key].value){
                    elms[key].value = key +'='+value;
                    queryParams[key] = elms[key].value;
                } else {
                    elms[key].value += '&' + key +'='+value;
                    queryParams[key] = elms[key].value;
                }
            } else if(key == 'keyword_boost'){
                elms[key].checked = value == 'legacy' ? true : false;
                queryParams[key] = value;
            } else if(elms[key]) {
                elms[key].checked = value == 'true' ? true : false;
                queryParams[key] = elms[key].checked;
            }
        })
        updateUrlWithQueryParams(queryParams);
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
    if(!audioObj){
        alert('You need to select an audio file first to load these settings.');
        return;
    }
    wavesurfer.clearRegions();
    wavesurferOverview.clearRegions();
    transcripts = [];
    linkTimelines();
    loadAudioTranscript();
    document.getElementById('channelsDiv').innerHTML = '';
    document.getElementById('wordsDiv').innerHTML = '';
    document.getElementById('paragraphsDiv').innerHTML = '';
    document.getElementById('summaryDiv').innerHTML = '';
    document.getElementById('diarizationDiv').innerHTML = '';
    document.getElementById('sentimentDiv').innerHTML = '';
    document.getElementById('confidenceDiv').innerHTML = '';
})