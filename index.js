const search = document.querySelector('.museek-search-bar');
const songInfo = document.querySelector('.museek-lyrics-info-container');
const songResults = document.querySelector('.museek-search-results');
const loader = document.querySelector('.loader')
const dropdown = document.querySelector('.dropdown');
const dropdownHeader = document.querySelector('.museek-info-header');
const dropdownContent = document.querySelector('.museek-info-dropdown-content');
const ytPlayer = document.querySelector('iframe')

console.log('In index.js');

const api = axios.create({
    baseURL: 'http://localhost:3333/'
})

const showSelectSongInfo = async song => {
    const geniusURL = `https://genius.com`
    const songPath = `${song[0].path}`

    const getLyricsAndDesc = await axios.get(`http://localhost:3333/lyrics/`, { params: { geniusURL, songPath }} )
    const lyricsArray = getLyricsAndDesc.data[0]
    const descriptionArray = getLyricsAndDesc.data[1]
    loader.style.display = 'none'

    // console.log(song);
    songInfo.style.display = 'flex';

    // Displaying lyrics
    const lyricsContainer = document.querySelector('.museek-lyrics-content')
    lyricsContainer.innerHTML = lyricsArray;

    document.querySelectorAll('a').forEach(tag => {
        // Taking the a tag link and slicing the museek's baseURL
        const tagHref = tag.href.slice(22)
        tag.href = `https://www.genius.com/${tagHref}`
        tag.setAttribute('target', '_blank')
    })

    // Displaying "About this song"
    document.querySelector('.museek-artwork').src=`${song[0].artwork}`
    document.querySelector('.song-title').innerHTML = `${song[0].title}`
    document.querySelector('.song-artist').innerHTML = `by ${song[0].artist}`
    document.querySelector('.song-album').innerHTML = `from ${song[0].album}`

    dropdownContent.querySelector('.song-description').innerHTML = descriptionArray
    // If description has images, set their sizes
    dropdownContent.querySelectorAll('* > img').forEach(img => {
        img.style.width = '100%'
        img.style.height = '100%'
    })

    // Getting the YouTube URL
    const media = song[0].media
    
    const filteredMedia = media.filter(item => {
        return item.provider === 'youtube'
    })
    
    let youtubeURL = []

    filteredMedia.forEach(media => {
        youtubeURL.push(media.url)
    })

    const youtubeID =  youtubeURL.toString().slice(31)
    ytPlayer.src = `https://www.youtube.com/embed/${youtubeID}`
}

const mapDataFromId = song => {
    const selectedSong = Array(song).map(item => {
        return {
            id: item.id,
            artist: item.artist_names,
            title: item.title,
            album: item.album.name,
            artwork: item.song_art_image_url,
            media: item.media,
            description: item.description.dom.children,
            path: item.path
        }
    })
    showSelectSongInfo(selectedSong);
}

const getSongInfo = async songId => {
    console.log('This is the song id ' + songId);

    const geniusURL = `https://genius.p.rapidapi.com/songs/`
    const path = songId

    try {
        loader.style.display = 'flex'
        const response = await axios.request(`http://localhost:3333/searchById`, { params : { geniusURL, path } });
        const songFromId = response.data
        mapDataFromId(songFromId)
    } catch (err) {
        console.log(err);
    }
    
}
 
const showResults = async (results) => {
        console.log(results);
        songResults.innerHTML = ''

        await results.forEach(result => {
            songResults.innerHTML += 
            `
                <div id=${result.id} class="museek-search-results-song">
                    <div class="museek-search-results-song-left">
                        <img class="museek-results-artwork" src=${result.artwork} alt="Song artwork">
                    </div>
                    <div class="museek-search-results-song-right">
                        <h3>${result.title}</h3>
                        <h4>by ${result.artist}</h4>
                    </div>
                </div>
            `
        })
        // I declare songItems here because it will return undefined or 0 if I declare it on top, before this variable
        const songItems = document.querySelectorAll('.museek-search-results-song');
    
        songItems.forEach(item => {
            item.addEventListener("click", () => {
                // After getting the id by clicking on the item I have to clear the search bar and the results
                getSongInfo(item.id);
                search.value = '';
                songResults.innerText = '';
                songResults.style.display = 'none';
                songInfo.style.display = 'none';
            })
        })
        
        // IF the query is NOT empty, then display the results container
        if(results.length !== 0) {
            songResults.style.display = 'block';
        } else {
            return
        }
}


const mapData = hits => {
    const songs = hits.map(hit => {
        return {
            id: hit.result.id,
            artist: hit.result.artist_names,
            title: hit.result.title,
            artwork: hit.result.song_art_image_url
        }
    })
    showResults(songs);
}

const getQuery = async () => {
    const searchQuery = search.value;
    console.log('This is the query: ' + searchQuery);

    // If the query value is empty
    if(searchQuery == '') {
        songResults.innerHTML = '';
        songResults.style.display = 'none'
    }

    const geniusURL = `https://genius.p.rapidapi.com/search?q=`
    const path = searchQuery

    try {
        const response = await axios.request(`http://localhost:3333/search/`, { params: { geniusURL, path } });
        const hitsData = response.data
        mapData(hitsData);
    } catch (err) {
        console.log(err);
    }
}

const registerSearchHandler = () => {
    search.addEventListener('change', getQuery)
}

dropdownHeader.addEventListener('click', () => {
    dropdownHeader.classList.toggle('museek-info-header-clicked');
    dropdown.classList.toggle('dropdown-rotate');
    dropdownContent.classList.toggle('museek-info-dropdown-content-open');
})



registerSearchHandler();