import { useEffect, useState } from "react"
import { user } from "../types/user"
import { Link } from "react-router-dom"

const Profile = () => {

  const [userdata , setuserdata] = useState< user | [] >([]) 
  const [loading , setloding] = useState(false)

 
  // fetch user data
  const profiledata = async () => {
    try {
        setloding(true)
        const data  = await fetch('https://jsonplaceholder.typicode.com/users') 
        
        const res : user[] =  await data.json() 
        //console.log(res)
        setuserdata(res[1])
        setloding(false)  
    } catch (error) {
        console.log('error while fetching profile data')    
    }
    

  }  

  

  useEffect(()=>{
    try {
      profiledata()
    } catch (error) {
      console.log('error while fetching profile data')  
    }

  },[])

   
   

  return (
    <div className=" justify-center items-center h-[400px]">
       {
        
        loading ? 
          <p> loading ... </p> 

          :                    
          
          (
          <div > 
            
            <div className="flex gap-x-2 mt-[20px] items-center ml-[140px]">
                <div> 
                <Link to='/dashboard'>
                <button> Back   </button>
                </Link>
                </div>
                
                <p className="text-lg py-4 font-bold font-poppins"> {`Welcome , ${userdata.name}`} </p>

            </div>

            <div className="border-gray-400 border w-[80%] h-[500px] mt-[20px] mx-auto p-4 flex-col rounded-md justify-center">
                <div className="flex gap-x-6">
                    <div className="w-[70px] h-[70px] rounded-full bg-gray-600 flex justify-center items-center">
                    <p className="font-bold text-lg">{userdata && userdata.name ? userdata.name.slice(0, 1) : ''}</p>
                    <p className="font-bold text-lg">{userdata && userdata.name ? userdata.name.slice(6,7) : ''}</p>
                    </div>

                    <div className="flex-col justify-center items-center">
                         <p> {userdata.name}</p>
                         <p> {userdata.email} </p>
                    </div>
                 
                </div>

                <div className="flex justify-evenly mt-[30px]">
                    <div className="flex flex-col gap-y-5">

                        <div>
                          <p className="mb-2 text-sm text-richblack-600"> User ID </p>
                           <div className="bg-gray-200 h-[40px] flex p-2 rounded-md items-center">
                           <p className="text-sm font-medium"> {userdata.id} </p>
                            </div>
                        
                        </div>

                        <div>
                          <p className="mb-2 text-sm text-richblack-600"> Email ID </p>

                          <div className="bg-gray-200 h-[40px] flex p-2 rounded-md items-center">
                          <p className="text-sm font-medium "> {userdata.email} </p>
                          </div>
                        
                        </div>

                        <div>
                          <p className="mb-2 text-sm text-richblack-600"> Phone </p>
                           <div className="bg-gray-200 h-[40px] flex p-2 rounded-md items-center"> 
                             <p className="text-sm font-medium "> {userdata.phone} </p>
                          </div>
                        
                        </div>
                        
                    </div>

                    <div className="flex flex-col gap-y-5">
                      <div>
                          <p className="mb-2 text-sm text-richblack-600"> Name </p>
                          <div className="bg-gray-200 h-[40px] flex p-2 rounded-md items-center" >
                           <p className="text-sm font-medium "> {userdata.name} </p>
                         </div>
                         
                        </div>

                        <div>
                          <p className="mb-2 text-sm text-richblack-600"> Website  </p>
                          <div className="bg-gray-200 h-[40px] flex p-2 rounded-md items-center">
                             <p className="text-sm font-medium "> {userdata.website} </p>  
                            
                          </div>
                        
                        </div>

                    </div>
                </div>

            </div>



          </div>
          )

       }
    </div>
  )
}

export default Profile