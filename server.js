const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

// const dotenv = require('dotenv')
// dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/lyrics', async (req, res) => {
    // console.log(req.query);
    console.log('Here');

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

app.listen(3333, () => {
    console.log('Server running');
})