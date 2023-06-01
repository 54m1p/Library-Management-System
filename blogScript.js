var modal = document.getElementById('add-blog-modal');
var modalTrigger = document.getElementById('add-blog-btn');
var modalClose = document.getElementById('closeModal');

modalTrigger.onclick = function(){
    modal.style.display = "block";
}

modalClose.onclick = function(){
    modal.style.display = "none";
}

let blogForm = document.getElementById('blog-fill-form');
blogForm.addEventListener('submit', function(e){
    e.preventDefault();
    let blogTitle = document.getElementById('blog-title').value;
    let blogContent = document.getElementById('blog-content')
})