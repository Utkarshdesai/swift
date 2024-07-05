
import { usercomment } from "../types/usercomment"

import { useEffect, useState } from "react"
import Commentbar from "./Commentbar"
//find last index and values to it 

const Comment = () => {
  const [body , setbody ] = useState< usercomment | []> ([])
  const [loading ,setloding ] = useState(false)
  const [currentpage ,setcurrentpage] = useState(1)
  const [pagesize ,setpagesize] = useState(10)
  const [search , setsearch] = useState('')
  const [sortOrder, setSortOrder] = useState< 'asc' | 'dsc' | 'none' > ('none');
 
 
  console.log(pagesize)
  console.log(currentpage)

  const commentdata = async () => {

    try {

        setloding(true)
        const res = await fetch ('https://jsonplaceholder.typicode.com/comments')
        const data : usercomment = await res.json()
        setbody(data) 
        setloding(false)
    } catch (error) {
        console.log('error while fetching comment' ,error)
    }
         
  } 

  useEffect(()=> {
     try {
        commentdata()
     } catch (error) {
        console.log('error while fetching comment' ,error)
     }
  },[])

 //next button 
  const handlenext = () => {
    setcurrentpage(currentpage + 1)
  }

 // back button 
 const handleback = () => {
    setcurrentpage(currentpage - 1)
  }

 //function which set data based on page 
 const pagedata = () => {
   const firstindex  = (currentpage - 1) * pagesize
   return body.slice(firstindex, firstindex + pagesize)
 }


 const Handlesearch = () => {
   
    //filter logic 
    if(search)
        {   
            console.log(search)
            const filterComment: usercomment[] = body.filter((item) => 
                item.email === search || 
                item.name === search
              )
              
          
              console.log(filterComment)
              setbody(filterComment)
            
        }

        setsearch('')   
 }

 

const handleSorting = (column : string) => {

    const neworder : [string ,string ,string, string] = ['none' , 'asc' ,'dsc' , 'none']
  
    if(sortOrder === 'asc' )
     {  
      
        neworder[2]

        if(column === 'email')
            {
                const getemail = [...body].
                map((item:usercomment) => item.email).
                sort((a:string,b:string) =>  a.localeCompare(b) )
         
                
                const sortedPeople : usercomment[] = [...body].map((person :usercomment , index :number) => ({
                 ...person,
                 email: getemail[index]
                }));
         
                setbody(sortedPeople)
            }

        else if(column === 'name')
            {
                const getname = [...body].
                map((item:usercomment) => item.name).
                sort((a:string,b:string) =>  a.localeCompare(b) )
         
                
                const sortedPeople : usercomment[] = [...body].map((person :usercomment , index :number) => ({
                 ...person,
                 name: getname[index]
                }));
         
                setbody(sortedPeople)
            }
        
            
     }
     
     if(sortOrder === 'dsc')

      {  
        neworder[3] 

            if(column ==='email')
                {
                    const getemail = [...body].map((item:usercomment) => item.email ).sort((a:string,b:string) => b.localeCompare(a))

       
                    const sortedPeople : usercomment[] = [...body].map((person :usercomment , index :number) => ({
                        ...person,
                        email: getemail[index]
                    }));
        
                    setbody(sortedPeople)
                }

                if(column === 'name')
                    {
                        const getname = [...body].
                        map((item:usercomment) => item.name).
                        sort((a:string,b:string) =>  b.localeCompare(a) )
                 
                        
                        const sortedPeople : usercomment[] = [...body].map((person :usercomment , index :number) => ({
                         ...person,
                         name: getname[index]
                        }));
                 
                        setbody(sortedPeople)
                    }

                     else if (column === 'postid')
                         {
                             const getid = [...body].
                             map((item:usercomment) => item.id).
                             sort((a ,b ) => b-a )
                     
                            
                             const sortedPeople : usercomment[] = [...body].map((person :usercomment , index :number) => ({
                             ...person,
                              id: getid[index]
                             }));
                     
                             setbody(sortedPeople)
                         }
           
            
         }

         
    else if (sortOrder === 'none')
    {
        neworder[1]
        return body
    }
 
 };
 

 
  
  console.log(sortOrder) 

  return (
    <div className="mt-[40px] ">

        <p onClick={()=> handleSorting('postid')}> sort by id </p>
        <p onClick={()=> handleSorting('email')}> sort by email </p>
        <p onClick={() => handleSorting('name')}> sort by name </p>
      
        <input
         type="text"
         value={search}
         onChange={(e)=> setsearch(e.target.value)}
        />

        <p> yesss </p>

        <button onClick={Handlesearch}> 
            Search 
        </button>

            {
               loading ? 
               
                <p> loading... </p>
               : 
               <div> 
                {   
                   
                    pagedata().map((item :usercomment[]) => <Commentbar key={item.id} item = {item}/>)
                }
               </div>
             }

       <div >
            <div> {`${currentpage}  of ${pagesize} items`} </div>
            <div> 
              <button
              onClick={handleback}
              > 
                  back
              </button>
              <p> 1 </p>
              <button
               onClick={handlenext} 
              > 
                  next 
              </button>
            </div>

            <div>
                <select value={pagesize} onChange={(e)=> setpagesize(parseInt(e.target.value))}> Select page size 
                  <option value={10}> 10 </option>
                  <option value={50}> 50 </option>
                  <option value={100}> 100 </option> 
                </select>
                
            </div>
          
       </div>

    </div>
  )
}

export default Comment