const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

/*validation to only have books from bom and sanitation; line 6-54*/
const bomBooks = [
    '1 nephi',
    '2 nephi',
    'jacob',
    'enos',
    'jarom',
    'omni',
    'words of mormon',
    'mosiah',
    'alma',
    'helaman',
    '3 nephi',
    '4 nephi',
    'mormon',
    'ether',
    'moroni'
];

function formatChapter(input) {
    return input
        .toLowerCase()
        .split(' ')
        .map((word, index) => {
            if (word === 'of') return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

button.addEventListener('click', function () {
    const rawInput = input.value.trim();
    const chapter = formatChapter(rawInput);
    const lowerChapter = rawInput.toLowerCase();

    if (chapter === '') {
        input.focus();
        return;
    }

    const parts = lowerChapter.split(' ');
    const chapterNumber = parts[parts.length - 1];
    const bookName = parts.slice(0, parts.length - 1).join(' ');

    if (!bomBooks.includes(bookName) || isNaN(chapterNumber)) {
        alert('Please enter a valid Book of Mormon chapter, such as Alma 5 or 1 Nephi 3.');
        input.value = '';
        input.focus();
        return;
    }

    /*validate no duplicates; line 56-66*/
    const existingItems = list.querySelectorAll('li');
    for (let i = 0; i < existingItems.length; i++) {
        const existingText = existingItems[i].firstChild.textContent.trim().toLowerCase();
        if (existingText === lowerChapter) {
            alert('That chapter is already in your list.');
            input.value = '';
            input.focus();
            return;
        }
    }

    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = chapter;
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', `Remove ${chapter}`);
    deleteButton.classList.add('delete');

    deleteButton.addEventListener('click', function () {
        list.removeChild(li);
        input.focus();
    });

    li.append(deleteButton);
    list.append(li);

    input.value = '';
    input.focus();
});

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        button.click();
    }
});