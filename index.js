const input = document.getElementById('input');
const childDiv = document.getElementById('display_content');
var contentcontainer = document.getElementById('contentcontainer');

async function DispContent() {
    const inp = input.value;
    console.log(inp);

    const res = await fetch(`https://app.zenserp.com/api/v2/search?apikey=ab7733d0-cde6-11ef-a366-396474980c49&q=${inp}`);
    
    console.log(res);

    if (!res.ok) {
        alert("Failed to fetch Title. Please try again later.");
        return;
    }

    const data = await res.json();

    childDiv.innerHTML = "";
    const array1 = data.knowledge_graph;
    const array2 = data.organic;

    if (inp === "") {
        alert("Please search USA city to get display data!");
        childDiv.innerHTML = "Try searching 'A cute Dog'!!!";
        childDiv.style.fontSize = '25px';
        childDiv.style.color = 'white';
        childDiv.style.textAlign = 'center';
    } else if (array1,array2) {
        array1.forEach((item) => {
            const innerdiv = document.createElement("div");
            innerdiv.innerHTML = `
            <h2>Place: ${inp}</h2>
            <p>Description: ${item.description}</p><br>
            <p>Area Code: ${item.area_code}</p>
            <p>Zip Code: ${item.zip_code}</p>
            <p>Name For:${item.name_for}</p>
            `;
            childDiv.appendChild(innerdiv);
        });
        array2.forEach((item) => {
            const innerdiv = document.createElement("div");
            innerdiv.innerHTML = `
            <h2>Index Position: ${item.position}</h2>
            <p>Title: ${item.title}</p><br>
            <p>URL: ${item.url}</p>
            <p>Description: ${item.description}</p>
            `;
            childDiv.appendChild(innerdiv);
        });
    } else {
        alert("No Title found for your search.");
    }
}

