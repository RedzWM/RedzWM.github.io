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
  document.getElementById("num1").innerHTML = ""
  document.getElementById("num2").innerHTML = ""
  document.getElementById("num3").innerHTML = ""
  document.getElementById("num4").innerHTML = ""
  document.getElementById("num5").innerHTML = ""
  document.getElementById("num6").innerHTML = ""
  document.getElementById("num7").innerHTML = ""
  document.getElementById("num8").innerHTML = ""
  document.getElementById("num9").innerHTML = ""
  document.getElementById("num10").innerHTML = ""
  let data = getForm()
  let num = data.num
  for (let i = 1; i <= num; i++) {
    let number = "num" + [i]

    document.getElementById(number).innerHTML = (getRandomInt(0, parseInt(data.max))).toString().padStart(data.max.length, '0')
  }

  const paragraphs = document.querySelectorAll('td');
  paragraphs.forEach(td => {
    if (td.innerHTML === '') {
      td.setAttribute('data-empty', '');
    } else {
      td.removeAttribute('data-empty');
    }
  });
}