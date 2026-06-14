let user="";
let data = JSON.parse(localStorage.getItem("data")) || [];
let ach = JSON.parse(localStorage.getItem("ach")) || [];

function login(){
  user=document.getElementById("user").value;
  if(!user)return;

  localStorage.setItem("user",user);

  document.getElementById("login").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  load();
}

function logout(){
  localStorage.clear();
  location.reload();
}

function donate(){
  let m=document.getElementById("money").value;
  if(!m)return;

  data.push({user,m,type:"donate"});
  localStorage.setItem("data",JSON.stringify(data));

  ai("Donasi diterima (tidak nyata)");

  if(m>50000) unlock("Sultan Kentang");

  load();
}

function postMsg(){
  let p=document.getElementById("post").value;
  if(!p)return;

  data.push({user,text:p,type:"post"});
  localStorage.setItem("data",JSON.stringify(data));

  load();
}

function load(){
  let feed=document.getElementById("feed");
  feed.innerHTML="";

  data.slice(-5).forEach(d=>{
    let div=document.createElement("div");

    if(d.type==="post") div.innerText=d.user+": "+d.text;
    if(d.type==="donate") div.innerText=d.user+" donate Rp"+d.m;

    feed.appendChild(div);
  });

  document.getElementById("stats").innerText =
    "Total aktivitas: " + data.length;

  document.getElementById("ach").innerText =
    ach.join(", ");
}

function ai(t){
  document.getElementById("ai").innerText="AI: "+t;
}

function unlock(n){
  if(ach.includes(n))return;
  ach.push(n);
  localStorage.setItem("ach",JSON.stringify(ach));
}
