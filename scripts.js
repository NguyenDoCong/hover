document.addEventListener('mouseover', async function (event) {
    var hoveredEl = event.target;
    if (hoveredEl.tagName !== 'A') return;

    const url = hoveredEl.href;
    console.log("Sending:", url);

    const response = await fetch("http://127.0.0.1:8000/hover", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ href: url })
    })
    .catch(err => console.error("Error:", err));
});
