const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Valid Book of Mormon books
const bomBooks = [
    '1 nephi', '2 nephi', 'jacob', 'enos', 'jarom', 'omni',
    'words of mormon', 'mosiah', 'alma', 'helaman',
    '3 nephi', '4 nephi', 'mormon', 'ether', 'moroni'
];

// Get saved chapters or start empty
let chaptersArray = getChapterList() || [];

// Display saved chapters on load
chaptersArray.forEach((chapter) => {
    displayList(chapter);
});

// Button click
button.addEventListener('click', function () {
    const rawInput = input.value.trim();
    const lowerInput = rawInput.toLowerCase();

    // 1. Empty check
    if (rawInput === '') {
        input.focus();
        return;
    }

    // 2. Validate book + chapter number
    const parts = lowerInput.split(' ');
    const chapterNumber = parts[parts.length - 1];
    const bookName = parts.slice(0, parts.length - 1).join(' ');

    if (!bomBooks.includes(bookName) || isNaN(chapterNumber)) {
        alert('Please enter a valid Book of Mormon chapter (e.g., Alma 5 or 1 Nephi 3).');
        input.value = '';
        input.focus();
        return;
    }

    // 3. Prevent duplicates
    const lowerArray = chaptersArray.map(item => item.toLowerCase());
    if (lowerArray.includes(lowerInput)) {
        alert('That chapter is already in your list.');
        input.value = '';
        input.focus();
        return;
    }

    // 4. Add to UI + array + localStorage
    displayList(rawInput);
    chaptersArray.push(rawInput);
    setChapterList();

    input.value = '';
    input.focus();
});

// Display function
function displayList(item) {
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = item;
    deleteButton.textContent = '❌';

    li.append(deleteButton);
    list.append(li);

    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });
}

// Save to localStorage
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Get from localStorage
function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'));
}

// Delete function
function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1); // remove ❌
    chaptersArray = chaptersArray.filter((item) => item !== chapter);
    setChapterList();
}