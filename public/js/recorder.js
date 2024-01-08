let mediaRecorder = null;
let recordedBlobs = [];
const startRecording = () => {
    let options = {mimeType: 'audio/webm'};
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
        try {
            mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorder.start();
        } catch (e) {
            console.error('Exception while creating MediaRecorder:', e);
            return;
        }
        mediaRecorder.onstop = (event) => {
          console.log('Recorder stopped: ', event);
        };
        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
              recordedBlobs = [...recordedBlobs, event.data];
          }
        };
    }).catch((err) => {
      console.error('Media stream creation failed: ', err);
    });
}

const stopRecording = () => {
    mediaRecorder.stop();
}

const downloadRecording = () => {
    const blob = new Blob(recordedBlobs, {type: 'audio/wav; codecs=0'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.wav';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}