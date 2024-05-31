import React, { useEffect, useState } from 'react';
import { useFetchImageLinkDetails, useUpdateImageLink } from '../CustomHooks'; // Custom hooks for fetching and updating image links
import { useParams } from 'react-router-dom'; // For getting the image link ID from the URL
import { useSelector } from 'react-redux';
import 'daisyui';

function EditImageLinkScreen() {
    const { id } = useParams(); // Get the image link ID from the URL
    const [image, setImage] = useState('');
    const [minute, setMinutes] = useState('');

    const { data: imageLink, isSuccess: isFetchSuccess } = useFetchImageLinkDetails(id); // Fetch existing image link data
    const { mutate, isSuccess: isUpdateSuccess, isLoading, error } = useUpdateImageLink();
    const userdata = useSelector((state) => state.user);
    const { userInfo } = userdata;

    useEffect(() => {
        if (isFetchSuccess && imageLink) {
            setImage(imageLink.imagefile);
            setMinutes(imageLink.minutes);
          
        }
    }, [isFetchSuccess, imageLink]);

    useEffect(() => {
        if (isUpdateSuccess) {
            // Handle successful update (e.g., navigate to a different page or show a success message)
        }
    }, [isUpdateSuccess]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        mutate({ id, imageFile: image, duration: minute, user: userInfo });
    };

    return (
        <form className="flex justify-center items-center min-h-screen bg-gray-100" onSubmit={onSubmitHandler}>
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Edit Image</h2>
                    <p className="text-gray-500">Update the details for your image.</p>
                    <div className="form-control">
                        <label className="label" htmlFor="imageFile">
                            <span className="label-text">Image File</span>
                        </label>
                        <input
                            type="file"
                            id="imageFile"
                            className="input input-bordered"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="form-control mt-4">
                        <label className="label" htmlFor="duration">
                            <span className="label-text">Duration (minutes)</span>
                        </label>
                        <input
                            type="number"
                            id="duration"
                            className="input input-bordered"
                            placeholder="Enter duration in minutes"
                            value={minute}
                            onChange={(e) => setMinutes(e.target.value)}
                        />
                    </div>
                    <div className="form-control mt-6">
                        {isLoading ? (
                            <button className="btn btn-primary loading" type="submit">
                                Loading
                            </button>
                        ) : (
                            <button className="btn btn-primary" type="submit">
                                Save
                            </button>
                        )}
                    </div>
                    {error && <div className="alert alert-error mt-4">{error.message}</div>}
                </div>
            </div>
        </form>
    );
}

export default EditImageLinkScreen;
