import { CONFIG } from '../config.js'
function initApp() {
  const myButton = document.getElementById("submitBtn");

  const context = {
    metadata: {},
    schoolSubjects: {},
    studySession: {},
  };

document.getElementById("get-server-btn").addEventListener("click", async () => {
  const res = await fetch("/api/hello")
  const data = await res.json()

  document.getElementById("output").innerText = data.message
})

  myButton.addEventListener("click", async () => {
    const first_name = document.getElementById("first_name");
    const start_time = document.getElementById("start-time");
    const checkboxHistory = document.getElementById("subject-history");
    const history_time = document.getElementById("subject-history-time");
    const checkboxScience = document.getElementById("subject-science");
    const science_time = document.getElementById("subject-science-time");
    const checkboxMath = document.getElementById("subject-math");
    const math_time = document.getElementById("subject-math-time");
    const checkboxEnglish = document.getElementById("subject-english");
    const english_time = document.getElementById("subject-english-time");
    const checkboxBible = document.getElementById("subject-bible");
    const bible_time = document.getElementById("subject-bible-time");
    const checkboxLit = document.getElementById("subject-lit");
    const lit_time = document.getElementById("subject-lit-time");
    const checkboxTyping = document.getElementById("subject-typing");
    const typing_time = document.getElementById("subject-typing-time");

    // Fill context
    context.metadata.instructions = `
    Please reveiw the following infomation to create a homework plan for optimal homework doing. 
    The schema for the info i provided is this:
    context {
    metadata: {firstname: string(name you will call me)}
    schoolSubjects:{subject: string(time needed to do homework for that subject)}
    studysession: {startTime: string(this is the time the person wants to start doing homework)}
    }
    please take that info and create a homework plan that starts at the time i give you.
    Include 5 minute breaks between subjects and if the time needed for a single subject is longer then 40 minutes then provide a 5 minute break in the middle of that subject.
    Please give me the study plan in your response. DO NOT PROVIDE TIME STAMPS IN MILITARY TIME.

    `;
    if (first_name.value) context.metadata.firstName = first_name.value;
    if (start_time.value) context.studySession.startTime = start_time.value;
    if (checkboxHistory.checked)
      context.schoolSubjects.history = history_time.value;
    if (checkboxScience.checked)
      context.schoolSubjects.science = science_time.value;
    if (checkboxMath.checked) context.schoolSubjects.math = math_time.value;
    if (checkboxEnglish.checked)
      context.schoolSubjects.english = english_time.value;
    if (checkboxBible.checked) context.schoolSubjects.bible = bible_time.value;
    if (checkboxLit.checked) context.schoolSubjects.lit = lit_time.value;
    if (checkboxTyping.checked)
      context.schoolSubjects.typing = typing_time.value;

    // Convert context to text for Gemini
    const promptText = JSON.stringify(context, null, 2);

    // Send to Gemini
    // Send to Gemini
    let res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": CONFIG.GEMINI_API_KEY || "AIzaSyDzeyl9kak8HfKhKj5rV3QZjAeDEhQiJeQ", // replace with your key
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }],
            },
          ],
        }),
      },
    );

    // Read the response JSON
    const data = await res.json();

    // Extract the actual generated text
    const geminiText = data.candidates[0].content.parts
      .map((part) => part.text)
      .join("");

    console.log("Gemini response:", geminiText);

    // Display it on the page
    const outputDiv = document.getElementById("gemini-output");
    if (outputDiv) outputDiv.textContent = geminiText;

    // Read the response JSON
    // console.log("Gemini response:", data);
  });
}

initApp();
// *   **07:48 AM - 08:13 AM:** History (Part 1)
// *   **08:13 AM - 08:18 AM:** 5-minute Break
// *   **08:18 AM - 08:43 AM:** History (Part 2)

