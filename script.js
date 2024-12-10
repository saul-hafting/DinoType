const words = 'the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me know make see take come try us again how work first well place long think should like our down too only day little where man here large something write most back before two use find give many tell through new want because these way look same call may over number no sound each take help put start hand good sentence three turn fall end home create us course real best job still play run move student step answer until others group next man feel show keep work word part large do night found way begin act minute count watch high look slow fast real fun hard reach front land study form kind full family brother mother father easy night board create never least done always friend miss girl boy game town world water again voice sound reason continue question great amazing cold heat inside outside near far close back teach clean inside shop carry touch face moment kid eyes body hear follow walk ride bus car phone door key event special stop open head feet mouth feel mind heart soul forward back light dark deep high low wind street bench park clean important shop finish pay study detail space shape wall board text paper idea fast slow kind treat shop car tree rest nice fair help save find practice train day night sunshine rain snow ice thunder lightning moon sun stars sky sea beach ocean wave fish dog cat animal grow live stay play hard home business hope joy live laughter dance sing bright sunshine picture sun flower grow beautiful sweet kind smile hug kiss love music sing speech wait stand fall sleep ride night dream train fast jump health mind peace rest board mail wrong street travel experience memory store fight blood strong serve friend working game start play fun happy sad smile talk thought train work house hour floor travel stay love good talk pet passion morning day night warm cold school place small huge big thank grateful sleep laugh finish do ask miss smile continue stop start feel live move fun joy gift pretty friendly kind garden light dish brush quiet sound air food warm wait price give light star tree love dark party laugh good work friend end love heart action game buy collect moment sound center hour stop mark action step joy rest hour pain matter solution world earth open friend sweet friend ready paper send finish light happiness success positive mind way body peace thoughts wish care action morning kiss good bright walk fight challenge listen ask receive health love hold truth journey spirit share correct motion exercise good belief respect work care see run prepare shine dream smile action clear race test full fill fruit face community learn neighbor team lose grow'.split(' ')
let currentLetterIndex = 0;
let currentWordIndex = 0;
let startTime = 0
let numOfWrods = 50

const prog = document.getElementById('progress')

function randomWords() {
    const randomIndex = Math.floor(Math.random() * words.length); 
    return words[randomIndex];
}

function formatWord(lastWord) {
    const letters = randomWords().split('')
    let returnValue = '';
    for(let i = 0; i < letters.length; i++) {
        returnValue += `<span class="letter">${letters[i]}</span>`
    }
    if(!lastWord) {
        returnValue += `<span class="letter space">${' '}</span>`
    }
    return `<div class="word">${returnValue}</div>`;
}

function newGame(n) {
    const resultsDiv = document.getElementById('resultsDiv');
    prog.textContent = 0 + " / " + numOfWrods
    resultsDiv.innerHTML = ''
    numOfWrods = n
    startTime = 0;
    currentLetterIndex = 0
    currentWordIndex = 0
    let wordBox = document.getElementById('gameBox');
    wordBox.innerHTML = '';
    for(let i = 0; i < n; i++) {
        if(i + 1 == n) {
            wordBox.innerHTML += formatWord(true); 
        }
        else {
            wordBox.innerHTML += formatWord(false); 
        }
    }

    const wordsList = document.querySelectorAll('.word');
    const firstWordLetters = wordsList[0].querySelectorAll('.letter');
    firstWordLetters[0].classList.add('current');
}

function tenWords() {
    newGame(10)
    prog.textContent = currentWordIndex + " / " + numOfWrods
}

function twentyFiveWords() {
    newGame(25)
    prog.textContent = currentWordIndex + " / " + numOfWrods
}

function fiftyWords() {
    newGame(50)
    prog.textContent = currentWordIndex + " / " + numOfWrods
}

function oneHundredWords() {
    newGame(100)
    prog.textContent = currentWordIndex + " / " + numOfWrods
}

function startTimer() {
    if(startTime === 0) {
        startTime = Date.now()
    }
}

function stopTimer() {
    const elapsedTime = Date.now() - startTime
    return elapsedTime
}

function displayResults(accuracy, wpm, totalTime) {
    const resultsDiv = document.getElementById('resultsDiv');
    
    // Clear previous results
    resultsDiv.innerHTML = '';

    // Create and append results content
    const title = document.createElement('h2');
    
    const accuracyText = document.createElement('p');
    accuracyText.textContent = `Accuracy: ${(accuracy * 100).toFixed(2)}%`;
    
    const wpmText = document.createElement('p');
    wpmText.textContent = `Words Per Minute (WPM): ${wpm}`;
    
    const timeText = document.createElement('p');
    timeText.textContent = `Total Time: ${totalTime} seconds`;

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.onclick = () => newGame(numOfWrods); // Restart game with current word count

    // Append elements to results div
    resultsDiv.appendChild(title);
    resultsDiv.appendChild(accuracyText);
    resultsDiv.appendChild(wpmText);
    resultsDiv.appendChild(timeText)
    resultsDiv.appendChild(playAgainButton);
    playAgainButton.focus();
}

document.addEventListener('keydown', ev => {
    startTimer()
    const key = ev.key;

    const wordsList = document.querySelectorAll('.word');
    let wordLetters = wordsList[currentWordIndex].querySelectorAll('.letter');

    
    if(key == 'Backspace' || key == 'Delete') {
        wordLetters[currentLetterIndex].classList.remove('current')
        if(wordLetters[currentLetterIndex].classList.contains('badSpace')) {
            wordLetters[currentLetterIndex].classList.remove('badSpace')
            wordLetters[currentLetterIndex].textContent = ' ' 
        }
        
        currentLetterIndex--
        
        if(currentLetterIndex < 0) {
            if(currentWordIndex > 0) {
                currentWordIndex = Math.max(0, currentWordIndex - 1);
                wordLetters = wordsList[currentWordIndex].querySelectorAll('.letter');
                currentLetterIndex = wordLetters.length - 1;
            }
            else {
                currentLetterIndex = 0
            }
        }
        wordLetters[currentLetterIndex].classList.remove('correct', 'incorrect')
        wordLetters[currentLetterIndex].classList.add('current')
        
    }
    else if(key.length === 1) {
        if (' ' == wordLetters[currentLetterIndex].textContent) {
            if(key != ' ') {
                wordLetters[currentLetterIndex].textContent = key
                wordLetters[currentLetterIndex].classList.add('badSpace')
            }
        }
        else if(key == wordLetters[currentLetterIndex].textContent) {
            wordLetters[currentLetterIndex].classList.add('correct')
        }
        else {
            wordLetters[currentLetterIndex].classList.add('incorrect')
        }
        // Move to the next letter
        wordLetters[currentLetterIndex].classList.remove('current');
        currentLetterIndex++;

        // If we're at the end of a word, move to the next word
        if (currentLetterIndex >= wordLetters.length) {
            prog.textContent = (currentWordIndex + 1) + " / " + numOfWrods 
            currentWordIndex++;
            currentLetterIndex = 0;

            // Check if we've reached the end of all words
            if (currentWordIndex < wordsList.length) {
                wordLetters = wordsList[currentWordIndex].querySelectorAll('.letter');
            } else {
                // Handle end of game scenario
                const totalCorrect = document.querySelectorAll('.correct').length
                const totalIncorrect = document.querySelectorAll('.incorrect').length
                const totalLetters = totalCorrect + totalIncorrect
                const accuracy = totalCorrect / totalLetters
                const totalTime = stopTimer()
                const wpm = Math.floor((numOfWrods / (totalTime / 1000) * 60) * accuracy)
                console.log(accuracy)
                console.log(Math.floor((numOfWrods / (totalTime / 1000) * 60) * accuracy));
                displayResults(accuracy, wpm, totalTime/1000);
                return;
            }
        }

        // Add current class to the new current letter
        wordLetters[currentLetterIndex].classList.add('current');
    }
});

newGame(50);


document.querySelectorAll('h1 button').forEach(button => {
    button.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
        }
    });
});