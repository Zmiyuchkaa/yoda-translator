/*
использование БЭМ
добавить комментарии к блокам
рефакторинг кода
проверка на бесполезные стили
*/


document.getElementById("submit").onclick = () => {
  let text = document.getElementById("fname").value;
  document.getElementById("main").innerHTML = "";
  document.getElementById("history").innerHTML = "";
  document.getElementById("inspiration").innerHTML = "";
  axios.get(`https://cors-anywhere.herokuapp.com/http://yoda-api.appspot.com/api/v1/yodish?text=${text}`)
  .then(response => {
    let div = document.getElementById('main');
    let createResponse = document.createElement("h2")
    let createTitle = document.createElement("p");
    div.appendChild(createTitle);
    div.appendChild(createResponse); 
    createTitle.innerHTML = "Translated to Yodish:"
    createResponse.innerHTML = response.data.yodish;
  })
}

document.getElementById("button-history").onclick = () => {
  let text = document.getElementById("fname").value;
  if (text !== "") {
    let historyRequests = JSON.parse(localStorage.getItem('history')); 
    if (historyRequests === null) {
      localStorage.setItem('history', JSON.stringify([text]))
    } else { 
        if (historyRequests.length > 5) {
          historyRequests.shift();
        }
      historyRequests.push(text);
      localStorage.setItem('history', JSON.stringify(historyRequests));
      }
  }
  
  let historyDiv = document.getElementById('history');  
  let historyArray = JSON.parse(localStorage.getItem('history'))
  historyArray.forEach(story => {
    let historyP = document.createElement('span');    
    historyP.innerHTML = story;
    historyP.className = 'history__p'
    historyDiv.appendChild(historyP);
  })
  
  document.getElementById("inspiration").style.display = "none";
  document.getElementById("button-history").style.display = "none";
}


let tips = document.getElementsByClassName("yodish-main__tips__examples__each")
for(let i =0; i < tips.length; i++) {
  tips.item(i).onclick = elem => {
    document.getElementById("fname").value = elem.target.innerHTML
    document.getElementById("submit").click();
  }
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

