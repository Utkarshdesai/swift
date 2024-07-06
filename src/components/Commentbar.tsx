 interface itemprop {
    id: number ,
    name:string ,
    email:string ,
    body: string,
    postId :number
 }

const Commentbar = ( { item }: { item: itemprop }) => {

  
 
  return (
    <div className="m-[20px]"> 
    <table>
            <tbody>
                    <tr >
                        <td>{item.id}</td>
                        <td>{`${item.name.slice(0,6)}..`}</td>
                        <td>{item.email}</td>
                        <td>{`${item.body.slice(0,20)}..`}</td>             
                    </tr>
                
            </tbody>
        </table>
        </div>
  )
}

export default Commentbar