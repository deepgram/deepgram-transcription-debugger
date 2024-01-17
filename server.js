import 'dotenv/config'
import express from "express";
import pkg from "@deepgram/sdk";
import { createServer } from "http";
import fs from 'fs';
import cors from 'cors';

import multer from 'multer'

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
})

const upload = multer({ storage })

const { Deepgram } = pkg;

let deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);

const app = express();
app.use(cors())
app.use(express.static("public/"));

app.post('/upload_files', upload.any('file'), async (req, res) => {
  console.log('/upload_files', new Date().toLocaleString());
  let model = req.query.model ? req.query.model : 'nova';
  let tier = req.query.tier ? req.query.tier : '';
  let language = req.query.language ? req.query.language : '';
  let multichannel = req.query.multichannel ? (req.query.multichannel.toLowerCase() == 'true' ? true : false) : false;
  let sentiment = req.query.sentiment ? (req.query.sentiment.toLowerCase() == 'true' ? true : false) : false;
  
  let smart_format = req.query.smart_format ? (req.query.smart_format.toLowerCase() == 'true' ? true : false) : false;
  let punctuate = req.query.punctuate ? (req.query.punctuate.toLowerCase() == 'true' ? true : false) : false;
  let paragraphs = req.query.paragraphs ? (req.query.paragraphs.toLowerCase() == 'true' ? true : false) : false;
  let utterances = req.query.utterances ? (req.query.utterances.toLowerCase() == 'true' ? true : false) : false;
  
  let numerals = req.query.numerals ? (req.query.numerals.toLowerCase() == 'true' ? true : false) : false;
  let profanity_filter = req.query.profanity_filter ? (req.query.profanity_filter.toLowerCase() == 'true' ? true : false) : false;
  let redact = req.query.redact ? req.query.redact : [];
  let replace = req.query.replace ? req.query.replace : [];
  
  let search = req.query.search ? req.query.search : [];
  let keywords = req.query.keywords ? req.query.keywords : [];
  let keyword_boost = req.query.keyword_boost ? (req.query.keyword_boost.toLowerCase() == 'true' ? 'legacy' : 'standard') : 'standard';
  let diarize = req.query.diarize ? (req.query.diarize.toLowerCase() == 'true' ? true : false) : false;
  let filler_words = req.query.filler_words ? (req.query.filler_words.toLowerCase() == 'true' ? true : false) : false;
  
  let summarize = req.query.summarize ? (req.query.summarize.toLowerCase() == 'true' ? true : false) : false;
  let detect_topics = req.query.detect_topics ? (req.query.detect_topics.toLowerCase() == 'true' ? true : false) : false;
  let detect_entities = req.query.detect_entities ? (req.query.detect_entities.toLowerCase() == 'true' ? 'latest' : false) : false;
  
  let options = {
    tag: 'deepgram-transcription-debugger'
  };
  
  if(keywords){
    options.keywords = keywords;
  }
  if(keyword_boost){
    options.keyword_boost = keyword_boost;
  }
  if(redact){
    options.redact = redact;
  }
  if(replace){
    options.replace = replace;
  }
  if(search){
    options.search = search;
  }
  if(model){
    options.model = model;
  }
  if(tier){
    options.tier = tier;
  }
  if(language){
    options.language = language;
  }
  if(multichannel){
    options.multichannel = multichannel;
  }
  if(sentiment){
    options.sentiment = sentiment;
  }
  if(smart_format){
    options.smart_format = smart_format;
  }
  if(punctuate){
    options.punctuate = punctuate;
  }
  if(paragraphs){
    options.paragraphs = paragraphs;
  }
  if(utterances){
    options.utterances = utterances;
  }
  if(profanity_filter){
    options.profanity_filter = profanity_filter;
  }
  if(diarize){
    options.diarize = diarize;
  }
  if(filler_words){
    options.filler_words = filler_words;
  }
  if(summarize){
    options.summarize = summarize;
  }
  if(detect_topics){
    options.detect_topics = detect_topics;
  }
  if(detect_entities){
    options.detect_entities = detect_entities;
  }
  
  console.log('model', model);
  console.log('tier', tier);
  console.log('language', language);
  console.log('multichannel', multichannel);
  console.log('sentiment', sentiment);
  
  console.log('smart_format', smart_format);
  console.log('punctuate', punctuate);
  console.log('paragraphs', paragraphs);
  console.log('utterances', utterances);
  
  console.log('numerals', numerals);
  console.log('profanity_filter', profanity_filter);
  console.log('filler_words', filler_words);

  console.log('diarize', diarize);
  
  console.log('summarize', summarize);
  console.log('detect_topics', detect_topics);
  console.log('detect_entities', detect_entities);
  
  console.log(req.body);
  console.log(req.files);
  
  try {
    const audioSource = {
        stream: fs.createReadStream(req.files[0].path),
        mimetype: "wav",
    };
    const response = await deepgram.transcription.preRecorded(audioSource, options);
    
    setTimeout(()=>{fs.unlink(req.files[0].path, (evt)=>{console.log('Unlinked file ')})}, 1)
    res.send({ message: 'Successfully uploaded files', transcript: response })
  } catch(err){
    console.log(err);
    res.status(500).send({ err: 'Unable to process audio file' })
  }
})

console.log('Starting Server on Port 3000');
const httpServer = createServer(app);
httpServer.listen(3000);
console.log('Running');
