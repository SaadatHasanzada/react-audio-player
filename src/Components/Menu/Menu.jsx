import React from 'react'
import './menu.css'

const Menu = ({show,isPlaying,audioRef,setClickedElement,songs,setSongs}) => {
 
  // Functions
 async function showAudio(obj){
await setClickedElement(obj)
const clickedSong = obj;
		const songList = songs;

		const newSongs = songList.map((song) => {
			if (song.id === clickedSong.id) {
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
if(isPlaying){
  audioRef.current.play();
} 
    }
  

const element=songs.map((obj)=>{
     return (
  
    <div  className={obj.active ? "audio active" : "audio"} onClick={()=>{showAudio(obj)}} key={obj.id}>
    <img src={obj.cover} alt="audio-img" />
    <div className="audio--info">
        <h3>{obj.name}</h3>
        <small>{obj.artist}</small> 
    </div>
            </div>
)
    })


    // Return
  return (
    <sidebar className={show ? "sidebarStyle" : ""}>
        <h2 className='library--header'>Library</h2>
     {element}
    </sidebar>
  )
}

export default Menu