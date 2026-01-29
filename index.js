// ==========================================================================================================
// -- Boilerplate --
// ==========================================================================================================

const partField = document.getElementById("part");
const partOutput = document.getElementById("output");
const searchbtn = document.getElementById("searchButton");

// ==========================================================================================================
// -- Operational Functions --
// ==========================================================================================================

async function getPart(part) {
    console.log(`${new Date().toISOString()} - getPart Started`);
    const partRes = await fetch(`http://localhost:3000/api/part/${encodeURIComponent(part)}`);

    if (partRes.ok) {
        const partData = await partRes.json();
        partOutput.textContent = partData.descr ?? "No description found";
        console.log(`${new Date().toISOString()} - Description Retrieved: ${partData.descr}`);
    } else {
        partOutput.textContent = "Error retrieving part";
        console.log(`${new Date().toISOString()} - Error retrieving part`);
    }
}

// ==========================================================================================================
// -- Event Listeners --
// ==========================================================================================================

searchbtn.addEventListener('click', async (e) => {
    console.log(`${new Date().toISOString()} - Search Button Pressed`);
    e.preventDefault();

    const partValue = partField.value.trim();
    if (partValue !== "") {
        await getPart(partValue);
    } else {
        partOutput.textContent = "Please enter a part to search for!";
    }
});
