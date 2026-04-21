const c=document.getElementById("particles"),x=c.getContext("2d");
function r(){c.width=window.innerWidth;c.height=window.innerHeight}r();
window.addEventListener("resize",r);
const d=Array.from({length:80},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+1}));
function draw(){
x.clearRect(0,0,c.width,c.height);
d.forEach(a=>{a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>c.width)a.vx*=-1;if(a.y<0||a.y>c.height)a.vy*=-1;x.beginPath();x.arc(a.x,a.y,a.r,0,Math.PI*2);x.fillStyle="rgba(0,210,180,0.7)";x.fill()});
d.forEach((a,i)=>d.slice(i+1).forEach(b=>{const dist=Math.hypot(a.x-b.x,a.y-b.y);if(dist<120){x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.strokeStyle="rgba(0,210,180,"+(1-dist/120)+")";x.lineWidth=0.4;x.stroke()}}));
requestAnimationFrame(draw)}draw();
const c=document.getElementById("particles"),x=c.getContext("2d");
function r(){c.width=window.innerWidth;c.height=window.innerHeight}r();
window.addEventListener("resize",r);
const d=Array.from({length:80},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+1}));
function draw(){
x.clearRect(0,0,c.width,c.height);
d.forEach(a=>{a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>c.width)a.vx*=-1;if(a.y<0||a.y>c.height)a.vy*=-1;x.beginPath();x.arc(a.x,a.y,a.r,0,Math.PI*2);x.fillStyle="rgba(0,210,180,0.7)";x.fill()});
d.forEach((a,i)=>d.slice(i+1).forEach(b=>{const dist=Math.hypot(a.x-b.x,a.y-b.y);if(dist<120){x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.strokeStyle="rgba(0,210,180,"+(1-dist/120)+")";x.lineWidth=0.4;x.stroke()}}));
requestAnimationFrame(draw)}draw();
const c=document.getElementById("particles"),x=c.getContext("2d");
function r(){c.width=window.innerWidth;c.height=window.innerHeight}r();
window.addEventListener("resize",r);
const d=Array.from({length:80},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+1}));
function draw(){
x.clearRect(0,0,c.width,c.height);
d.forEach(a=>{a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>c.width)a.vx*=-1;if(a.y<0||a.y>c.height)a.vy*=-1;x.beginPath();x.arc(a.x,a.y,a.r,0,Math.PI*2);x.fillStyle="rgba(0,210,180,0.7)";x.fill()});
d.forEach((a,i)=>d.slice(i+1).forEach(b=>{const dist=Math.hypot(a.x-b.x,a.y-b.y);if(dist<120){x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.strokeStyle="rgba(0,210,180,"+(1-dist/120)+")";x.lineWidth=0.4;x.stroke()}}));
requestAnimationFrame(draw)}draw();
