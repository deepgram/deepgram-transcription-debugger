var wavesurferOverview = null;

function loadOverview(audio){
    wavesurferOverview = WaveSurfer.create({
        container: '#waveform-overview',
        hideScrollbar: true,
        splitChannels: true,
        splitChannelsOptions: {
            overlay: false,
            channelColors: {
                0: {
                    progressColor: 'green',
                    waveColor: 'pink'
                },
                1: {
                    progressColor: 'orange',
                    waveColor: 'purple'
                }
            }
        },
        // waveColor: '#ae29ff',
        // progressColor: '#ee028b',
        backend: 'WebAudio',
        plugins: [
            WaveSurfer.regions.create({}),
            WaveSurfer.timeline.create({
                wavesurfer: wavesurferOverview,
                container: '#waveform-timeline-overview',
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
        pixelRatio:  1
    });

    wavesurferOverview.once('ready', () => {  
        wavesurferOverview.zoom(10);
    })
}
