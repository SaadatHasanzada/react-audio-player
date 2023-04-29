import React from 'react'
import Header from './Components/Header/Header'
import Menu from './Components/Menu/Menu'
import Content from './Components/Content/Content'
import Data from './Components/data'
import './app.css';

function App() {
  
  const [show,setshow]=React.useState(false)
  const audioRef=React.useRef();
  const [songInfo, setSongInfo] = React.useState({
		currentTime: 0,
		duration: 0,
	});
  const [songs,setSongs]=React.useState(Data)
  const [clickedElement,setClickedElement]=React.useState(songs[0])
  
  const [isPlaying,setIsPlaying]=React.useState(false)

  React.useEffect(()=>{
    if (isPlaying) {
      audioRef.current.play();
    }
  },[clickedElement,isPlaying])

  // Functions
  function handleClick(){
    setshow((prev)=>!prev)
      }
  function nextSongPlay () {

  let currentIndex = songs.findIndex((song) => song.id === clickedElement.id);
  let nextSong = songs[(currentIndex + 1) % songs.length];
setClickedElement(nextSong)

  const newSongs = songs.map((song) => {
    if (song.id === nextSong.id) {
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

function togglePlayPause(){
    if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(!isPlaying)
      } else {
        audioRef.current.play();
        setIsPlaying(!isPlaying)
      }

    
}




  return (
    <div className='container'>
 <Menu show={show} clickedElement={clickedElement} setClickedElement={setClickedElement} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setSongs={setSongs}/>
 <div className={show ? "content--body headerStyle" : "content--body"}>
  <Header show={show} handleClick={handleClick}/>
<Content clickedElement={clickedElement} audioRef={audioRef} togglePlayPause={togglePlayPause} isPlaying={isPlaying} setClickedElement={setClickedElement} songInfo={songInfo} setSongInfo={setSongInfo} songs={songs} setSongs={setSongs} nextSongPlay={nextSongPlay}/>
 </div>
    </div>
  )
}

export default App
