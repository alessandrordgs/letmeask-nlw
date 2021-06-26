import { Link, useHistory, useParams } from 'react-router-dom'
import Delete from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import aswerImg from '../assets/images/answer.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'

import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firabase'
import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory()
  const params = useParams<RoomParams>();

  const roomId = params.id;

  const { questions, title } = useRoom(roomId)


  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }
  return (
    <div id="page-room">
      <header>
        <div className="content">
            <Link to="/">
              <img src={logoImg} alt="Letmeask" />
            </Link>
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom} >encerrar a sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span> {questions.length} pergunta(s)</span>}
        </div>

        <div>
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button type='button' onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>

                    <button type='button' onClick={() => handleHighlightQuestion(question.id)}>
                      <img src={aswerImg} alt="Dar destaque á pergunta" />
                    </button>
                  </>
                )}

                <button type='button' onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={Delete} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}