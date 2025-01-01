
const inpField = document.getElementById('inp-field');
const cnvrtBtn = document.getElementById('btn');

cnvrtBtn.addEventListener('click',() => {
    executeProcess(inpField.value);
})


inpField.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        executeProcess(inpField.value);
    }
})
function decimalToBinary(num) {
    if(num === 0 || num === 1) {
        return String(num);
    }

    return decimalToBinary(Math.floor(num / 2)) + (num % 2);    
}

function executeProcess(str) {
    
    const num = parseInt(str);
    if(num < 0 || isNaN(num)) {
        alert("Please provide a decimal number greater than or equal to 0");
        return;
    }
    else if(num === 5) {
        showAnimation();
        return;
    }
    else {
        const res = decimalToBinary(num);
        document.getElementById('result').textContent = res;
        inpField.value = ""
        
    }

}
const animationData = [
    {
        inputVal : 5,
        addDelay : 1000,
        msg : 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
        showMsgDelay : 15000,
        removeDelay : 20000
    },
    {
        inputVal : 2,
        addDelay : 1500,
        msg : 'decimalToBinary(2) returns "1" + 0 (5 % 2). Then it pops off the stack.',
        showMsgDelay : 10000,
        removeDelay : 15000
    },
    {
        inputVal : 1,
        addDelay : 2000,
        msg : 'decimalToBinary(2) returns "1" + 0 (5 % 2). Then it pops off the stack.',
        showMsgDelay : 5000,
        removeDelay : 10000
    }
]

function showAnimation() {

    document.getElementById('result').innerHTML = `<h2 id="stack-heading" >Call Stack Animation</h2>`;

    animationData.forEach((elem) => {
        
        setTimeout(() => {
            document.getElementById('stack').innerHTML += `<p class="basic-style" id="${elem.inputVal}">decimalToBinary(${elem.inputVal})</p>`

        },elem.addDelay)

        setTimeout(() => {
               document.getElementById(elem.inputVal).innerHTML = elem.msg; 
        }, elem.showMsgDelay);

        setTimeout(() => {
            document.getElementById(elem.inputVal).remove();
        },elem.removeDelay);
        
    })

}


