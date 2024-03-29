let wordsRegionKey = 'wordRegion';
let overviewRegionKey = 'overviewRegion';
let playTimeout = null;
let playing = false;
let dragging = false;
let transcripts = [];
let audioObj = null;

window.addEventListener("DOMContentLoaded", (event) => {
    loadUrlParams();
});


function loadAudioTranscript(){
    let loading = document.getElementById('loading');
    loading.style.display = 'block';
    var input = document.getElementById('fileinput');

    var data = new FormData();
    data.append('file', input.files[0]);

    const formData = new FormData()
    formData.append('files', input.files[0])

    let model = document.getElementById('model').value;
    let tier = document.getElementById('tier').value;
    let language = document.getElementById('language').value;
    let multichannel = document.getElementById('multichannel').checked;
    let sentiment = document.getElementById('sentiment').checked;
    
    let smart_format = document.getElementById('smart_format').checked;
    let punctuate = document.getElementById('punctuation').checked;
    let paragraphs = document.getElementById('paragraphs').checked;
    let utterances = document.getElementById('utterances').checked;
    
    let numerals = document.getElementById('numerals').checked;
    let profanity_filter = document.getElementById('profanity_filter').checked;
    let redact = document.getElementById('redaction').value;
    if(redact){
        redact = '&' + redact;
    }
    let replace = document.getElementById('find_replace').value;
    if(replace){
        replace = '&' + replace;
    }

    let search = document.getElementById('search').value;
    if(search){
        search = '&' + search;
    }
    let keywords = document.getElementById('keywords').value;
    if(keywords){
        keywords = '&' + keywords;
    }
    let diarize = document.getElementById('diarization').checked;
    let filler_words = document.getElementById('filler_words').checked;
    
    let summarize = document.getElementById('summarization').checked;
    let detect_topics = document.getElementById('topic_detection').checked;
    let detect_entities = document.getElementById('entity_detection').checked;

    let keyword_boost = document.getElementById('keyword_boost').checked ? 'legacy' : 'standard';

    loadSettingsToParams();

    let url = `http://localhost:3000/upload_files?model=${model}&tier=${tier}&language=${language}&keyword_boost=${keyword_boost}&multichannel=${multichannel}&sentiment=${sentiment}&smart_format=${smart_format}&punctuate=${punctuate}&paragraphs=${paragraphs}&utterances=${utterances}&numerals=${numerals}&profanity_filter=${profanity_filter}&diarize=${diarize}&summarize=${summarize}&detect_topics=${detect_topics}&filler_words=${filler_words}&detect_entities=${detect_entities}${redact}${keywords}${replace}${search}`;
    fetch(url, {
        method: 'post',
        body: formData,
    })
    .then(response => response.json())
    .then((res) => {
        let channels = res.transcript.results.channels;
        let channelsHtml = '';
        let wordHtml = '';
        let sentimentHtml = '';
        let confidenceHtml = '';
        let diarizationHtml = '';
        let summaryHTML = '';
        let paragraphHTML = '';
        let currentIndex = 0

        let allWords = [];
        //get all the words with channel and original index metadata
        channels.forEach((channel, channelIndex)=>{
            channel.alternatives[0].words.forEach((word, index)=>{
                word.channel = channelIndex;
                word.originalIndex = index;
                allWords.push(word);
            });
        });
        // sort the words by time order
        allWords.sort((a,b)=>(a.start > b.start) ? 1 : -1);

        let currentChannelWords = [];
        let currentChannel = -1;
        allWords.forEach((word)=>{
            if(currentChannel == -1 || currentChannel != word.channel){
                if(currentChannelWords.length > 0){
                    channelsHtml += createChannelWords(currentChannelWords);
                }
                currentChannel = word.channel;
                currentChannelWords = [];
            }
            currentChannelWords.push(word);
        })
        // Process the last words
        channelsHtml += createChannelWords(currentChannelWords);

        document.getElementById('channelsDiv').innerHTML = channelsHtml;

        
        channels.forEach((channel, channelIndex)=>{
            let channelPrefix = (channelIndex != 0 ? '<br><br>' : '') + '<h3>Channel['+channelIndex+']</h3><br>';
            wordHtml += channelPrefix;
            sentimentHtml += channelPrefix;
            confidenceHtml += channelPrefix;
            diarizationHtml += channelPrefix;
            paragraphHTML += channelPrefix;
            summaryHTML += channelPrefix;
            transcripts.push(channel.alternatives[0]);
            channel.alternatives[0].words.forEach((word, index)=>{
                wordHtml += createPunctuationWord(word, channelIndex, index);
                sentimentHtml += createSentimentWord(word, channelIndex, index);
                confidenceHtml += createConfidenceWord(word, channelIndex, index);
                diarizationHtml += createDiarizationWord(word, channelIndex, index);
                wavesurfer.addRegion({
                    id: 'wavesurfer_region_'+channelIndex + '_' + index,
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
                    id: 'wavesurferOverview_region_'+channelIndex + '_' + index,
                    start: word.start,
                    end: word.end,
                    color: '#38edac44',
                    drag: false,
                    resize: false,
                    // attributes: {
                    //     label: word.word
                    //   }
                })
                currentIndex++;
            })
            document.getElementById('wordsDiv').innerHTML = wordHtml;
            document.getElementById('sentimentDiv').innerHTML = sentimentHtml;
            document.getElementById('confidenceDiv').innerHTML = confidenceHtml;
            document.getElementById('diarizationDiv').innerHTML = diarizationHtml;

            if(channel.alternatives[0].paragraphs){
                let paragraphs = channel.alternatives[0].paragraphs.paragraphs;
                paragraphs.forEach((paragraph)=>{
                    paragraphHTML += '<pre>' + paragraph.sentences.map((p)=>p.text).join(' ') + '</pre><hr class="paragraphHR">';
                })
            }
            if(channel.alternatives[0].summaries){
                let summaries = channel.alternatives[0].summaries;
                summaries.forEach((summary)=>{
                    summaryHTML += '<pre>' + summary.summary + '</pre>';
                })
            }
            /*
            paragraphs.paragraphs
                end:10.074161
                num_words:11
                sentences:[{text: "Hi.", start: 6.63668, end: 6.8365803},…]
                start:6.63668
                */
            loading.style.display = 'none';

                
        })
        document.getElementById('paragraphsDiv').innerHTML = paragraphHTML;
        document.getElementById('summaryDiv').innerHTML = summaryHTML;
    })
    .catch((err) => console.log('Error occurred', err))
}

function createChannelWords(channelWords){
    let channelsHtml = '';
    channelWords.forEach((channelWord, idx)=>{
        if(idx == 0){
            channelsHtml += '<div class="speaker_'+(channelWord.channel+1)+'"><b class="color">Channel '+channelWord.channel+':</b><br>';
        }
        channelsHtml += `<div class="wordDiv" id="channel_div_${channelWord.channel}_${channelWord.originalIndex}" onclick="jumpToWord(${channelWord.channel}, ${channelWord.originalIndex})">
            <span class="word" style="margin-right: 0px;" id="word_${channelWord.originalIndex}">${channelWord.word}&nbsp;</span>
            </div>`;
    })
    channelsHtml += '</div><br>';
    return channelsHtml;
}

function createPunctuationWord(word, channelIndex, index){
    let similar = 1;
    let words_val = '';
    
    /*
        confidence:0.7202066
        end:9.54444
        punctuated_word:"Hi."
        sentiment:"neutral"
        speaker:0
        speaker_confidence:0.6268749
        start:9.26458
        word:"hi"
    */
    if(word.punctuated_word){
        similar = similarity(word.word, word.punctuated_word);
        words_val = word.punctuated_word;
    }

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
    let html = `<div class="wordDiv ${similarityClass}" id="words_div_${channelIndex}_${index}" onclick="jumpToWord(${channelIndex}, ${index})">
        <span class="word" id="word_${index}">${word.word}</span>
        <br>`;
    if(words_val){
        html += `<span class="punctuation" id="punctuation_${index}">${words_val}</span>`
    }
    html += `</div>`;

    return html;
}

function createSentimentWord(word, channelIndex, index){
    let html = `<div class="wordDiv ${word.sentiment}" id="sentiment_div_${channelIndex}_${index}" onclick="jumpToWord(${channelIndex}, ${index})">
        <span class="word" id="word_${index}">${word.word}</span>
        <br>`;
    if(word.sentiment){
        html += `<span class="punctuation" id="sentiment_${index}">${word.sentiment}</span>`
    }
    html += `</div>`;
    return html;
}

function createConfidenceWord(word, channelIndex, index){
    let similarityClass = '';
    if(word.confidence < 0.25){
        similarityClass = 'error';
    } 
    else if(word.confidence < 0.5){
        similarityClass = 'warning';
    } else if(word.confidence < 0.75){
        similarityClass = 'info';
    } else {
        similarityClass = '';
    }

    let html = `<div class="wordDiv ${similarityClass}" id="confidence_div_${channelIndex}_${index}" onclick="jumpToWord(${channelIndex}, ${index})">
        <span class="word" id="word_${index}">${word.word}</span>
        <br>`;
    if(word.confidence){
        html += `<span class="punctuation" id="confidence_${index}">${word.confidence.toFixed(2)}</span>`
    }
    html += `</div>`;
    return html;
}

function createDiarizationWord(word, channelIndex, index){
    let html = `<div class="wordDiv speaker_${word.speaker}" id="speaker_div_${channelIndex}_${index}" onclick="jumpToWord(${channelIndex}, ${index})">
        <span class="word" id="word_${index}">${word.word}</span>
        <br>`;
    if(word.speaker !== null){
        html += `<span id="speaker_${word.speaker}" class="punctuation speaker_${word.speaker}">#${word.speaker}</span>`
    }
    html += `</div>`;
    return html;
}

// function createWord(word, channelIndex, index){
//     let sentiment_val = '';
//     if(word.sentiment){
//         sentiment_val = word.sentiment;
//     }

//     // Sentiment
//     let sentimentHTML = `<div class="wordDiv ${similarityClass}" id="word_div_${channelIndex}_${index}" onclick="jumpToWord(${channelIndex}, ${index})">
//         <span class="word" id="word_${index}">${word.word}</span>
//         <br>`;
//     if(sentiment_val){
//         sentimentHTML += `<span class="punctuation" id="sentiment_${index}">${sentiment_val}</span>`
//     }
//     sentimentHTML += `</div>`;
//     return sentimentHTML;
// }

function jumpToWord(channelIndex, index){
    let word = transcripts[channelIndex].words[index];
    let progress = word.start / wavesurfer.backend.getDuration();
    wavesurfer.drawer.recenter(progress);
    // wavesurfer.play(word.start);
    let region = wavesurfer.regions.list['wavesurfer_region_'+channelIndex + '_' +index]
    region.play();
    let button = document.getElementById('play');
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
    
    let highlightedDivs = {};

    wavesurfer.on('audioprocess', (currentTime)=>{
        playing = true;
        if(!dragging){
            wavesurferOverview.regions.list[overviewRegionKey].update({ start: currentTime, end: currentTime+5 });
            ['channel', 'words', 'sentiment', 'confidence', 'speaker'].forEach((key)=>{
                if(highlightedDivs[key]){
                    highlightedDivs[key].classList.remove('highlighted');
                }
                transcripts.forEach((transcript, channelIndex)=>{
                    transcript.words.forEach((word, index)=>{
                        let div = document.getElementById(key+'_div_'+channelIndex+'_'+index);
                        if(currentTime > word.start && currentTime < word.end){
                            div.classList.add('highlighted');
                            highlightedDivs[key] = div;
                        } 
                    });
                })
            })
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
