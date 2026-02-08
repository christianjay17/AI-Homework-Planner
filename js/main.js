function initApp() {
    console.log("hi")
     const myButton = document.getElementById("submitBtn")
    const input = document.getElementById("first_name")
    const checkboxHistory = document.getElementById("subject-history")

    myButton.addEventListener("click", () => {
    console.dir(checkboxHistory.checked)
      console.log("My Name:",input.value)
    })

}

initApp()
// document.addEventListener("DOMContentLoaded", initApp);