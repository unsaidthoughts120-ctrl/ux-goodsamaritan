const ADMIN_USER = "admin";
const ADMIN_PASS = "123456";

let editIndex = null;

function loginAdmin(){

let u = document.getElementById("loginUser").value;
let p = document.getElementById("loginPass").value;

if(u === ADMIN_USER && p === ADMIN_PASS){

document.getElementById("loginPage").style.display = "none";
document.getElementById("adminPanel").style.display = "flex";

loadVideos();

}else{

alert("Invalid Login");

}

}

function logout(){

location.reload();

}

function getVideos(){

return JSON.parse(localStorage.getItem("videos")) || [];

}

function saveVideos(v){

localStorage.setItem("videos", JSON.stringify(v));

}

function saveVideo(){

let title = videoTitle.value;
let link = videoLink.value;
let desc = videoDesc.value;

let videos = getVideos();

if(editIndex === null){

videos.push({
title,
link,
desc,
views:0,
featured:false
});

}else{

videos[editIndex].title = title;
videos[editIndex].link = link;
videos[editIndex].desc = desc;

editIndex = null;

}

saveVideos(videos);

clearForm();

loadVideos();

}

function clearForm(){

videoTitle.value="";
videoLink.value="";
videoDesc.value="";

}

function loadVideos(){

let videos = getVideos();

let table = document.getElementById("videoTable");

table.innerHTML="";

videos.forEach((v,i)=>{

let row = document.createElement("tr");

row.innerHTML = `

<td class="tcell-title">${v.title}</td>

<td>${v.views}</td>

<td>${v.featured ? "YES" : "NO"}</td>

<td>

<div class="tactions">

<button class="btn btn-s btn-sm" onclick="editVideo(${i})">Edit</button>

<button class="btn btn-d btn-sm" onclick="deleteVideo(${i})">Delete</button>

<button class="btn btn-p btn-sm" onclick="toggleFeature(${i})">Feature</button>

</div>

</td>

`;

table.appendChild(row);

});

}

function editVideo(i){

let v = getVideos()[i];

videoTitle.value = v.title;
videoLink.value = v.link;
videoDesc.value = v.desc;

editIndex = i;

}

function deleteVideo(i){

let videos = getVideos();

videos.splice(i,1);

saveVideos(videos);

loadVideos();

}

function toggleFeature(i){

let videos = getVideos();

videos[i].featured = !videos[i].featured;

saveVideos(videos);

loadVideos();

}
