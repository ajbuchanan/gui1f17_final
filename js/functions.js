/*
======NOTES=======
Example Query: https://api.scryfall.com/cards/named?exact=lightning+bolt
==================

Alexander Buchanan
ID: 01408299
email: alexander_buchanan@student.uml.edu.
gitHub link: https://github.com/ajbuchanan/gui1f17_final
*/

//Constants
var CARD_IMG_DIV = "card_imgs";

//Global Vars
var cardNumData;
var cardImgData;
var instructionBool = false;
var query = "https://api.scryfall.com/cards/named?exact=";

//Main function does most of the work
function generateCardData()
{
    cardNumData = {};
    cardImgData = {};
    var inputData = document.getElementById("card_input").value;

    var cardNames = inputData.split("\n");

    for(var i = 0; i < cardNames.length; i++)
    {
        var cardSplit = cardNames[i].split(' ');
        var thisQuery = query;
        var cardName = "";
        var cardNum = 1;
        var loopStart = 0;

        if(!isNaN(cardSplit[0]))
        {
            cardNum = cardSplit[0];
            loopStart = 1;
        }

        for(var j = loopStart; j < cardSplit.length; j++)
        {
            if(j != cardSplit.length - 1)
            {
                thisQuery += cardSplit[j] + "+";
                cardName += cardSplit[j] + " ";
            }
            else
            {
                thisQuery += cardSplit[j];
                cardName += cardSplit[j];
            }
        }

        cardNumData[cardName] = cardNum;

        httpGetAsync(thisQuery, cardName, parseCardData);
    }
}

//Async http request
function httpGetAsync(theUrl, name, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(name, xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

//Callback from http request, gets image data from response
function parseCardData(name, responseData)
{
    var cardJSON = JSON.parse(responseData);
    cardImgData[name] = cardJSON.image_uris.normal;

    createCardImage(name);
}

//Debug function left in for posterity
function printData()
{
    for(var key in cardNumData)
    {
        document.write("Card: " + key + ", Num: " + cardNumData[key] + " and url: " + cardImgData[key] + "<br>");
    }
}

//Generates a card image
function createCardImage(name)
{
    swapToImgs();

    for(var i = 0; i < cardNumData[name]; i++)
    {
        var img = document.createElement("img");
        img.setAttribute("src", cardImgData[name]);
        img.setAttribute("width", 250);
        img.setAttribute("height", 350);

        document.getElementById(CARD_IMG_DIV).appendChild(img);
    }
}

//Next 4 Functions just change what is visible on the webpage.
function swapToImgs()
{
    document.getElementById("input").style.display = 'none';
    document.getElementById("img_options").style.display = 'block';
}


function hideAllNonImg()
{
    document.getElementById("header").style.display = 'none';
    document.getElementById("input").style.display = 'none';
    document.getElementById("img_options").style.display = 'none';
}

function backToInput()
{
    var imgDiv = document.getElementById(CARD_IMG_DIV);

    while(imgDiv.firstChild)
    {
        imgDiv.removeChild(imgDiv.firstChild);
    }

    document.getElementById("header").style.display = 'block';
    document.getElementById("input").style.display = 'block';
    document.getElementById("img_options").style.display = 'none';    
}

function showInstructions()
{
    if(instructionBool)
    {
        instructionBool = false;
        document.getElementById("instructions").style.display = 'none';
    }
    else
    {
        instructionBool = true;
        document.getElementById("instructions").style.display = 'block';
    }
}

//Hides everything but the proxies and brings up the print page.
function printPage()
{
    hideAllNonImg();

    window.print();
}