const search = document.querySelector('.museek-search-bar');
const songInfo = document.querySelector('.museek-lyrics-info-container')
const dropdown = document.querySelector('.dropdown');
const dropdownHeader = document.querySelector('.museek-info-header');
const dropdownContent = document.querySelector('.museek-info-dropdown-content');

console.log('In index.js');

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'genius.p.rapidapi.com',
      'X-RapidAPI-Key': '86fe6b7424msh2f92ac0a32a7924p1f2085jsn203e9baf4b1a'
    }
};

const getQuery = async () => {
    const searchQuery = search.value;
    console.log('This is the query: ' + searchQuery);

    try {
        const response = await axios.request(`https://genius.p.rapidapi.com/search?q=${searchQuery}`, options);
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}

const registerEventHandler = () => {
    search.addEventListener('change', getQuery)
}


dropdownHeader.addEventListener('click', () => {
    dropdownHeader.classList.toggle('museek-info-header-clicked');
    dropdown.classList.toggle('dropdown-rotate');
    dropdownContent.classList.toggle('museek-info-dropdown-content-open');
})

registerEventHandler();