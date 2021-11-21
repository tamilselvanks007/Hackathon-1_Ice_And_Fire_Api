// creatind h1 tag
textheading = document.createElement("h1");
textheading.className = "text-center";
textheading.textContent = "ICE AND FIRE API";

// creating div tag
container = document.createElement("div");
container.className = "container";

// creating row
row = document.createElement("div");
row.className = "row";

// appending a row on container
container.append(row);
document.body.append(textheading, container);

// creating a function
function passData(book, d) {
  if (book) {
    rowdiv = document.querySelector(".row");

    coldiv = document.createElement("div");
    coldiv.className = "col";

    // creating a card
    carddiv = document.createElement("div");
    carddiv.className = "card";
    carddiv.setAttribute("style", "width: 18rem;");

    // creating card body
    cardbody = document.createElement("div");
    cardbody.className = "card-body";

    // creating card title
    cardtitle = document.createElement("h5");
    cardtitle.className = "card-title";
    cardtitle.textContent = `📕Book Name: ${book.name}`;

    let text = ``;
    for (let i = 0; i < 5; i++) {
      text += `<li> ${d[i]} </li>`;
    }
    // creating the card text
    cardtext = document.createElement("div");
    cardtext.className = "card-text";
    cardtext.innerHTML = `
                                    <p>🔢ISBN: ${book.isbn}</p>
                                    <p>📃Pages: ${book.numberOfPages}</p>
                                    <p>📝Authors: ${book.authors[0]}</p>
                                    <p>🤵Publisher: ${book.publisher}</p>
                                    <p>⏰Released Date: ${book.released}</p>
                                    <p>Character Name:</p>
                                    <div class="names"  <ul>${text}</ul></div>
                                    `;

    // appending cardtitle and cardtext
    cardbody.append(cardtitle, cardtext);
    carddiv.append(cardbody);
    coldiv.append(carddiv);

    rowdiv.append(coldiv);
  }
}

// creating async and await
const iceFireAPI = async () => {
  try {
    // using fetch
    let getResponse = await fetch(
      "https://www.anapioficeandfire.com/api/books"
    );
    let getData = await getResponse.json();
    getData.forEach(async (data) => {
      let index = 0;
      let d = [];
      while (d.length <= 5) {
        // getting characters name
        let charName = await fetch(data.characters[index]);
        let getName = await charName.json();
        if (getName.name !== "") {
          d.push(getName.name);
        }
        index++;
      }
      passData(data, d);
    });
  } catch (err) {
    console.log("Sorry Error ", err);
  }
};

iceFireAPI();

console.log("There are total 10 Books");
