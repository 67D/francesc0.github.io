
let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');


//NOMBRE
function setUserName() {
	let myName = prompt('Ingresá tu nombre');
	localStorage.setItem('name', myName);
	myHeading.textContent = 'Hola ' + myName + '!';
}

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  let storedName = localStorage.getItem('name');
  myHeading.textContent = 'Hola ' + storedName + '!';
}

myButton.onclick = function() {
  setUserName();
}

function setUserName() {
	let myName = prompt('Por favor, ingrese su nombre:  ');
	if(!myName) {
		setUserName();
	} else {
		localStorage.setItem('name', myName);
		myHeading.textContent = `Hola ${myName}!`;
	}
}
	
