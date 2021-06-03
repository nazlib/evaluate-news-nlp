function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    console.log(formText);
    if (Client.checkForUrl(formText)) {
        postData('http://localhost:8081/api', { url: formText })
            .then(function (res) {
                document.getElementById('polarity').innerHTML = `Polarity: ${res.score_tag}`;
                document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
                document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
                document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
                document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
            })
    } else {
        alert('Invalid URL :(');
    }
}
// Async POST
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        console.log("I am here");
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
};

export { handleSubmit }
