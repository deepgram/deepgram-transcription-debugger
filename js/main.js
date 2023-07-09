var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    backend: 'WebAudio',
    plugins: [
        WaveSurfer.regions.create({})
    ]
});
wavesurfer.once('ready', () => {
    const slider = document.querySelector('input[type="range"]')
  
    slider.addEventListener('input', (e) => {
      const minPxPerSec = e.target.valueAsNumber
      wavesurfer.zoom(minPxPerSec)
    })

    loadAudioTranscript();
})

document.getElementById("fileinput").addEventListener('change', function(e){
    var file = this.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function (evt) {
            var blob = new window.Blob([new Uint8Array(evt.target.result)]);
            let audio = new Audio();
            audio.src = URL.createObjectURL(blob);
            
            wavesurfer.load(audio.src);
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
    let url = 'https://api.deepgram.com/v1/listen?smart_format=true&language=en&model=nova';

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
        let words = res.transcript.results.channels[0].alternatives[0].words;
        console.log('words: ', words);
        
        words.forEach((word)=>{
            wavesurfer.addRegion({
                start: word.start,
                end: word.end,
                color: '#00FF0088',
                drag: false,
                resize: false,
                attributes: {
                    label: word.word
                  }
            })
        })
    })
    .catch((err) => ('Error occurred', err))
}
