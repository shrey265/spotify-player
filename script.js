console.log("Welcome to spotify");


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
    {songName: "celtic-irish-scottish-tin-whistle-background-music-10455", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "drill-it-is-127505", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "english-waltz-slow-waltz-orchestra-and-concert-grand-piano-8284", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "i-canx27t-fall-in-love-106865", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "intro-music-black-box-roughly-made-bass-house-13217", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "miyagisama-drill-time-story-production-drill-music-action-10497", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "remembering-you-130492", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "scarborough-fair-piano-and-pad-english-folk-song-17th-century-3065", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "the-adventures-of-mr-hardy-129228", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "we-wish-you-a-merry-christmas-english-carol-sheppard-flute-8848", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]



function getDuration(src, element) {
    var audio = new Audio(src);
    audio.addEventListener("loadeddata", () => {
        let duration = Math.floor(audio.duration);
        console.log( element.innerText);
        var seconds = duration%60;
        if(seconds<10){
            element.innerText = `0${Math.floor(duration/60)}`+`:0${seconds}` ;
        }
        else{
            element.innerText = `0${Math.floor(duration/60)}`+`:${seconds}` ;
        }
        
      });
}

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
    getDuration(songs[i].filePath,element.getElementsByClassName("duration")[0]);
    
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