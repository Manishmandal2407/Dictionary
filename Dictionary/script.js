const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;

            const audioSrc = data[0].phonetics.find(p => p.audio)?.audio;
            if (audioSrc) {
                sound.setAttribute("src", audioSrc);
            } else {
                sound.removeAttribute("src");
            }
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

// ✅ Add this to support Enter key
document.getElementById("inp-word").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});

function playSound() {
    if (sound.src) {
        sound.play().catch(err => {
            console.error("Audio playback failed:", err);
            alert("Failed to play the sound.");
        });
    } else {
        alert("No audio available for this word.");
    }
}
