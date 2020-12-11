     var storedNumber = 0; //number on the left of operation (storedNumber [+,-,*..] currentNumber = result)
        var currentNumber = ''; //number on the right of operation
        var result = 0; //aux
        var operation = ''; //+,-,*...

        function clearEntry(){
            currentNumber = '';
            displayNumber('0');
        }

        function clearC(){
            displayNumber('0');
            currentNumber = '';
            storedNumber = 0;
            result = 0;
            console.log('on clear');
        }

        function retr(){ //Removes the last number inputed sequentially. 
            if(currentNumber.length > 1){
                currentNumber = currentNumber.slice(0, -1);
            }else{ currentNumber = '0'; } // If removed the whole current numeration, leave a 0.
            displayNumber(currentNumber);
        }

        function displayNumber(num){    
            document.getElementById('display').innerText = num;
        }

        function addDecimal(){
            currentNumber += '.';
        }

        function addValue(digit){
            if(currentNumber == '0'){currentNumber = ''}; //This is made to completely clear anything left in the buffer specially after retr deleting values till it leaves a 0;
            currentNumber += digit;
            console.log('Current Value: ', currentNumber);
            displayNumber(currentNumber);
        }

        function addOperation(key){
            if(result != 0){currentNumber = parseFloat(result)}; //If we have already operated, bring back the result of the prev. operation to be evaluated with the new number;
            console.log('Bringing back the prev result: ',currentNumber);

            operation = key;
            console.log('Operation: ', operation);
            displayNumber(operation);

            if (operation == '%' || operation == 'sqrt' || operation == 'inv' || operation == '+-'){ //If operation only requires one number to operate (case of: %, sqrt, inv);
                result = calculate(0, currentNumber, operation); //currentNumber only needed. Ready to operate.
                result = result.toFixed(10); //Limit lenght to 10 digits
                console.log('Stored Number: ', result);
                displayNumber(result);
                currentNumber = '';
            } else {
                storedNumber = currentNumber; //Save the second number input on storedNumber to prevent replacement. 
                console.log('Stored Number: ', storedNumber);
                currentNumber = '';
            }
        }

        function resolveCalculation(){
            result = calculate(storedNumber, currentNumber, operation); //Once calculated, take it to our aux variable, result.
            if (Number.isNaN(result)){result = 'Error';}
            console.log('Result is: ',result);
            displayNumber(result);
            //Initialize temp variables to get the next numbers.
            storedNumber ='';
            currentNumber ='';
        }


        function calculate(stored, num, key){

            console.log('calculation: ', stored, key, num);

            switch(key){
                case '+':  
                    return parseFloat(stored) + parseFloat(num);
                    break;
                case '-': { 
                    return parseFloat(stored) - parseFloat(num);
                    break; }
                case '*': { 
                    return parseFloat(stored) * parseFloat(num);
                     break; }
                case '/': { 
                    return parseFloat(stored) / parseFloat(num);
                     break; }
                case '%': {
                    return parseFloat(num / 100);
                    break; }
                case 'sqrt': { 
                    return parseFloat(Math.sqrt(num));
                    break; }
                case 'inv': { 
                    return parseFloat(1 / num);
                    break; }
                case '+-': 
                    return parseFloat(num) * -1;
                    break;
                default:
                    break;
            }
        }