let video = document.querySelector('video');
let canvas = document.querySelector('canvas'); 
let context = canvas.getContext('2d');  
let photobttn = document.querySelector('#photobttn')
let result = document.querySelector('.result')
photobttn.addEventListener('click',takePhoto)
//my pain and suffering 

function setupCamera(){
    navigator.mediaDevices.getUserMedia({ 
        video: {facingMode: 'user' }, audio: false })
    .then(stream => { video.srcObject = stream; video.play(); 
      video.addEventListener('loadedmetadata',putOnCanvas);
 }).catch(err => {
    console.log("oops")
 })
} 
function putOnCanvas(){
let width = video.clientWidth
let height = video.clientHeight
canvas.width = width
canvas.height = height
  return setInterval(() => {
    context.drawImage(video, 0, 0, width, height)
  }, 16) 
} 
function initCamera(){
  setupCamera();
}
initCamera();
function takePhoto(){

  if(video.paused == true){
    video.style.display = "block";
    video.play();
    let img = video.previousSibling;
    img.remove();
     photobttn.innerHTML = "Take Photo!";
     photobttn.alt = "Take Photo!"
     photobttn.style.backgroundColor = "#a3ad71;";

  } else{
   let data = canvas.toDataURL('image/jpeg')
    console.log('taking the photo')
    video.pause();
    video.style.display = "none";
    let img = document.createElement('img');
    img.src = data;
    img.style.width = canvas.width + "px";
    console.log(img.style.width)
    img.style.height = canvas.height + "px";
    img.className = "tester";
     video.parentNode.insertBefore(img, video);
     photobttn.innerHTML = "Retake Photo!";
     photobttn.style.backgroundColor = "#7796a6;";
     photobttn.alt = "Retake Photo!"
  }
   
}
