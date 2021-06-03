function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
}

export { checkForName }


function checkForUrl(inputText) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    console.log(regexp.test(inputText))
    return regexp.test(inputText);
}

export { checkForUrl }
