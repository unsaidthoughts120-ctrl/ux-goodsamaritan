const grid = document.getElementById("video-grid");

let videos = JSON.parse(localStorage.getItem("videos")) || [];

videos.sort((a,b)=>b.featured - a.featured);

videos.forEach((v,i)=>{

let card = document.createElement("div");

card.className="vcard";

card.innerHTML=`

${v.featured ? '<div class="vfeatured-badge">FEATURED</div>' : ''}

<div class="vcard-body">

<div class="vtitle">${v.title}</div>

<p>${v.desc}</p>

<div class="vmeta">
Views: ${v.views}
</div>

<br>

<button class="btn btn-p" onclick="watchVideo(${i})">
Watch
</button>

</div>

`;

grid.appendChild(card);

});

function watchVideo(i){

let videos = JSON.parse(localStorage.getItem("videos")) || [];

videos[i].views++;

localStorage.setItem("videos", JSON.stringify(videos));

window.open(videos[i].link);

}
