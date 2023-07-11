function updateUrlWithQueryParams(params){
    const searchParams = new URLSearchParams(params);
    const queryString = searchParams.toString();
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + queryString;
        window.history.pushState({path:newurl},'',newurl);
    }
}

function loadUrlParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Strings
    const model = urlParams.get('model') ? urlParams.get('model') : '';
    const tier = urlParams.get('tier') ? urlParams.get('tier') : '';
    const language = urlParams.get('language') ? urlParams.get('language') : '';
    const redact = urlParams.get('redact') ? urlParams.get('redact') : '';
    const replace = urlParams.get('replace') ? urlParams.get('replace') : '';
    const search = urlParams.get('search') ? urlParams.get('search') : '';
    const keywords = urlParams.get('keywords') ? urlParams.get('keywords') : '';

    // Booleans
    const multichannel = urlParams.get('multichannel') ? (urlParams.get('multichannel') == 'true' ? true : false) : false;
    const sentiment = urlParams.get('sentiment') ? (urlParams.get('sentiment') == 'true' ? true : false) : false;
    const smart_format = urlParams.get('smart_format') ? (urlParams.get('smart_format') == 'true' ? true : false) : false;
    const punctuate = urlParams.get('punctuate') ? (urlParams.get('punctuate') == 'true' ? true : false) : false;
    const paragraphs = urlParams.get('paragraphs') ? (urlParams.get('paragraphs') == 'true' ? true : false) : false;
    const utterances = urlParams.get('utterances') ? (urlParams.get('utterances') == 'true' ? true : false) : false;
    const numerals = urlParams.get('numerals') ? (urlParams.get('numerals') == 'true' ? true : false) : false;
    const profanity_filter = urlParams.get('profanity_filter') ? (urlParams.get('profanity_filter') == 'true' ? true : false) : false;
    const diarize = urlParams.get('diarize') ? (urlParams.get('diarize') == 'true' ? true : false) : false;
    const summarize = urlParams.get('summarize') ? (urlParams.get('summarize') == 'true' ? true : false) : false;
    const detect_topics = urlParams.get('detect_topics') ? (urlParams.get('detect_topics') == 'true' ? true : false) : false;
    const detect_entities = urlParams.get('detect_entities') ? (urlParams.get('detect_entities') == 'true' ? true : false) : false;

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
    };

    // Text
    elms['model'].value = model;
    elms['tier'].value = tier;
    elms['language'].value = language;
    elms['redact'].value = redact;
    elms['replace'].value = replace;
    elms['search'].value = search;
    elms['keywords'].value = keywords;

    // Checkboxes
    elms['multichannel'].checked = multichannel;
    elms['sentiment'].checked = sentiment;
    elms['smart_format'].checked = smart_format;
    elms['punctuate'].checked = punctuate;
    elms['paragraphs'].checked = paragraphs;
    elms['utterances'].checked = utterances;
    elms['numerals'].checked = numerals;
    elms['profanity_filter'].checked = profanity_filter;
    elms['diarize'].checked = diarize;
    elms['summarize'].checked = summarize;
    elms['detect_topics'].checked = detect_topics;
    elms['detect_entities'].checked = detect_entities;

    loadSettingsToParams();

    document.getElementById('params').value = window.location.search.substring(1);
}


function loadSettingsToParams(){
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
    let queryParams = {};
    Object.keys(elms).forEach((key)=>{
        if(key == 'model' || key == 'tier' || key == 'language' && elms[key]){
            queryParams[key] = elms[key].value;
        } else if(key == 'redact' || key == 'replace' || key == 'search' || key == 'keywords' && elms[key]) {
            if(!elms[key].value){
                queryParams[key] = elms[key].value;
            } else {
                queryParams[key] += '&' + key +'='+elms[key].value;
            }
        } else if(elms[key]) {
            queryParams[key] = elms[key].checked;
        }
    })
    updateUrlWithQueryParams(queryParams);
}