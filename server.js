const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const dotenv = require('dotenv')
dotenv.config()

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': process.env.GENIUS_API_HOST,
      'X-RapidAPI-Key': process.env.GENIUS_API_KEY
    }
};

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/search', async (req, res) => {
    console.log(req.query);
    const geniusURL = req.query.geniusURL
    const path = req.query.path

    try {
        const response = await axios.request(geniusURL + path, options)
        res.send(response.data.response.hits)
    } catch(err) {
        console.log(err);
    }
})

app.get('/searchById', async (req, res) => {
    console.log(req.query);
    const geniusURL = req.query.geniusURL
    const path = req.query.path

    try {
        const response = await axios.request(geniusURL + path, options)
        res.send(response.data.response.song)
    } catch(err) {
        console.log(err);
    }
})

app.get('/lyrics', async (req, res) => {
    console.log(req.query);

    const geniusURL = req.query.geniusURL
    const songPath = req.query.songPath
    try {
        const response = await axios.get(geniusURL + songPath)
        const dom = new JSDOM(response.data)
        const fetchedLyrics = dom.window.document.querySelectorAll('div[data-lyrics-container="true"]')
        let lyricsArray = []

        fetchedLyrics.forEach(lyrics => {
            const lyricsContent = lyrics.innerHTML
            lyricsArray.push(lyricsContent)
        })

        res.send(lyricsArray)
    } catch (err) {
        console.log(err);
    }
})

app.get('/test', async (req, res) => {
    
    try {
        const response = await axios.request(`https://genius.p.rapidapi.com/songs/2563`, options)
        // console.log(response.data.response.song.description)
        // const dom = new JSDOM(response.data.response.song.description)
        const parsedRes = JSON.parse(response.data.response.song.description)
        console.log(parsedRes);
    } catch(err) {
        console.log(err);
    }
})

app.listen(3333, () => {
    console.log('Server running');
})