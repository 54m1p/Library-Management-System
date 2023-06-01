let bookArr = localStorage.getItem('book-list')!= null ? JSON.parse(localStorage.getItem('book-list')) : [];
const searchStr = window.location.search;
const urlParams = new URLSearchParams(searchStr);
const id = urlParams.get('id');
const bookname = urlParams.get('bookname');
const author = urlParams.get('author');
const category = urlParams.get('category');
const year = urlParams.get('year');
const edition = urlParams.get('edition');   
    let onEditLoad=()=>{
    document.querySelector("#edit-book-id").value = id;
    document.querySelector("#edit-book-id").disabled = true;
    document.querySelector("#edit-book-name").value = bookname;
    document.querySelector("#edit-author").value = author;
    document.querySelector("#edit-category").value = category;
    document.querySelector("#edit-yyyy").value = year;
    document.querySelector("#edit-edition").value = edition;
}

let updateForm = document.getElementById('edit-register-form');
updateForm.addEventListener('submit', function(e){
    e.preventDefault();
    for(let i=0; i< bookArr.length; i++){
        console.log(bookArr[i]['bookid'],'bookArr id');
        if(bookArr[i].bookid === id){
            bookArr[i].bookname = document.querySelector("#edit-book-name").value;
            bookArr[i].author = document.querySelector("#edit-author").value;
            bookArr[i].category = document.querySelector("#edit-category").value;
            bookArr[i].year = document.querySelector("#edit-yyyy").value;
            bookArr[i].edition = document.querySelector("#edit-edition").value;
        } 
    }
    localStorage.setItem('book-list', JSON.stringify(bookArr));
    alert("book is updated");
   location.href = "books.html";
})