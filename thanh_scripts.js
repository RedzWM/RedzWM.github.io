/* Place your JavaScript in this file */
function getForm() {
  var num = document.getElementById("num").value;
  var digit = document.getElementById("digit").value;
  submitOK = "true";

  var max = "9"
  for (let i = 1; i < digit; i++) {
    max = max + "9"
  }
  return { num, max }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function showNum() {
  // document.getElementById("num1").innerHTML = ""
  // document.getElementById("num2").innerHTML = ""
  // document.getElementById("num3").innerHTML = ""
  // document.getElementById("num4").innerHTML = ""
  // document.getElementById("num5").innerHTML = ""
  // document.getElementById("num6").innerHTML = ""
  // document.getElementById("num7").innerHTML = ""
  // document.getElementById("num8").innerHTML = ""
  // document.getElementById("num9").innerHTML = ""
  // document.getElementById("num10").innerHTML = ""
  // document.getElementById("dai").innerHTML = ""
  
  let data = getForm()
  let num = data.num
  // Create circle output values
  const container = document.getElementById("container");
  for (let i = 1; i <= 10; i++) {
    const element = document.createElement("div");
    element.classList.add("element");

    // create a new p element
    const p = document.createElement('p');

    // set the text content of the p element
    p.textContent = (getRandomInt(0, parseInt(data.max))).toString().padStart(data.max.length, '0');
    // p.id = "num" + [i]

    // append the p element to the div
    element.appendChild(p);

    container.appendChild(element);
  }
  const elements = document.querySelectorAll("div.element");
  const radius = 250;
  const angle = 360 / elements.length;
  for (let i = 0; i < elements.length; i++) {
    const x = radius * Math.cos((angle * i) * (Math.PI / 180)) + 640;
    const y = radius * Math.sin((angle * i) * (Math.PI / 180)) + 300;
    elements[i].style.left = x + "px";
    elements[i].style.top = y + "px";
  }

  // document.getElementById(number).innerHTML = (getRandomInt(0, parseInt(data.max))).toString().padStart(data.max.length, '0')

  var dai = ["Bắc", "Trung", "Nam", "Bắc<br>Nam", "Bắc<br>Trung", "Trung<br>Nam", "Bắc<br>Trung<br>Nam"]
  document.getElementById("dai").innerHTML = dai[getRandomInt(0, 7)]

  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(p => {
    if (p.innerHTML === '') {
      p.setAttribute('data-empty', '');
    } else {
      p.removeAttribute('data-empty');
    }
  });
}

