// created a key-value in local storage, display it on screen by click a button
document.getElementById("button-history").onclick = () => {
  let text = document.getElementById("input").value;
  if (text != "") {
    let historyRequests = JSON.parse(localStorage.getItem('history')); 
    if (historyRequests === null) {
      localStorage.setItem('history', JSON.stringify([text]))
    } else { 
        if (historyRequests.length > 5) {
          historyRequests.shift();
        }
      }
      historyRequests.push(text);
      localStorage.setItem('history', JSON.stringify(historyRequests));
  }
  let historyDiv = document.getElementById('history');  
  let historyArray = JSON.parse(localStorage.getItem('history'))
  historyArray.forEach(story => {
    let historyP = document.createElement('span');    
    historyP.innerHTML = story;
    historyP.className = 'main__history-container__history-p'
    historyDiv.appendChild(historyP);
  })
  document.getElementById("inspiration").style.display = "none";
  document.getElementById("button-history").style.display = "none";
}

// connect to API by axios and show response by click on button
document.getElementById("submit").onclick = () => {
  let text = document.getElementById("input").value;
  document.getElementById("response").innerHTML = "";
  document.getElementById("inspiration").innerHTML = "";
  axios.get(`https://cors-anywhere.herokuapp.com/http://yoda-api.appspot.com/api/v1/yodish?text=${text}`)
  .then(response => {
    let div = document.getElementById('response');
    let createResponse = document.createElement("h2")
    let createTitle = document.createElement("p");
    div.appendChild(createTitle);
    div.appendChild(createResponse); 
    createTitle.innerHTML = "Translated to Yodish:"
    createResponse.innerHTML = response.data.yodish;
  })
}

// show response by click on quotes
let quotes = document.getElementsByClassName("main__quotes__container__example")
for (let i = 0; i < quotes.length; i++) {
  quotes.item(i).onclick = elem => {
    document.getElementById("input").value = elem.target.innerHTML
    document.getElementById("submit").click();
  }
}

  // set the number of stars 
const numStars = 100;

// for every star we want to display
for (let i = 0; i < numStars; i++) {
  let star = document.createElement("div");  
  star.className = "star";
  var xy = getRandomPosition();
  star.style.top = xy[0] + 'px';
  star.style.left = xy[1] + 'px';
  document.body.append(star);
}

// get random x, y values based on the size of the container
function getRandomPosition() {  
  var y = window.innerWidth;
  var x = window.innerHeight;
  var randomX = Math.floor(Math.random()*x);
  var randomY = Math.floor(Math.random()*y);
  return [randomX,randomY];
}

