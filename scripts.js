// Get form data
function getForm() {
  const num = parseInt(document.getElementById("num").value, 10);
  const digit = parseInt(document.getElementById("digit").value, 10);
  const max = '9'.repeat(digit);
  return { num, max };
}

// Generate a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// Show random numbers and update the "dai" element
function showNum() {
  const data = getForm();
  const { num, max } = data;

  // Clear previous numbers and dai content
  for (let i = 1; i <= 10; i++) {
    document.getElementById(`num${i}`).innerHTML = "";
  }
  document.getElementById("dai").innerHTML = "";

  // Generate and display random numbers
  for (let i = 1; i <= num; i++) {
    const randomNum = getRandomInt(0, parseInt(max)).toString().padStart(max.length, '0');
    document.getElementById(`num${i}`).innerHTML = randomNum;
  }

  // Randomly select and display a "dai" value
  const daiList = ["Bắc", "Trung", "Nam", "Bắc<br>Nam", "Bắc<br>Trung", "Trung<br>Nam", "Bắc<br>Trung<br>Nam"];
  document.getElementById("dai").innerHTML = daiList[getRandomInt(0, daiList.length)];

  // Mark empty paragraphs with data-empty attribute
  document.querySelectorAll('p').forEach(p => {
    if (p.innerHTML === '') {
      p.setAttribute('data-empty', '');
    } else {
      p.removeAttribute('data-empty');
    }
  });
}
