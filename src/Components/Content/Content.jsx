import React from 'react'
import './content.css'
const Content = ({clickedElement,audioRef,isPlaying,togglePlayPause,setClickedElement,songInfo,setSongInfo,songs,setSongs,nextSongPlay}) => {
  
  // Functions
async function skipHandler(direction){
    let currentIndex = songs.findIndex((song) => song.id === clickedElement.id);
   
		if (direction === "skipForward") {
			await setClickedElement(songs[(currentIndex + 1) % songs.length]);
      updateActiveSong(songs[(currentIndex + 1) % songs.length])
		} else if (direction === "skipBack") {
			if ((currentIndex - 1) % songs.length === -1) {
				await setClickedElement(songs[songs.length - 1]);
        updateActiveSong(songs[songs.length - 1])
			} else {
				await setClickedElement(songs[(currentIndex - 1) % songs.length]);
        updateActiveSong(songs[(currentIndex - 1) % songs.length])
			}
		}
		if (isPlaying) {
			audioRef.current.play();
		}
}

function dragHandler(e){
  audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
}
function updateHandler(e){
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({ ...songInfo, currentTime, duration });
}
function getTime (time) {
  let minute = Math.floor(time / 60);
  let second = Math.floor(time % 60).toString().padStart(2,'0')
  return `${minute}:${second}`;
}
function updateActiveSong (newSong) {
  const newSongs = songs.map((song) => {
    if (song.id === newSong.id) {
      return {
        ...song,
        active: true,
      };
    } else {
      return {
        ...song,
        active: false,
      };
    }
  });
  setSongs(newSongs);
}

// Return
  return (
    <div className='content'>
        <img className='content--img' src={clickedElement.cover} alt="img" />
        <h3 className='content--title'> {clickedElement.name}</h3>
        <small className='content--name'>{clickedElement.artist}</small>
        <audio src={clickedElement.audio} ref={audioRef} onLoadedMetadata={updateHandler}
				onTimeUpdate={updateHandler} onEnded={nextSongPlay}/>
        <div className='audio--player'>
          <span className='audio--start'>{getTime(songInfo.currentTime || 0)}</span>
          <div className="audio--bar">
            <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" style={{'background': `linear-gradient(to right,${clickedElement.color[0]}, ${clickedElement.color[1]} ${(parseInt(songInfo.currentTime)-0)*100/(songInfo.duration-0)}%, #ccc 0px`}}/>
          </div>
          <span className='audio--end'>{getTime(songInfo.duration || 0)}</span>
        </div>
        <div className="controls">
            <div className='skipBack' onClick={()=>{skipHandler('skipBack')}}><i className="fa-solid fa-angle-left" style={{color:"black"}}></i></div>
            
        <div onClick={togglePlayPause}>

                  {isPlaying  ? 
                  <i className="fa-solid fa-pause" style={{color:"black"}}></i> :
                  <i className="fa-solid fa-play" style={{color:"black"}}></i>
        }
            </div>
            <div className='skipForward' onClick={()=>{skipHandler('skipForward')}}> <i className="fa-solid fa-angle-right" style={{color:"black"}}></i></div>
          </div>
      
       
    </div>
  )
}

export default Content