function initApp() {
    const myButton = document.getElementById("submitBtn")
    const start_time = document.getElementById("start-time")
    const history_inputs = document.getElementById("")
    
    const context = {
      
    }

    myButton.addEventListener("click", () => {
      const checkboxHistory = document.getElementById("subject-history")
      const first_name = document.getElementById("first_name")
      const history_time = document.getElementById("subject-history-time")
      
console.log(checkboxHistory.value)
      if (first_name.value) {
        context.firstName = first_name.value
        console.log("First name IS set:", context.firstName)
      } else {
        console.log("First name not set", context)
      }

      if (checkboxHistory.checked == true) {
        context.history = history_time.value
        console.log("History IS Checked", checkboxHistory.checked)
      } else {
        console.log("History IS NOT Checked", context)
      }
      console.log(context)
    })


    
}

initApp()



// document.addEventListener("DOMContentLoaded", initApp); 