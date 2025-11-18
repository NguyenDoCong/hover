document.addEventListener('mouseover', async function (event) {
    var hoveredEl = event.target;
    if (hoveredEl.tagName !== 'A') return;

    const url = hoveredEl.href;
    console.log("Sending:", url);

    event.target.style.color = "orange";

    currentHoveredElement = event.target;
    console.log("Mouse is hovering over:", currentHoveredElement);

    // const response = await fetch("http://127.0.0.1:8000/hover", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ href: url })
    // })
    //     .catch(err => console.error("Error:", err));

    var text = "Added text";
    // text = await response.text();

    // const newDiv = document.createElement("div");

    // // and give it some content
    // const newContent = document.createTextNode("Hi there and greetings!");

    // // add the text node to the newly created div
    // newDiv.appendChild(newContent);

    const p = document.createElement('div');
    p.textContent = text;

    var oImg = document.createElement("img");
    oImg.setAttribute('src', 'C:/Users/docon/Downloads/ai.png');

    // p.style.padding = "10px";
    // p.style.margin = "10px 0";
    // p.style.backgroundColor = "#f0f0f0";
    // p.style.borderRadius = "4px";

    // add the newly created element and its content into the DOM
    currentHoveredElement.parentNode.insertBefore(oImg, currentHoveredElement);

    // const response = await fetch("http://127.0.0.1:8000/hover", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ href: url })
    // })
    //     .catch(err => console.error("Error:", err));
});
