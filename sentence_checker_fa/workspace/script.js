var main = function() {
    /** isPunctuationMark(Character c)
     * Returns true if c is a punctuation mark.
     */
    var isPunctuationMark = function(c) {
        if ((c == ".") || (c == "!") || (c == "?")) {
            return true;
        }
        else {
            return false;
        }
    };
    /** checkUppercase(Character c)
     * Returns true if c is uppercase, returns false if c is lowercase.
     */
    var checkUppercase = function(c) {
        if (c == c.toUpperCase()) {
            return true;
        }
        else if (c == c.toLowerCase()) {
            return false;
        }
    };
    /** isNumber(Character c)
     * Returns true if c is a number, else returns false.
     */
    var isNumber = function(c) {
        if (!isNaN(c)) {
            return true;
        }
        else {
            return false;
        }
    };
    /** isLetterOrNumber(Character c)
     * Returns true if c is a letter or number, else returns false.
     */
    var isLetterOrNumber = function(c) {
        if ((!isPunctuationMark(c)) && (c != ",") && (c != ":") && (c != ";") &&
        (c != "-")) {
            return true;
        }
        else {
            return false;
        }
    };
    $(".button").click(function() { //if the user clicks "Check"
       var input = $(".status-box").val(); //save whatever is in box to "input"
       var containsPunctuation = false;
       var firstChar = input.charAt(0); /*save the first character of input to 
       firstChar*/
       var thirdLastChar = input.charAt(input.length-3); /* save the third-to-
       last character of input to thirdLastChar */
       var secondLastChar = input.charAt(input.length-2); /* save the second-to-
       last character of input to secondLastChar */
       var lastChar = input.charAt(input.length-1); /* save the last character
       of input to lastChar */
       var inWord = false; /* initially not in a word */
       var seenNumber = false; /* not yet seen a number */
       var spaceAfterPunctuation = true; /* is there space after punctuation
       marks? */
       var startCapital = true; /* is the first letter in a sentence capital? */
       
       /* variables handling other results */
       var result6 = true;
       var result8 = true;
       var result9 = true;
       var result10 = true;
       var result11 = true;
       
       var seenApostrophe = false; /* not yet seen an apostrophe */
       var correct = false; /* text is not yet considered syntactically correct */
       var seenNaN = false; /* not yet seen a non-number */
       var seenCapital = false; /* not yet seen a capital */
       if (input.length > 0) { // if there is text
           $(".result1").text("Yes");
           for (var i = 0; i < input.length; i++) { // loop through text
                var prevPrevChar = input.charAt(i-2);
                var prevChar = input.charAt(i-1);
                var currentChar = input.charAt(i);
                var nextChar = input.charAt(i+1);
                var nextNextChar = input.charAt(i+2);
                if ((currentChar == "." ) || (currentChar == "!") || 
                (currentChar == "?") || (currentChar == ",") || 
                (currentChar == ":") || (currentChar == ";")) {
                    containsPunctuation = true;
                    inWord = false; // no longer in word when we hit punctuation
                    
                    /* re-initialize seen variables to false */
                    seenNumber = false;
                    seenApostrophe = false;
                    seenCapital = false;
                    seenNaN = false;
                    
                    if ((i < lastChar) && (nextChar != " ")) { /*if i is 
                    not the last char and there is no space after it*/
                        spaceAfterPunctuation = false;
                    }
                    if (isNumber(prevChar)) {
                        result6 = false;
                    }
                }
                if (currentChar == " ") {
                    inWord = false;
                    seenNumber = false;
                    seenApostrophe = false;
                    seenNaN = false;
                    seenCapital = false;
                    if (prevChar == " ") {
                        if (!isPunctuationMark(prevPrevChar)) {
                            result8 = false;
                        }
                    }
                }
                else { // otherwise we are still in the word
                    inWord = true;
                }
                if ((isPunctuationMark(currentChar)) && 
                (currentChar != lastChar) && (!isPunctuationMark(nextNextChar))) {
                    if (!checkUppercase(nextNextChar)) {
                        startCapital = false;
                    }
                }
                if (inWord) {
                    if (isNumber(currentChar)) {
                        seenNumber = true;
                        if (seenNaN) {
                            result6 = false;
                        }
                    }
                    else {
                        seenNaN = true;
                        if (seenNumber) {
                            result6 = false;
                        }
                    }
                    if (currentChar == "'") { /* check if there are multiple 
                    apostrophes */
                        if (seenApostrophe) {
                            result10 = false;
                        }
                        else {
                            seenApostrophe = true;
                        }
                        if ((prevChar == " ") && (nextChar == " ")) {
                            result10 = false;
                        }
                    }
                    if (checkUppercase(currentChar)) {
                        if (seenCapital) {
                            result11 = false;
                        }
                        seenCapital = true;
                    }
                }
                if (currentChar == "-") { /* check if hyphens are between 
                non-hyphens */
                    if ((isLetterOrNumber(prevChar)) && 
                    (isLetterOrNumber(nextChar))) {
                        result9 = true;
                    }
                    else {
                        result9 = false;
                    }
                }
            }
            /* output results to HTML */
            if (isNumber(firstChar)) {
                result6 = false;
            }
            if (containsPunctuation) {
                $(".result2").text("Yes");
            }
            else {
                $(".result2").text("No");
                spaceAfterPunctuation = false;
                $(".result4").text("No");
            }
            if (isPunctuationMark(lastChar)) {
                $(".result4").text("Yes");
            }
            else if ((isPunctuationMark(secondLastChar)) && (lastChar == " ")) {
                $(".result4").text("Yes");
            }
            else if ((isPunctuationMark(thirdLastChar)) && 
            (secondLastChar == " ") && (lastChar == " ")) {
                $(".result4").text("Yes");
            }
            else {
                $(".result4").text("No");
            }
            if (spaceAfterPunctuation) {
                $(".result3").text("Yes");
            }
            else {
                $(".result3").text("No");
            }
            if (!checkUppercase(firstChar)) {
                startCapital = false;
            }
            if (startCapital) {
                $(".result5").text("Yes");
            }
            else {
                $(".result5").text("No");
            }
            if (result6) {
                $(".result6").text("Yes");
            }
            else {
                $(".result6").text("No");
            }
            if (firstChar == " ") {
                $(".result7").text("No");
            }
            else {
                $(".result7").text("Yes");
            }
            if (result8) {
                $(".result8").text("Yes");
            }
            else {
                $(".result8").text("No");
            }
            if (result9) {
                $(".result9").text("Yes");
            }
            else {
                $(".result9").text("No");
            }
            if (result10) {
                $(".result10").text("Yes");
            }
            else {
                $(".result10").text("No");
            }
            if (result11) {
                $(".result11").text("Yes");
            }
            else {
                $(".result11").text("No");
            }
        }
        else { //if there is no input
           $(".result1").text("No");
           $(".result2").text("No");
           $(".result3").text("No");
           $(".result4").text("No");
           $(".result5").text("No");
           $(".result6").text("No");
           $(".result7").text("No");
           $(".result8").text("No");
           $(".result9").text("No");
           $(".result10").text("No");
        }
        /* if all results are true, the text is syntactically correct */
        if (($(".result1").text() == "Yes") && ($(".result2").text() == "Yes") 
        && ($(".result3").text() == "Yes") && ($(".result4").text() == "Yes") &&
        ($(".result5").text() == "Yes") && (result6) && 
        ($(".result7").text() == "Yes") && (result8) && (result9) && 
        (result10) && (result11)) {
            correct = true;
            $(".finalResult").text("The text is syntactically correct.");
        }
        else {
            correct = false;
            $(".finalResult").text("The text is syntactically incorrect.");
        }
})};

//var sentence = prompt("Please write a sentence.");

$(document).ready(main);