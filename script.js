const moodSelect = document.getElementById("moodSelect");
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const clearBtn = document.getElementById("clearQuote");

newQuoteBtn.addEventListener("click", () => {
  const mood = moodSelect.value;
  if (!mood) {
    quoteDisplay.textContent = "Please select a mood first!";
    return;
  }

  fetch(`quotes/${mood.toLowerCase()}.txt`)
    .then(response => {
      if (!response.ok) {
        throw new Error("File not found");
      }
      return response.text();
    })
    .then(data => {
      const quotes = data.split("\n").filter(q => q.trim() !== "");
      if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available!";
        return;
      }
      const random = Math.floor(Math.random() * quotes.length);
      quoteDisplay.textContent = quotes[random];
    })
    .catch(error => {
      console.error("Error fetching quotes:", error);
      quoteDisplay.textContent = "Error loading quotes.";
    });
});

clearBtn.addEventListener("click", () => {
  moodSelect.value = "";
  quoteDisplay.textContent = "Your quote will appear here...";
});
