var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#ae29ff',
    cursorColor: '#f00',
    cursorWidth: 4,
    progressColor: '#ee028b',
    backend: 'WebAudio',
    plugins: [
        WaveSurfer.regions.create({}),
        WaveSurfer.timeline.create({
            wavesurfer: wavesurfer,
            container: '#waveform-timeline',
            height: 20,
            primaryColor: '#fff',
            primaryFontColor: '#fff',
            secondaryColor: '#0f0',
            secondaryFontColor: '#0f0',
            timeInterval,
            primaryLabelInterval,
            secondaryLabelInterval,
            formatTimeCallback,
            // offset: ''
        }),
        CURSOR
    ],
    zoom: 300,
    normalize: true,
    pixelRatio:  1,
    scrollParent: true
});

wavesurfer.once('ready', () => {
    // const slider = document.querySelector('input[type="range"]')
    // slider.addEventListener('input', (e) => {
    //   const minPxPerSec = e.target.valueAsNumber
    //   wavesurfer.zoom(minPxPerSec)
    // });

    wavesurfer.zoom(300);
    linkTimelines();
    loadAudioTranscript();
})
