const tooltip = document.getElementById("hover-tooltip");

document.addEventListener('mouseover', async function (event) {
    const link = event.target.closest('a');
    if (!link) {
        tooltip.style.display = "none";
        return;
    }

    const url = link.href;

    console.log("Sending:", url);

    const response = await fetch("http://127.0.0.1:8000/hover", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ href: url })
    })
        .catch(err => console.error("Error:", err));

    const text = await response.text();

    tooltip.textContent = text;
    tooltip.style.display = "block";
});

document.addEventListener('mousemove', function (event) {
    tooltip.style.left = (event.pageX + 12) + "px";
    tooltip.style.top = (event.pageY + 12) + "px";
});

document.addEventListener('mouseout', function (event) {
    // Ẩn tooltip nếu rời khỏi toàn bộ <a>
    if (!event.relatedTarget || !event.relatedTarget.closest('a')) {
        tooltip.style.display = "none";
    }
});
