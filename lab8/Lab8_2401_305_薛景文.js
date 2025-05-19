
const students = [
    "1", "2", "3", "4", "5", "6", "7", "8",
    "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
	 "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"
];

const studentListEl = document.getElementById('studentList');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const selectedStudentEl = document.getElementById('selectedStudent');
const resultAreaEl = document.getElementById('resultArea');

let intervalId = null;
let isSelecting = false;
let currentHighlightIndex = -1;

function initStudentList() {
    students.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.innerHTML = `
            <span class="text-gray-700">${student}</span>
        `;
        card.dataset.index = index;
        studentListEl.appendChild(card);
    });
}

function selectRandomStudent() {
    if (currentHighlightIndex !== -1) {
        const prevCard = document.querySelector(`.student-card[data-index="${currentHighlightIndex}"]`);
        if (prevCard) prevCard.classList.remove('highlight');
    }
    
    const randomIndex = Math.floor(Math.random() * students.length);
    const card = document.querySelector(`.student-card[data-index="${randomIndex}"]`);
    if (card) {
        card.classList.add('highlight');
        currentHighlightIndex = randomIndex;
    }
}

function startSelection() {
    if (isSelecting) return;
    
    isSelecting = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    selectedStudentEl.textContent = '';
    resultAreaEl.classList.remove('result-animation');
    
    intervalId = setInterval(selectRandomStudent, 100);
}

function stopSelection() {
    if (!isSelecting) return;
    
    isSelecting = false;
    clearInterval(intervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    if (currentHighlightIndex !== -1) {
        const selectedStudent = students[currentHighlightIndex];
        selectedStudentEl.textContent = selectedStudent;
        resultAreaEl.classList.add('result-animation');
        
        resultAreaEl.classList.add('border-blue-500');
        setTimeout(() => {
            resultAreaEl.classList.remove('border-blue-500');
        }, 1000);
    }
}

startBtn.addEventListener('click', startSelection);
stopBtn.addEventListener('click', stopSelection);

initStudentList();    