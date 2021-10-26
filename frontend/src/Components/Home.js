import Notes from './Notes'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import AlertMessage from './AlertMessage'

const Home = () => {
  const context = useContext(NoteContext)
  const { error } = context

  return (
    <>
      {error && (
        <AlertMessage variant={error.variant}>{error.message}</AlertMessage>
      )}
      <Notes />
    </>
  )
}

export default Home
