//console.log("Welcome to spotify");


let songIndex=0;
let currentSongIndex=0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songsItems = Array.from(document.getElementsByClassName('songItem'));
let songsItemsPlays = Array.from(document.getElementsByClassName('songItemPlay'));
let masterSongName = document.getElementById('masterSongName');
let songs = [
    {songName: "Kabira", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Tujh Mein Rab Dikhta Hai", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Ae Dil Hai Mushkil", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Chaiyya Chaiyya", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Kajra Re", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Tum Hi Ho", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Kal Ho Naa Ho", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Ghoomar", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Badtameez Dil", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]


const next = ()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    makeAllPlays();
    
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    currentSongIndex = songIndex;
    songsItemsPlays[currentSongIndex].classList.remove('fa-play');
    songsItemsPlays[currentSongIndex].classList.add('fa-pause');
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
}




songsItems.forEach((element,i)=>{
    //console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    
})


//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        songsItemsPlays[currentSongIndex].classList.remove('fa-play');
        songsItemsPlays[currentSongIndex].classList.add('fa-pause');
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        songsItemsPlays[currentSongIndex].classList.remove('fa-pause');
        songsItemsPlays[currentSongIndex].classList.add('fa-play');
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events 
audioElement.addEventListener('timeupdate', ()=>{
    //console.log("timeupdate");
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value = progress;
    if(progress == 100){
        next();
    }
}
)

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value)*audioElement.duration/100;
})

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');    
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        //console.log(e.target);
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        if(audioElement.paused || audioElement.currentTime<=0){
            if(songIndex != currentSongIndex){
                makeAllPlays();
                audioElement.src = `songs/${songIndex+1}.mp3`;
                audioElement.currentTime = 0;
            }
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            currentSongIndex = songIndex;
            gif.style.opacity = 1;
        }
        else{
            if(songIndex != currentSongIndex){
                makeAllPlays();
                audioElement.src = `songs/${songIndex+1}.mp3`;
                audioElement.currentTime = 0;
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.play();
                masterPlay.classList.remove('fa-play');
                masterPlay.classList.add('fa-pause');
                currentSongIndex = songIndex;
                gif.style.opacity = 1;
            }
            else{
                audioElement.pause();
                masterPlay.classList.remove('fa-pause');
                masterPlay.classList.add('fa-play');
                masterPlay.classList.remove('fa-pause');
                masterPlay.classList.add('fa-play');
                gif.style.opacity = 0;
            }
            
        }
       
    })
})






document.getElementById('next').addEventListener('click', next);
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    currentSongIndex = songIndex;
    songsItemsPlays[currentSongIndex].classList.remove('fa-play');
    songsItemsPlays[currentSongIndex].classList.add('fa-pause');
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
})