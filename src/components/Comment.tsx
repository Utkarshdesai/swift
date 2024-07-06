
import { usercomment } from "../types/usercomment"
import { useEffect, useState } from "react"
import Commentbar from "./Commentbar"
import Tableheader from "./Tableheader"
//find last index and values to it 


const Comment = () => {
  const [body , setbody ] = useState< usercomment | []> ([])
  const [loading ,setloding ] = useState(false)
  const [currentpage ,setcurrentpage] = useState(1)
  const [pagesize ,setpagesize] = useState(10)
  const [search , setsearch] = useState<string>('')
  const [sortOrder, setSortOrder] = useState< 'asc' | 'dsc' | ''  > ('');
  const [sortColumn, setSortColumn] = useState<string>('');
 
 
  
  // get comment data from api 
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
 
  // persist values 
  useEffect(() => {
     const storedSortOrder  = localStorage.getItem('sortOrder')  as 'asc' | 'dsc';
    //const storedSearchQuery = localStorage.getItem('searchQuery') 
    const storedCurrentPage = localStorage.getItem('currentPage');
    const storedPageSize = localStorage.getItem('pageSize');

    if (storedSortOrder) setSortOrder(storedSortOrder);
    ////if (storedSearchQuery)  setsearch(storedSearchQuery)
    if (storedCurrentPage) setcurrentpage(parseInt(storedCurrentPage));
    if (storedPageSize) setpagesize(parseInt(storedPageSize));
  }, []);

  useEffect(() => {
    localStorage.setItem('sortOrder', sortOrder);
    //localStorage.setItem('searchQuery', setsearch);
    localStorage.setItem('currentPage', currentpage.toString());
    localStorage.setItem('pageSize', pagesize.toString());
  }, [pagesize,setsearch ,currentpage,sortOrder]);



 //next button 
  const handlenext = () => {
    setcurrentpage(currentpage + 1)
  }

 // back button 
 const handleback = () => {
    setcurrentpage(currentpage - 1)
  }

 //pagination logic 
 const pagedata = () => {
   const firstindex  = (currentpage - 1) * pagesize
   return (body as usercomment).slice(firstindex, firstindex + pagesize)
 }


 // search functionality
 const Handlesearch = () => {

    if(!search) 
        {
            setbody(body)
        }
   
    //filter logic 
        
            console.log(search)
            const filterComment = body.filter((item : usercomment) => 
                item.email.includes(search) || 
                item.name.includes(search)
              )
              
          
              console.log(filterComment)
              setbody(filterComment)

              console.log(body)
            
    
      setsearch('')
        
 }

 
 
//sorting logic
const handleSorting = (column : string) => {

   // logic for sorting cycle 
   let newSortOrder: 'asc' | 'dsc' | '' = ''; 

   if (sortColumn === column) 
    {
    if (sortOrder === '') newSortOrder = 'asc';
    else if (sortOrder === 'asc') newSortOrder = 'dsc';
    else if (sortOrder === 'dsc') newSortOrder = '';
  } 
  else {
    newSortOrder = 'asc';
  } 
    
   
    setSortOrder(newSortOrder);
    setSortColumn(column);
    

  
    if(newSortOrder === 'asc' )
     {  
         
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

                console.log(sortedPeople)
            }

        else if(column === 'name')
            {
                const getname = [...body].
                map((item:usercomment) => item.name).
                sort((a:string,b:string) =>  a.localeCompare(b) )
         
                
                const sortedPeople : usercomment = [...body].map((person :usercomment , index :number) => ({
                 ...person,
                 name: getname[index]
                }));
         
                setbody(sortedPeople)
            }

            
            if (column === 'postid')
                {
                    const getid = [...body].
                    map((item:usercomment) => item.id).
                    sort((a ,b ) => a-b )
            
                   
                    const sortedPeople : usercomment[] = [...body].map((person :usercomment , index :number) => ({
                    ...person,
                     id: getid[index]
                    }));
            
                    setbody(sortedPeople)
                }       
            
     }
     
     else if(newSortOrder === 'dsc')

      {  
        
            if(column ==='email')
                {
                    const getemail = [...body].map((item:usercomment) => item.email ).sort((a:string,b:string) => b.localeCompare(a))

       
                    const sortedPeople  = [...body].map((person :usercomment , index :number) => ({
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

                    if (column === 'postid')
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

   else{
     setbody(body)
   }
         
 
 };
 

//  console.log(sortOrder)
//  console.log(sortColumn)
  

  return (
    <div className="mt-[40px] ">

     <div className="flex gap-3 p-6"> 
        <p 
         className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none "
         onClick={()=> handleSorting('postid')}> sort by id </p>
        <p 
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
         onClick={()=> handleSorting('email')}> sort by email </p>
        <p 
         className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        onClick={() => handleSorting('name')}> sort by name </p>

   
      
        <input
         type="text"
         value={search}
         onChange={(e)=> setsearch(e.target.value)}
         className="py-2 px-4 mr-4 flex-1 border border-gray-300 rounded-md focus:outline-none"
         placeholder="Search..."
        />

       
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none" 
         onClick={Handlesearch}> 
            Search 
        </button>

        </div>

        <div> 
         
         <Tableheader></Tableheader>
            {
               loading ? 
               
                <p> loading... </p>
               : 
               <div > 
                {   
                   //show table data
                    pagedata().map((item :usercomment[] , ) => <Commentbar  key ={item.id} item={item}></Commentbar> )
                    
                }
               </div>
             }

        </div>

    <div className="flex gap-x-10 mr-4 justify-center items-center p-4 mb-4">
    <div className="mb-2">
        <div>{`${currentpage} of ${pagesize} items`}</div>
    </div>

    <div className="mb-2 flex items-center gap-x-6">
        <button
            onClick={handleback}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mr-2"
        >
            Back
        </button>
        <p className="text-center">{currentpage}</p>
        <button
            onClick={handlenext}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ml-2"
        >
            Next
        </button>
    </div>

    <div>
        <select
            value={pagesize}
            onChange={(e) => setpagesize(parseInt(e.target.value))}
            className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none justify-center items-center"
        >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
        </select>
    </div>
</div>


    </div>
  )
}

export default Comment