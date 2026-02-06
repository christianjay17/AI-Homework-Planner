function initApp() {
    console.log("hi")
     const myButton = document.getElementById("submitBtn")
    const input = document.getElementById("first_name")

    myButton.addEventListener("click", () => {
      console.log("My Name:",input.value)
    })

}

initApp()
// document.addEventListener("DOMContentLoaded", initApp);