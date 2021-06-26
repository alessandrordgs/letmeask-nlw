import copyImg from '../assets/images/copy.svg'

import '../styles/components/roomCode.scss'

type RoomCodeProps = {
  code:string;
}
export function RoomCode(props: RoomCodeProps){
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
  }

  return(
    <button className="room-code">
      <div>
        <img onClick={copyRoomCodeToClipboard} src={copyImg} alt="Copiar o código da sala" />
      </div>
      <span>sala {props.code}</span>
    </button>
  )
}