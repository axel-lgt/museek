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
        const fetchedDescription = dom.window.document.querySelector("[class^=\"RichText__Container\"]")

        let lyricsArray = []
        let descriptionArray = []

        descriptionArray.push(fetchedDescription.innerHTML)

        fetchedLyrics.forEach(lyrics => {
            const lyricsContent = lyrics.innerHTML
            lyricsArray.push(lyricsContent)
        })

        let lyricsAndDescriptionArray = []

        lyricsAndDescriptionArray.push(lyricsArray, descriptionArray)

        res.send(lyricsAndDescriptionArray)
    } catch (err) {
        console.log(err);
    }
})

app.listen(3333, () => {
    console.log('Server running');
})