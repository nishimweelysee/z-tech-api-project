let books = []
let filteredData = [];
// This onlod will call the server url to get all books
window.onload =async () => {
    const request = await fetch('https://the-dune-api.herokuapp.com/books/30');
    const data = await request.json();
    data.map((d,i )=> {
        let { id, title, author, wiki_url, year, image =`https://source.unsplash.com/700x900/?book&sig=${i}`, price = `${(Math.floor(Math.random() * (100 - 10 + 1)) + 10) }`}= d;
        books.push({ id, title, author, wiki_url, year, image, price })
    })
    filteredData = books;
    paginator();
}


//this is function for rendering a book components
const renderBooks = () => {
    let countries = document.getElementById('books');
    countries.innerHTML = ''
    filteredData.map((val, i) => {
        let div = document.createElement('div');
        let innerHTML = `<div class='card-zoom'>
                    <img class='card-zoom-image' src='${val.image}'/>
                    <div class='card-zoom-text'>
                        <h2>${val.title}</h2>
                        <p class='opacity-50'>${val.author} <span class='mx-2'>${val.year}</span></p>
                        <a class="fa fa-external-link hover:text-blue-700" href='${val.wiki_url}'>Wikipedia Url</a>
                        <span class='font-bold'>Starts At $ ${val.price}</span>
                    </div>
                    <button class='px-2 w-full py-1 bg-green-600 text-white hover:bg-green-400' onclick='buyBook("${val.id}")'>Buy Now</button>
                </div>`;
        div.innerHTML = innerHTML;
        countries.appendChild(div);

    })
}

//This paginator is used for pagination where I used a framework script called paginations 
const paginator = () => {
    $('#pagination').pagination({
        dataSource: filteredData,
        pageSize: 8,
        autoHidePrevious: true,
        autoHideNext: true,
        callback: function (d, pagination) {
            filteredData = d;
            renderBooks();
        }
    })
}

//This is a function for filterring the author of the books
const filterAuthor = (e) => {
    let value = e.value.toLowerCase();
    let filteredBook = books.filter(b => {
        let isexist = typeof b.author === 'string' ? b.author.toLowerCase().includes(value) : b.author.some(a => a.toLowerCase().includes(value));
        return isexist;
    });
    filteredData = filteredBook;
    paginator();
}


//This is the function for filtering Date you can select the Date you want
const filterByDates = (e) => {
    let startDate = new Date(document.getElementById('startDate').value);
    let endDate = new Date(e.value);
    let filteredBook = books.filter(b => {
        return startDate.getFullYear() <= b.year && endDate.getFullYear() >= b.year;
    });
    filteredData = filteredBook;
    paginator();
}


//This is a function for sorting the Books
const sort = (e) => {
    let value = e.value.toLowerCase();
    console.log(value)
    let filteredBook = filteredData.sort((a, b) => a[value].toLowerCase() > b[value].toLowerCase() ? 1 : -1);
    filteredData = filteredBook;
    renderBooks();
}

//THIS function print messege when book bought
const buyBook = (bookId) => {
    alert(`Book with ID ${bookId} bought`)
}