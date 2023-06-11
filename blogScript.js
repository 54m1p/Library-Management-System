// to get current logged in user for author name
const currentUser = JSON.parse(localStorage.getItem('currentLoggedIn'));

// var modal = document.getElementById('add-blog-modal');
// var modalTrigger = document.getElementById('add-blog-btn');
// var modalClose = document.getElementById('closeModal');
// modalTrigger.onclick = function(){
// modalClose.onclick = function(){
//     modal.style.display = "none";
//}
// let blogArr = localStorage.getItem('blog-list')!= null ? JSON.parse(localStorage.getItem('blog-list')) : [];
// let blogForm = document.getElementById('blog-fill-form');
// blogForm.addEventListener('submit', function(e){
//     e.preventDefault();
//     let blogTitle = document.getElementById('blog-title').value;
//     let blogContent = document.getElementById('blog-content').value;
//     let blogImg = document.getElementById('blog-img').value;
//     console.log(currentUser.name,'---currentuser')
//     // in dd/mm/yyyy format
//     const formatDate = new Date().toLocaleDateString('en-US',{year:"numeric", month:"short",day:"numeric"});
//     blogArr.push({
//         blogTitle : blogTitle,
//         blogContent : blogContent,
//         blogImg : blogImg,
//         writer : currentUser.name,
//         date : formatDate
//     })
//     localStorage.setItem('blog-list',JSON.stringify(blogArr));
// })
// let appendBlog = document.getElementById('blog-box');
// let blogsOnload = ()=>{
//     siteOnload();
//     blogArr.map(function(blog, index){
//         div =document.createElement('div');
//         div.id= "blog-div-"+index;
//          h2 = document.createElement('h2');
//          h2.id = "blog-title-"+index;        
//         let btitle = document.createTextNode(blog.blogTitle);
//         h2.appendChild(btitle.data);
//         div.appendChild(h2);
//         let datespan = document.createElement('span');
//         let bdate = document.createTextNode(blog.date);
//         datespan.appendChild(bdate.data);
//         let writerspan = document.createElement('span');
//         let bwriter = document.createTextNode(blog.writer);
//         writerspan.appendChild(bwriter.data);
//         div.appendChild(datespan);
//         div.appendChild(writerspan);
//         console.log('btitle---',btitle.data)
//     })
// }

    let skip = 0;
    let limit = 10;
let siteOnload = ()=>{
    if(currentUser.name ==""){
        location.href = "login.html"
    }
    //fetchData(0, 10);
    fetchData(skip, limit);
}
let fetchData=(skip, limit)=>{
fetch('https://dummyjson.com/posts?skip='+skip+'&limit='+limit)
.then(response =>response.json())
.then(data => addToList(data))
}
let list = [];
let pageBtnDiv = document.getElementById('pageBtns');
 let addToList = (data) => {
    pageBtnDiv.innerHTML = "";
    list = [];
     list.push(data);
     showList(list);
    skip = 10 + skip;
     let totalPage = data.total/limit;
     for(let i=0; i<totalPage;i++){
       let btn = document.createElement('input');
        btn.id = "btn-"+i;
        btn.type ='button'
        btn.value = i+1;
         btn.onclick = function(){
            skip = i*limit;
            fetchData(skip,limit);
         }
        pageBtnDiv.appendChild(btn)
     }
}
var blogclickid;
let appendBlog = document.getElementById('blog-box');
let showList=(list) =>{
    appendBlog.innerHTML="";
list[0].posts.forEach((element,index) => {
   div = document.createElement('div');
    div.id= 'blog-div'+index;
    div.className='blog-div';
    divChild = document.createElement('div');
    divChild.className = "img-text-div";
    divChild.onclick = function(){
        //  fetchEachBlog(element.id);
        // blogclickid = element.id;
        let url= "eachblog.html"+"?blog="+element.id;
        location.href = url;
    }
    divChild.id = "blog-"+element.id
    img = document.createElement('img');
        img.src ="https://cdn.pixabay.com/photo/2015/06/01/09/04/blog-793047_1280.jpg";
        img.className="blog-img"
    divChild.append(img);
    h2 = document.createElement('h2');
    divBody = document.createElement('div');
    title = document.createTextNode(element.title);
    h2.append(title);
    blogDate =document.createElement('span');
    date = document.createTextNode(new Date().toLocaleDateString('en-US',{year:"numeric", month:"short",day:"numeric"}));
    blogDate.append(date);
    body = document.createTextNode(element.body);
    content = document.createElement('div');
    content.className = "blog-content";
    divBody.append(body);
    divBody.append(blogDate)
    content.append(h2);
    content.append(divBody)
    divChild.append(blogDate)
    divChild.append(content);
    // div.append(divBody);
    div.append(divChild)
    appendBlog.appendChild(div);
}); 
}

function fetchEachBlog(){
    const searchStr = window.location.search;
    const urlParams = new URLSearchParams(searchStr);
    const id = urlParams.get('blog');
    fetch('https://dummyjson.com/posts/'+id)
    .then(response => response.json())
    .then(blog => openBlog(blog));
}
//blog on click
function openBlog(blog){
    let blogPic = document.getElementById('blog-pic');
    blogPic.src = "https://cdn.pixabay.com/photo/2017/01/18/08/25/social-media-1989152_1280.jpg"
    const eachBlogTitleDiv = document.getElementById('heading-blog');
    let eachBlogTitle = document.createTextNode(blog.title);
    eachBlogTitleDiv.append(eachBlogTitle);

    const eachBlogBodyDiv = document.getElementById('body-blog');
    let eachBlogBody = document.createTextNode(blog.body);
    eachBlogBodyDiv.append(eachBlogBody);

    const blogReactionDiv = document.getElementById('blog-reactions');
    let blogReactionText = document.createTextNode('\u2764\uFE0F'+blog.reactions);
    blogReactionDiv.append(blogReactionText);

     const blogTagsDiv = document.getElementById('blog-tags');
    blog.tags.map((element)=>{
            blogTagsDiv.append(document.createTextNode(" #"+element));

    })

}

function otherBlogsLoad(){
    fetch('https://dummyjson.com/posts'+'?skip='+0+'&limit='+150)
    .then(fetched =>fetched.json())
    .then(other => showOtherBlogs(other))
}
let otherBlogClick;
let otherBlogSection = document.getElementById("other-blogs-div");
function showOtherBlogs(other){
    let otherList =[];
    for(let i=1;i<=5;i++){
        randomId = Math.floor(Math.random() * 150)+1;
         otherList.push(other.posts[randomId]);
    }
    let otherBlogDiv ;
    let otherTitle
    otherList.map((otherItem,index) =>  {
        otherBlogDiv = document.createElement('div');
        otherBlogDiv.className="other-blog-each";
        // otherBlogDiv.id = "other-each-"+otherItem.id;
        console.log(otherItem.id,'--other item id')
        otherBlogDiv.onclick= function(){
            otherBlogClick(otherItem);

        }
        otherTitle = document.createTextNode(otherItem.title);
        let otherImgDiv = document.createElement('div');
        let otherImg = document.createElement('img');
        otherImg.src ="https://cdn.pixabay.com/photo/2016/04/30/13/12/sutterlin-1362879_1280.jpg";
        otherImg.className="other-img"
        otherBlogDiv.append(otherImgDiv);
        otherImgDiv.append(otherImg);
        otherBlogDiv.append(otherTitle);
        otherBlogSection.append(otherBlogDiv);
    })
}

    otherBlogClick=(otherItem)=>{
        window.scrollTo({
            top: 10,
            behavior: "smooth"
        });
        document.getElementById('blog-pic').innerHTML="";
        document.getElementById('heading-blog').innerHTML="";
        document.getElementById('body-blog').innerHTML="";
        document.getElementById('blog-reactions').innerHTML="";
        document.getElementById('heading-blog').innerHTML="";
        document.getElementById('blog-tags').innerHTML="";
        openBlog(otherItem);
        document.getElementById('other-blogs-div').innerHTML="";
        otherBlogsLoad();
}
