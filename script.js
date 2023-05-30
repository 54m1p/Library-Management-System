let bookArr = localStorage.getItem('book-list')!= null ? JSON.parse(localStorage.getItem('book-list')) : [];
let bookTable =  document.querySelector("#booklist");
   let tr = document.createElement('tr');
   let td = document.createElement('td');
   let auth, bname, bcat;
const booksearch = document.querySelector(".search-book");
booksearch && booksearch.addEventListener('click', function(){
    userSearch = document.getElementById('search-book');
    let searchInput = document.querySelector(".input-search").value;
    let searchArr=[] ;
     bookArr.map((element)=> {
        if(element.bookname.toUpperCase().includes(searchInput.toUpperCase())){
            searchArr.push({
                bookname : element.bookname,
                bcat : element.category,
                author: element.author
            })


            console.log(element.bookname,'------found');
            return;
        }  
    });
    console.log(searchArr,'searcharr');
})
   
var booksOnLoad = () =>{
   let bookTable =  document.querySelector("#booklist");
   let tr = document.createElement('tr');
   let td = document.createElement('td');
   let auth, bname, bcat;
   // if key ayo vane searchArray = mathi ko filter gareko code
//    else searchArray = bookArr;
   
   searchArray.map((item,index)=>{
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    bname = document.createTextNode(item.bookname);
    auth = document.createTextNode(item.author);
    bcat = document.createTextNode(item.category);
    td.appendChild(bname);
    td1.appendChild(bcat);
    td2.appendChild(auth);
    tr.appendChild(td);
    tr.appendChild(td1);
    tr.appendChild(td2);
    bookTable.appendChild(tr);
   })
   siteOnload();
}



let addBook = document.querySelector("#add-book");
addBook && addBook.addEventListener('click', function(){
    location.href = "addbooks.html";
    return;
})

const submitBook = document.getElementById("book-submit")
submitBook && submitBook.addEventListener('click', function(){
    let bookArr = localStorage.getItem('book-list')!= null ? JSON.parse(localStorage.getItem('book-list')) : [];
    const bookname = document.getElementById('book-name').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('yyyy').value;
    const edition  = document.getElementById('edition').value;
    const category = document.getElementById('category').value;
    const bookid = document.getElementById('book-id').value;
    bookArr.push({
        bookname : bookname,
        author : author,
        year : year,
        edition : edition,
        category : category,
        bookid : bookid
    })
    localStorage.setItem('book-list', JSON.stringify(bookArr));
})
let currentLoggedIn;
let logout = document.getElementById("logout");
logout && logout.addEventListener('click', function(){
    currentLoggedIn = {
        name: "",
        email: "",
        password: ""
}
    console.log('currentloggedin------', currentLoggedIn)
    localStorage.setItem('currentLoggedIn',JSON.stringify(currentLoggedIn));
    location.href = "login.html";
    return;
})

let currentUser = JSON.parse(localStorage.getItem('currentLoggedIn'));

let indexOnLoad = ()=>{
    document.getElementById("wlcUser").innerHTML = currentUser.name;
    siteOnload();
}
let siteOnload = ()=>{
    console.log('site on load triggered');
    if(currentUser.name ==""){
        location.href = "login.html"
    }

}


