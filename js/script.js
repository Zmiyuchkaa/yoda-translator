/*
использование БЭМ
js анимация
вставить ссылки на tips
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

  // Sets the number of stars we wish to display
const numStars = 100;

// For every star we want to display
for (let i = 0; i < numStars; i++) {
  let star = document.createElement("div");  
  star.className = "star";
  var xy = getRandomPosition();
  star.style.top = xy[0] + 'px';
  star.style.left = xy[1] + 'px';
  document.body.append(star);
}

// Gets random x, y values based on the size of the container
function getRandomPosition() {  
  var y = window.innerWidth;
  var x = window.innerHeight;
  var randomX = Math.floor(Math.random()*x);
  var randomY = Math.floor(Math.random()*y);
  return [randomX,randomY];
}
