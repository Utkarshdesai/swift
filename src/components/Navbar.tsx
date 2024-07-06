import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="w-full h-[50px] mt-[0px] bg-black flex justify-around items-center">
       <p className="text-white"> Swift </p>
        <Link to='/dashboard'>
           <p className="text-white text-sm font-poppins"> dashboard</p>
        </Link>
       

       <Link to='/'>
       <div>
          <img/> 
          <p className="text-white text-sm font-poppins"> profile </p>
       </div>
       </Link> 
       
    </div>
  )
}

export default Navbar