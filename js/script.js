/*
наличие favicon
использование БЭМ
js анимация

*/


document.getElementById("submit").onclick = () => {
  let text = document.getElementById("fname").value;
  document.getElementById("main").innerHTML = "";
  document.getElementById("history").innerHTML = "";
  axios.get(`https://cors-anywhere.herokuapp.com/http://yoda-api.appspot.com/api/v1/yodish?text=${text}`)
  .then(response => {
    let div = document.getElementById('main');
    div.innerHTML = response.data.yodish;
  })

  let addRequestToHistory = request => {
    let historyRequests = JSON.parse(localStorage.getItem('history'));
    if (historyRequests === null) {
      localStorage.setItem('history', JSON.stringify([text]))
    } else if (historyRequests.includes(text) == true) {
      return;
    } else {
      if (historyRequests.length > 5) {
        historyRequests.shift();
      }
      historyRequests.push(request);
      
      localStorage.setItem('history', JSON.stringify(historyRequests));
    }
  let historyDiv = document.getElementById('history')
  let historyP = document.createElement('p')
  historyP.className = 'history__p'
  historyP.innerHTML = JSON.parse(localStorage.getItem('history'));
  historyDiv.appendChild(historyP)
  }
  
  addRequestToHistory(text);
}

