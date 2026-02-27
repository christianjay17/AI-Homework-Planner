function initApp() {
  const myButton = document.getElementById("submitBtn");

  const context = {
    metadata: {},
    schoolSubjects: {},
    studySession: {},
  };

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

    // Fill context
    context.metadata.instructions = `...`; // keep your instructions as-is
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

      // Stop animation
      clearInterval(interval);
      btn.textContent = originalText;
      btn.disabled = false;

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