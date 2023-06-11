let bookArr = localStorage.getItem('book-list')!= null ? JSON.parse(localStorage.getItem('book-list')) : [];
let bookTable =  document.querySelector("#booklist");
   let tr = document.createElement('tr');
   let td = document.createElement('td');
   let auth, bname, bcat;
   let searchArr = [];    
var booksOnLoad = () =>{
    siteOnload();
    const searchStr = window.location.search;
    const urlParams = new URLSearchParams(searchStr);
    const key = urlParams.get('key');
    console.log(key+"------------")
    if(key != "" && key != null){
        bookArr.map((element)=>{
            if(element.bookname.toUpperCase().includes(key.toUpperCase())){
                searchArr.push({
                    bookid:element.bookid,
                    bookname: element.bookname,
                    category: element.category,
                    author: element.author,
                    edition: element.edition,
                    year : element.year
                })
            }
        })
          
    }else{
        searchArr = bookArr;
    }

    showBoook();
}
 let showBoook=()=>{
   let tr = document.createElement('tr');
   let td = document.createElement('td');
   let auth, bname, bcat;
    searchArr.map((item,index)=>{
        let bookTable =  document.querySelector("#booklist");
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let edit = document.createElement('a');
            edit.textContent="\u270E \t"
            edit.id ="edit-id"
        bname = document.createTextNode(item.bookname);
        auth = document.createTextNode(item.author);
        bcat = document.createTextNode(item.category);
    
        let del = document.createElement('a');
            del.textContent = "\u274C";
            del.id ="del-id-"+item.bookid;
         
        td.appendChild(bname);
        td1.appendChild(bcat);
        td2.appendChild(auth);
        td3.appendChild(edit);
        edit.onclick = function(){
            let url = "editbook.html" + '?id='+item.bookid+'&bookname='+item.bookname+'&author='+item.author+'&year='+item.year+'&category='+item.category+'&edition='+item.edition;
            location.href = url;
        }
        del.onclick = function(){
            deleteBook(item.bookid, index);
        }
        tr.id = "tr"+index;
        td3.appendChild(del);
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3)
        bookTable.appendChild(tr);
        
    })
 }
 function deleteBook (item, index){
   let removeTr = document.getElementById("tr"+index);
    removeTr.remove();
    searchArr = [];
    bookArr = localStorage.getItem('book-list')!= null ? JSON.parse(localStorage.getItem('book-list')) : [];

    for(let i=0; i<bookArr.length;i++){
        if(bookArr[i].bookid !== item){
            searchArr.push({
                bookid:bookArr[i].bookid,
                bookname: bookArr[i].bookname,
                category: bookArr[i].category,
                author: bookArr[i].author,
                edition: bookArr[i].edition,
                year : bookArr[i].year
            }) 
        }
    }
    console.log(searchArr,'----searchArr');
    localStorage.setItem('book-list',JSON.stringify(searchArr))
    // console.log('deleteArr',deleteArr);
    // searchArr = deleteArr;
    // showBoook();

 }

let addBook = document.querySelector("#add-book");
addBook && addBook.addEventListener('click', function(){
    location.href = "addbooks.html";
    return;
})
//book add garne kam
let idFlag =true;
const submitBookForm = document.getElementById("book-register-form")
submitBookForm && submitBookForm.addEventListener('submit', function(e){
    e.preventDefault();
    let bookArr = localStorage.getItem('book-list')!= null ? JSON.parse(localStorage.getItem('book-list')) : [];
    const bookname = document.getElementById('book-name').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('yyyy').value;
    const edition  = document.getElementById('edition').value;
    const category = document.getElementById('category').value;
    const bookidFromInput = document.getElementById('book-id').value;
    searchArr = [];
    exists = checkIfAlreadyExists(bookidFromInput);
    if(exists){
        alert("book with id "+ bookidFromInput + " already exists");
        return;
    }
    
    newEntry = {
        bookid : bookidFromInput,
        bookname : bookname,
        author : author,
        year : year,
        edition : edition,
        category : category
    }

    searchArr.push(newEntry);
    bookArr.map(function(element){
            searchArr.push({
                bookid : element.bookid,
                bookname : element.bookname,
                author :element.author,
                year : element.year,
                edition : element.edition,
                category : element.category,
            })
          
        })
    localStorage.setItem('book-list', JSON.stringify(searchArr));
    location.href = "books.html"
    
    })

    function checkIfAlreadyExists(bookidFromInput){
        flag = false;
        bookArr = localStorage.getItem('book-list')!= null ? JSON.parse(localStorage.getItem('book-list')) : [];

        for (const [key, book] of Object.entries(bookArr)) {
            if(book.bookid == bookidFromInput){
                flag = true;
                break;
            }
          }
          return flag;
    }
   

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
    if(currentUser.name ==""){
        location.href = "login.html"
    }

}

let searchForm = document.getElementById('searchForm');
searchForm && searchForm.addEventListener('submit', function(e){
e.preventDefault();
let searchText = document.getElementById('book-search').value;
if(searchText == "") return;
searchForm.submit();
})
