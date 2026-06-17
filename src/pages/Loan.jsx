import { useParams } from 'react-router'

function Loan() {
  const { id } = useParams()

  return (
    <div className='loan'>
      <h1>Loan</h1>
      <p>Loan ID: {id}</p>
    </div>
  )
}

export default Loan