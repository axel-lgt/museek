const search = document.querySelector('.museek-search-bar');
const songInfo = document.querySelector('.museek-lyrics-info-container')
const dropdown = document.querySelector('.dropdown');
const dropdownHeader = document.querySelector('.museek-info-header');
const dropdownContent = document.querySelector('.museek-info-dropdown-content');

search.addEventListener('change', (e) => {
    e.preventDefault();
    console.log(e.target.value);
    songInfo.style.display = 'flex';
})

dropdownHeader.addEventListener('click', () => {
    dropdownHeader.classList.toggle('museek-info-header-clicked');
    dropdown.classList.toggle('dropdown-rotate');
    dropdownContent.classList.toggle('museek-info-dropdown-content-open');
})

console.log('In index.js');