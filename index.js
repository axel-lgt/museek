const search = document.querySelector('.museek-search-bar');
const songInfo = document.querySelector('.museek-lyrics-info-container');
const songResults = document.querySelector('.museek-search-results');



const dropdown = document.querySelector('.dropdown');
const dropdownHeader = document.querySelector('.museek-info-header');
const dropdownContent = document.querySelector('.museek-info-dropdown-content');

console.log('In index.js');

const api = axios.create({
    baseURL: 'http://localhost:3333/'
})

const showSelectSongInfo = async song => {
    const geniusURL = `https://genius.com`
    const songPath = `${song[0].path}`

    const getLyrics = await axios.get(`http://localhost:3333/lyrics/`, { params: { geniusURL, songPath }} )
    const lyricsArray = getLyrics.data

    // console.log(song);
    songInfo.style.display = 'flex';

    // Displaying lyrics
    document.querySelector('.museek-lyrics p').innerHTML = lyricsArray;

    // Displaying "About this song"
    document.querySelector('.museek-artwork').src=`${song[0].artwork}`
    document.querySelector('.song-title').innerHTML = `${song[0].title}`
    document.querySelector('.song-artist').innerHTML = `by ${song[0].artist}`
    document.querySelector('.song-album').innerHTML = `from ${song[0].album}`

    // dropdownContent.querySelector('p').innerHTML = song[0].description?.children
    // console.log(song[0].description);

    let descriptionArray = [];
    
    song[0].description.forEach(desc => {
        console.log(desc.children);
        // console.log(desc.children?.children);
        // console.log(desc);
        // console.log(desc.children.textContent);
        descriptionArray.push(desc.children)
    })

    console.log(descriptionArray);

    dropdownContent.querySelector('p').innerHTML = descriptionArray
}

const mapDataFromId = song => {
    const selectedSong = Array(song).map(item => {
        return {
            id: item.id,
            artist: item.artist_names,
            title: item.title,
            album: item.album.name,
            artwork: item.song_art_image_url,
            youtube: item.media[0].url,
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
        const response = await axios.request(`http://localhost:3333/searchById`, { params : { geniusURL, path } });
        const songFromId = response.data
        mapDataFromId(songFromId)
    } catch (err) {
        console.log(err);
    }
    
}
 
const showResults = async (results) => {
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
        })
    })

    songResults.style.display = 'block';
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