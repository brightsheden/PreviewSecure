import React, { useEffect, useState } from 'react';
import { useCreateImageLink } from '../CustomHooks';
import { useSelector } from 'react-redux';

function AddImageLinkScreen() {
    const [image, setImage] = useState('');
    const [minute, setMinutes] = useState('');
    const [watermark, setWaterMark] = useState(false);
    const [watermarkImage, setWaterMarkImage] = useState('');

    const { mutate, isSuccess, isLoading, error } = useCreateImageLink();
    const userdata = useSelector((state) => state.user);
    const { userInfo } = userdata;

    useEffect(() => {
        if (isSuccess) {
            setImage('');
            setMinutes('');
            setWaterMarkImage('');
            setWaterMark(false);
        }
    }, [isSuccess]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (watermark && watermarkImage) {
            const watermarkedImage = await applyWatermark(image, watermarkImage);
            mutate({ imageFile: watermarkedImage, duration: minute,watermarkImage, watermark, user: userInfo });
        } else {
            mutate({ imageFile: image, duration: minute, watermarkImage,watermark, user: userInfo });
        }
    };

    const applyWatermark = (imageFile, watermarkFile) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const image = new Image();
            const watermark = new Image();
    
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
    
                watermark.onload = () => {
                    const watermarkWidth = watermark.width * 0.1;  // Scale down the watermark
                    const watermarkHeight = watermark.height * 0.1; // Scale down the watermark
                    const x = (canvas.width - watermarkWidth) / 2;
                    const y = (canvas.height - watermarkHeight) / 2;
                    ctx.globalAlpha = 0.5; // Set the opacity
                    ctx.drawImage(watermark, x, y, watermarkWidth, watermarkHeight);
    
                    canvas.toBlob((blob) => {
                        resolve(new File([blob], imageFile.name, { type: 'image/png' }));
                    }, 'image/png');
                };
                watermark.src = URL.createObjectURL(watermarkFile);
            };
            image.src = URL.createObjectURL(imageFile);
        });
    };
    

    return (
        <form className="flex justify-center items-center min-h-screen bg-gray-100" onSubmit={onSubmitHandler}>
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Add Image</h2>
                    <p className="text-gray-500">Enter the details for your image.</p>
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
                    <div className="form-control mt-4">
                        <label className="cursor-pointer label">
                            <span className="label-text">Set watermark</span>
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={watermark}
                                onChange={(e) => setWaterMark(e.target.checked)}
                            />
                        </label>
                    </div>

                    {watermark && (
                        <div className="form-control mt-4">
                            <label>
                                Watermark Image:
                                <input
                                    type="file"
                                    name="watermark_image"
                                    onChange={(e) => setWaterMarkImage(e.target.files[0])}
                                />
                            </label>
                        </div>
                    )}

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
                </div>
            </div>
        </form>
    );
}

export default AddImageLinkScreen;
