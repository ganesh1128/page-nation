async function getUsers() {
    const data = await fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",{
        method: "GET"
    });
    const userLists = await data.json();

    displayList(userLists, list, totalUsers, currentPage);
    paginationSetup(userLists, pagination,totalUsers);
}
getUsers();

const list = document.getElementById('lists');
const pagination = document.getElementById('pagination');

let currentPage = 1;
let totalUsers = 9;

function displayList(users, wrapper, perPage, page) {
    wrapper.innerHTML = "";
    page--;

    let start = perPage * page;
    let end = start + perPage;
    let paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach((user) => {
        const userContainer = document.createElement("div");
        userContainer.className = "user";

        userContainer.innerHTML = 
        `<div class = "user1">Id</div>
        <div>${user.id}</div>
        <div class = "user1">Name</div>
        <div>${user.name}</div>
        <div class = "user1">Email ID</div>
        <div>${user.email}</div>`;

        wrapper.append(userContainer);
    });
}



function paginationSetup(users, wrapper, perPage) {

    wrapper.innerHTML = "";
    let pageCount = Math.ceil(users.length / perPage);

    for(let i = 1; i < pageCount + 1; i++) {
        let btn = paginationButton(i, users);
        wrapper.append(btn);
    }

    function paginationButton(page, users) {
        let button = document.createElement('button');
        button.innerText = page;
    
        if(currentPage == page) {
            button.classList.add('active');
        }

        button.addEventListener('click', function () {
            currentPage = page;
            displayList(users, list, totalUsers, currentPage);
    
            let currentButton = document.querySelector('.pageNo button.active');
            currentButton.classList.remove('active');
    
            button.classList.add('active');
        });
        return button;    
    }
}