import Notes from './Notes'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import AlertMessage from './AlertMessage'
import Loader from './Loader'

const Home = () => {
  const context = useContext(NoteContext)
  const { error, loading } = context

  return (
    <>
      {loading && <Loader />}
      {error && (
        <AlertMessage variant={error.variant}>{error.message}</AlertMessage>
      )}
      <Notes />
    </>
  )
}

export default Home
