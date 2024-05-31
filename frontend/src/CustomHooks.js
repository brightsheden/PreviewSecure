import { useQuery,useMutation, useQueryClient } from 'react-query';
import axios from 'axios';


const fetchUserImageLinks = async (params) => {
  const {user} = params
  console.log(user.user.token)
    const response = await axios.get('/api/user/image-links/',    {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user?.user.token}`

    },
  
  }
    );
    return response.data;
   };


  export const useFecthUserImageLinks = (user) => {
  return useQuery(['fetchUserImageLinks', user], () => fetchUserImageLinks({ user }));
  };


  const deleteImageLink = async (id)=>{
    const response = await axios.delete(`/api/delete/imagelink/${id}/`)
    return response.data

  };

  export const useDeleteImage = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteImageLink, {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchUserImageLinks');
      },
    });
  };
    


   const fetchImageLinkDetails = async (id) => {
    const response = await axios.get(`/api/image-links/details/${id}/`);
    return response.data;
  };
  

  export const useFetchImageLinkDetails = (id) => {
    return useQuery(['fetchImageLinkDetails', id], () => fetchImageLinkDetails(id));
  };
  






const createImageLink = async ({ imageFile, duration,watermark,watermarkImage, user }) => {
    const formData = new FormData();
    formData.append('imagefile', imageFile);
    formData.append('minutes', duration);
    formData.append('is_watermark', watermark);
    formData.append('watermark_image', watermarkImage)
    formData.append('user', user.id);

    console.log(formData)
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/image-links/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`

        },
      
      });
      console.log(user)
  
      return response.data;
    } catch (error) {
      throw new Error(error)
    }
  };
  
  export const useCreateImageLink = () => {
    const queryClient = useQueryClient();
    return useMutation(createImageLink,  {
      onSuccess: () => {
        queryClient.invalidateQueries('fetchUserImageLinks');
      },
    });
  };



const updateImageLink = async ({ imageFile, duration, user, id }) => {
    const formData = new FormData();
    formData.append('imagefile', imageFile);
    formData.append('minutes', duration);
    formData.append('user', user.id);

    console.log(formData)
  
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/image-links/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`

        },
      
      });
      console.log(user)
  
      return response.data;
    } catch (error) {
      throw new Error(error)
    }
  };
  

export const useUpdateImageLink =()=>{
  const queryClient=useQueryClient()
  return useMutation(updateImageLink, {
    onSuccess: ()=>{
      queryClient.invalidateQueries('fetchUserImageLinks')
    }
  })
}