
function initApp() {
  const myButton = document.getElementById("submitBtn");

  const context = {
    metadata: {},
    schoolSubjects: {},
    studySession: {},
  };
// hi
  

  myButton.addEventListener("click", async () => {
  const first_name = document.getElementById("first_name");
  const start_time = document.getElementById("start-time");
  const history_time = document.getElementById("subject-history-time");
  const science_time = document.getElementById("subject-science-time");
  const math_time = document.getElementById("subject-math-time");
  const english_time = document.getElementById("subject-english-time");
  const bible_time = document.getElementById("subject-bible-time");
  const lit_time = document.getElementById("subject-lit-time");
  const typing_time = document.getElementById("subject-typing-time");
  const btn = document.getElementById("submitBtn");

  // Fill context with your full prompt
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
Please give me the study plan in your response. 

provide response in exactly this format:
"Here is your homework plan, {first name}:

{start time for that period} - {end time for that period}: {subject} ({# of minutes} minutes)
{start time for that period} - {end time for that period}: Take a 5 minute break      (ONLY ADD BREAKS IF SUBJECT IS OVER 40 MINUTES)
{start time for that period} - {end time for that period}: {subject} (Part 1 - {# of minutes} minutes)
{start time for that period} - {end time for that period}: Take a 5 minute break (mid-subject)
{start time for that period} - {end time for that period}: {subject} (Part 2 - {# of minutes} minutes)

Your homework session will conclude at {time the session will conclude at}."

EXAMPLE(DO NOT USE THIS IN REAL RESPONSE): 
"Here is your homework plan, christian:

4:17 PM - 4:47 PM: History (30 minutes)
4:47 PM - 4:52 PM: Take a 5 minute break
4:52 PM - 5:12 PM: Science (Part 1 - 20 minutes)
5:12 PM - 5:17 PM: Take a 5 minute break (mid-subject)
5:17 PM - 5:38 PM: Science (Part 2 - 21 minutes)

Your homework session will conclude at 5:38 PM."

DO NOT PROVIDE TIME STAMPS IN MILITARY TIME. DO NOT INCLUDE "*" IN RESPONSE!!!
`;

  context.metadata.firstName = first_name.value;
  if (start_time.value) context.studySession.startTime = start_time.value;
  context.schoolSubjects.history = history_time.value;
  context.schoolSubjects.science = science_time.value;
  context.schoolSubjects.math = math_time.value;
  context.schoolSubjects.english = english_time.value;
  context.schoolSubjects.bible = bible_time.value;
  context.schoolSubjects.lit = lit_time.value;
  context.schoolSubjects.typing = typing_time.value;

  const promptText = JSON.stringify(context, null, 2);

  // ===== Start "Generating..." animation =====
  const originalText = btn.textContent;
  btn.disabled = true;
  let dots = 0;
  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    btn.textContent = "Generating" + ".".repeat(dots);
  }, 400);
  // ==========================================

  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptText }),
    });

    const data = await res.json();

    const geminiText = data?.result?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .join("") || "No response from Gemini.";

    console.log(data);

    // ===== Stop animation =====
    clearInterval(interval);
    btn.textContent = originalText;
    btn.disabled = false;
    // ==========================

    const modal = document.getElementById("gemini-modal");
    const modalText = document.getElementById("modal-text");
    const closeModal = document.getElementById("close-modal");

    modalText.textContent = geminiText;
    modal.style.display = "block";

    closeModal.onclick = () => { modal.style.display = "none"; };
    window.onclick = (event) => { 
      if (event.target === modal) modal.style.display = "none"; 
    };

  } catch (err) {
    // Stop animation on error
    clearInterval(interval);
    btn.textContent = originalText;
    btn.disabled = false;
    console.error(err);
  }
});
}

initApp();
// *   **07:48 AM - 08:13 AM:** History (Part 1)
// *   **08:13 AM - 08:18 AM:** 5-minute Break
// *   **08:18 AM - 08:43 AM:** History (Part 2)
