import React, { useState, useEffect } from 'react';
import { useFetchImageLinkDetails } from '../CustomHooks';
import { useParams } from 'react-router-dom';

const ImageViewDetails = () => {
  const [duration, setDuration] = useState(0); // duration in seconds (e.g., 300 seconds = 5 minutes)
  const [timeLeft, setTimeLeft] = useState(duration);

  const { id } = useParams();

  const { isLoading, isError, data } = useFetchImageLinkDetails(id);

  useEffect(() => {
    if (data) {
      // Set the initial time left based on the `minutes` field from the API
      setTimeLeft(data.minutes * 60);
    }
  }, [data]);


  useEffect(() => {
    // Countdown timer logic
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  // Format timeLeft to minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading image details.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
      <div className="rounded-lg border bg-white text-black shadow-sm w-full max-w-md p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight mb-4 text-center">Image View</h3>
        <div className="flex justify-center mb-4">
          <img
            src={data?.imagefile} // Use the dynamic image URL from fetched data
            alt={data?.description} // Use the dynamic description from fetched data
            className="rounded-md border bg-gray-200"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
        <div className="flex justify-center items-center text-lg font-medium text-gray-700">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default ImageViewDetails;
