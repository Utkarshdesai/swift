import { useEffect, useState } from "react"
import { user } from "../types/user"


const Profile = () => {

  const [userdata , setuserdata] = useState<user | [] >([]) 
  const [loading , setloding] = useState(false)

  const profiledata = async () => {
    
    setloding(true)
    const data  = await fetch('https://jsonplaceholder.typicode.com/users') 
    
    const res : user[] =  await data.json() 
    console.log(res)
    setuserdata(res[0])
    setloding(false)

  }  

  console.log(userdata.id)

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
          <div> 
            
            <div className="flex gap-x-2 mt-[20px]">
                <button> back </button>
                <p> username </p>
            </div>

            <div className="border-red-50 flex-col mt-[40px] px-[20px]">
                <div>
                   <p> userlogo</p>
                </div>

                <div className="flex justify-around mt-[30px]">
                    <div className="flex flex-col gap-y-5">

                        <div>
                          <p className="mb-2 text-sm text-richblack-600"> User ID </p>
                          <p className="text-sm font-medium text-richblack-5"> {userdata.id} </p>
                        </div>

                        <div>
                          <p className="mb-2 text-sm text-richblack-600"> Email ID </p>
                          <p className="text-sm font-medium text-richblack-5"> {userdata.email} </p>
                        </div>

                        <div>
                          <p className="mb-2 text-sm text-richblack-600"> Phone </p>
                          <p className="text-sm font-medium text-richblack-5"> {userdata.phone} </p>
                        </div>
                        
                    </div>

                    <div>
                      <div>
                          <p className="mb-2 text-sm text-richblack-600"> Name </p>
                          <p className="text-sm font-medium text-richblack-5"> {userdata.name} </p>
                        </div>

                        <div>
                          <p className="mb-2 text-sm text-richblack-600"> Address  </p>
                          <p className="text-sm font-medium text-richblack-5"> hello </p>
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