 interface itemprop {
    id: number ,
    name:string ,
    email:string ,
    body: string,
    postId :number
 }

const Commentbar = ( item : itemprop) => {

    console.log(item.item.name)
 
  return (
    <table>
            <tbody>
                    <tr >
                        <td>{item.item.id}</td>
                        <td>{item.item.name}</td>
                        <td>{item.item.email}</td>
                     
                                   
                    </tr>
                
            </tbody>
        </table>
  )
}

export default Commentbar