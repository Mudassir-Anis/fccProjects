const infixToFunction = {
    "+" : (x,y) => x + y,
    "-" : (x,y) => x - y,
    "*" : (x,y) => x * y,
    "/" : (x,y) => x / y
}

const isEven = num => (num % 2) === 0;

const sum = nums => nums.reduce((acc, el) => acc + el, 0);

const average = nums => sum(nums) / nums.length;


const range = (start,end) => new Array(end - start + 1).fill(start).map((num,i) => num + i);

const charRange = (char1,char2) => range(char1.charCodeAt(0),char2.charCodeAt(0)).map((code) => String.fromCharCode(code));

const median = nums => {
    const sorted = nums.toSorted((a,b) => a - b);
    const length = sorted.length;
    const middle = sorted.length / 2 - 1;
    return isEven(length) 
            ? average ([nums[middle], nums[middle + 1]])
            : nums[Math.ceil(middle)];
    
}




const spreadSheetFunctions = {
    sum,
    average,
    median,
    even : nums => nums.filter(isEven),
    someeven : nums => nums.some(isEven),
    everyeven : nums => nums.every(isEven),
    firstTwo : nums => nums.slice(0,2),
    lastTwo : nums => nums.slice(-2),
    has2 : nums => nums.includes(2),
    increment : nums => nums.map((num) => num + 1),
    nodupes : nums => [...new Set(nums).values],
    
}

const infixEval = (str,regex) => str.replace(regex, (_match, argument1, operator, argument2) => infixToFunction[operator](parseFloat(argument1), parseFloat(argument2)));

const highPrecedence = str => {
    const regex = /([\d.]+)([*/])([\d.]+)/;
    const str2 = infixEval(str, regex);
    return str === str2 ? str : highPrecedence(str2);
}

const applyFunction = str => {
      const noHigh = highPrecedence(str);
      const infix = /([\d.]+)([+-])([\d.]+)/;
      const str2 = infixEval(noHigh, infix);
      const functionCall = /([a-z0-9]*)\(([0-9,. ]+)\)(?!.*\()/
      const toNumberList = arg => arg.split(",").map(parseFloat)
      const apply = (fn, args) => spreadSheetFunctions[fn.toLowerCase()](toNumberList(args));
      return str2.replace(functionCall, (match, fn, args) => fn.toLowerCase() in spreadSheetFunctions ? apply(fn, args) : match);


}


const evalFormula = (x, cells) => {
    const idToText = id => cells.find(cell => cell.id === id).value;
    const rangeRegex = /([A-Z])([1-9][0-9]?):([A-Z])([1-9][0-9]?)/gi
    const rangeFromString = (num1,num2) => range(parseFloat(num1),parseFloat(num2));
    const elemValue = num => character => idToText(character + num);
    const addCharacters = character1 => character2 => num => charRange(character1,character2).map(elemValue(num));
    const rangeExpanded = x.replace(rangeRegex, (_match,char1,num1,char2,num2) => rangeFromString(num1,num2).map((addCharacters(char1)(char2))))
    const cellRegex = /[A-J][1-9][0-9]?/gi
    const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
    const functionExpanded = applyFunction(cellExpanded);
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded,cells);

}

window.onload = () => {
    console.log("Hello");
    const container = document.getElementById('container');
    const createLabel = (name) => {
        const label = document.createElement("div");
        label.textContent = name;
        label.className = "label";
        container.appendChild(label)
    }
    const letters = charRange("A","J");

    letters.forEach(createLabel);
    range(1,99).forEach((number) => {
            console.log(number);
            createLabel(number);
            letters.forEach((letter) => {
                const input = document.createElement("input");
                input.type = "text";
                input.id = letter + number;
                input.onchange = update;
                container.appendChild(input)
            })
    })
}

const update = (event) => {
    const element = event.target;
    const value = element.value.replace(/\s+/g,"");

    if(!value.includes(element.id) && value.startsWith("=")) {
        element.value = evalFormula(value.slice(1),Array.from(document.getElementById('container').children));
    }

}