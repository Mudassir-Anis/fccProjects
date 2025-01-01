const cnvrtBtn = document.getElementById('convert-btn');
const res = document.getElementById('output');
const inpEl = document.getElementById('number');
const formEl = document.getElementById('input-container');

const errOut = document.getElementById('error-output');
const romanEquivalent = {
    1000 : "M",
    900 : "CM",
    500 : "D",
    400 : "CD",
    100 : "C",
    90 :  "XC",
    50 :  "L",
    40 :  "XL",
    10 :  "X",
    9 :   "IX",
    5 :   "V",
    4 :   "IV",
    1 :   "I"
}
Object.freeze(romanEquivalent);
const arr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];


function numeralToRomanConverter(val) {
    let num;
    let str = "";
    if(!isNaN(val) && !val.includes('e') &&  val != "") {
        num = parseInt(val);
    } else {
        res.classList.add('style2');
        res.classList.remove('style1');
        res.style.display = "flex";
        // errOut.style.display = "flex";
        str = "Please enter a valid number."
        res.textContent = str;
        return;     
    }
    if(num > 3999) {
        res.classList.add('style2');
        res.classList.remove('style1');
        res.style.display = "flex";
        // errOut.style.display = "flex";
        str = "Please enter a number less than or equal to 3999"
        res.textContent = str;
        return;
     
    }
    if(num < 0) {

        res.classList.add('style2');
        res.classList.remove('style1');
        res.style.display = "flex";
        // errOut.style.display = "flex";
        str = "Please enter a number greater than or equal to 1"
        res.textContent = str;
        return;       
    }
    while(num && num != 0) {
        for(let i = 0; i < arr.length; i++) {
            if(num >= arr[i]) {
                str += romanEquivalent[arr[i]];
                num -= arr[i];
                break;
            }
        }
    }
    res.style.display = "flex";
    res.innerText = str;
}


function addListeners() {

    inpEl.addEventListener('keydown',(event) => {
  if(event.key === 'Enter')
       
       numeralToRomanConverter(inpEl.value);
    })

    cnvrtBtn.addEventListener('click', () => {
        res.style.display = "flex";
        numeralToRomanConverter(inpEl.value);
    })
    formEl.addEventListener('submit', (event) => {
        event.preventDefault();
    })

}

addListeners();
