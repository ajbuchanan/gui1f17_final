/*
Example Query: https://api.scryfall.com/cards/named?exact=lightning+bolt
*/

var cardData = new Map();

var query = "https://api.scryfall.com/cards/named?exact=";
function generateCardData(){
    var inputData = document.getElementById("card_input").value;

    var cardNames = inputData.split("\n");

    for(var i = 0; i < cardNames.length; i++)
    {
        var cardSplit = cardNames[i].split(' ');
        var thisQuery = query;

        for(var j = 0; j < cardSplit.length; j++)
        {
            if(j != cardSplit.length - 1)
            {
                thisQuery += cardSplit[j] + "+";
            }
            else
            {
                thisQuery += cardSplit[j];
            }
        }

        httpGetAsync(thisQuery, parseCardData);
    }
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function parseCardData(responseData)
{
    
}