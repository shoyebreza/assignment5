

document.addEventListener("DOMContentLoaded", function () {
    const donatBtn = document.querySelectorAll(".donateBtn");
    const donatInput = document.querySelectorAll(".donationInput");
    const increaseSpans = document.querySelectorAll(".increase");
    const decreaseEl = document.getElementById("decrease"); 
  
    donatBtn.forEach((button, index) => {
      button.addEventListener("click", function () {
        const donatAmount = parseInt(donatInput[index].value);
  
         // validate input amount 
        if (isNaN(donatAmount) || donatAmount <= 0) {
          alert("Please enter a valid donation amount.");
          return;
        }
  
        //current amount 
        let decrease = parseInt(decreaseEl.textContent);
  
         // validate negative amount 
        if (donatAmount > decrease) {
          alert("Error: Donation amount exceeds available balance.");
          return;
        }
  
         // increase into existing amount 
        let increase = parseInt(increaseSpans[index].textContent);
        increaseSpans[index].textContent = increase + donatAmount;
  
         
        decreaseEl.textContent = decrease - donatAmount;
  
         
        createHistory(donatAmount);
      });
    });
});
  
function createHistory(donatAmount) {
     
    let donatHis = JSON.parse(localStorage.getItem("donationHistory")) || [];
    donatHis.push({
      date: new Date().toLocaleString(),
      amount: donatAmount
    });
    localStorage.setItem("donationHistory", JSON.stringify(donatHis));
}

window.onload = function () {
    const historyList = document.getElementById("donateHistory");
    let donationHistory = JSON.parse(localStorage.getItem("donationHistory")) || [];
  
    donationHistory.forEach((donation) => {
      let donationItem = document.createElement("div");
      donationItem.classList.add("border", "border-gray-300","lg:w-full", "p-4", "rounded-lg");
      donationItem.innerHTML = `<p>Date: ${donation.date}</p><p>Amount: ${donation.amount} BDT</p>`;
      historyList.appendChild(donationItem);
    });
};
  