import '../table.css'

const Tableheader = () => {
  return (
    <>
    <div className="table-container">
    <table>
      <thead> 
      <tr>
          <th>post ID</th>
          <th>Name</th>
          <th>Email </th>
          <th>Comment</th>
         
        </tr>
      </thead>
     </table>
  </div>
    </>
  )
}

export default Tableheader