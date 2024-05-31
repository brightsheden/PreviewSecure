import React, { useEffect } from 'react'
import {  FaGift,  FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useDeleteImage, useFecthUserImageLinks } from '../CustomHooks'
import { Button } from '@material-tailwind/react'


function ProfileScreen() {
   const userdata = useSelector((state)=> state.user)
   const {userInfo} = userdata 


  
   
   

  
   

  
   const { isLoading, data, error } = useFecthUserImageLinks({ user: userInfo });

  

   const { mutate, isLoading:loadingDelete,error:errorDelete, isSuccess} = useDeleteImage()



   const deleteHandler = (id)=>{
    mutate(id)

   }
  return (
    <div>

        <div className='my-8'>
   
    <div className=" p-4 md:p-8 rounded-lg shadow-md">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

  <div className="bg-white glass p-4 rounded-lg flex items-center justify-between">
    <div>
      <p className="text-sm font-semibold text-gray-700">All image links</p>
      <p className="text-lg font-bold text-[#000080]">{data?.length}</p>
    </div>
      <FaGift className="text-[#000080] text-2xl"/>
  </div>


  <div className="bg-white p-4 rounded-lg flex items-center justify-between border">
    <div>
      <p className="text-sm font-semibold text-gray-700">Expired</p>
      <p className="text-lg font-bold text-[#000080]">{data?.filter(data => data.is_expired).length}</p>
    </div>
    <FaUsers className="text-2xl text-[#000080] "/>
  </div>

  




  
</div>
</div>
    </div>


<div className='container mx-auto'>
  <div className='flex justify-between'>
  <h2 className='text-2xl font-bold'>All Image Links </h2>

  <Link to='/addimagelink'>
  <button className='btn bg-black text-white hover:bg-black'>Add New</button>
  </Link>

 

  </div>
 

  <div className="  overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>image</th>
        <th>Minutes</th>
        <th>Expired</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {data?.map((file, index)=>(
        <tr key={index} className="bg-base-200">
        <th>{index}</th>
        <td>
          <img src={file.imagefile} className='w-8 h-8'/>
        </td>
        <td>{file.minutes}</td>
        <td>
          {file.is_expired ? "expired" :"not expired"}

        </td>

        <td className='flex justify-between'>
          <Link to={`/media/${file.id}`}>
          <Button>View</Button>
          </Link>
          
          <Link to={`/editimage/${file.id}`}>
          <Button>Edit</Button>
          </Link>
         
          <Button onClick={()=>deleteHandler(file.id)}>Delete</Button>
        </td>
      </tr>

      ))}
      
   
    </tbody>
  </table>
</div>

</div>




    </div>
  )
}

export default ProfileScreen