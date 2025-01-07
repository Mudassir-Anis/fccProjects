const obj = {
    "1 555-555-5555" : true,
    "1 (555) 555-5555" : true, 
    "1(555)555-5555" : true,
    "1 555 555 5555" : true,
    "5555555555" : true,
    "555-555-5555" : true,
    "(555)555-5555" : true

}

const chkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const inpEl = document.getElementById('user-input');

const addListeners = () => {
    chkBtn.addEventListener('click',() => {
        startExecution(inpEl.value);
    })

    clearBtn.addEventListener('click',() => {
    const result = document.getElementById('results-div');
    result.innerHTML = "";
})        
}

const startExecution = (str) => {
    if(str === "") {
        alert("Please provide a phone number");
    } else {
        const text = validateNumber(str) ? `Valid US number: ${str}`
: `Invalid US number: ${str}`

        updateResult(text);
    }
}

const updateResult = (text) => {
    const result = document.getElementById('results-div');
    const para = document.createElement("p");
    para.className = "paragraph"
    para.textContent = text;
    result.appendChild(para);
}


const validateNumber = (str) => {
    const regex1 = /^1?\s?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/

    // const regex = /\d/g;
    // const first = str[0];
    // const str2 = str.replace(regex,"5");
    // console.log(str2);
    // if(obj[str2] || obj[`${first}${str2.slice(1)}`]){
    //     return true;
    // }
    // else {
    //     return false;
    // }
    
    return regex1.test(str);
}

addListeners();
