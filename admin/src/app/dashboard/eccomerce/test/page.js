"use client"
import { useEffect, useRef, useState } from 'react';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const page = () => {
  const firstName = 'peace';
  const canvasRef = useRef(null);
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set random background color
    const bgColor = getRandomColor();
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text (only first letter of the first name)
    ctx.font = '20px Arial';
    ctx.fillStyle = '#fff'; // White text color on a colored background
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const firstLetter = firstName.charAt(0).toUpperCase();
    ctx.fillText(firstLetter, canvas.width / 2, canvas.height / 2);

    // Get data URL after the image is loaded
    const image = new Image();
    image.onload = () => {
      const imageDataUrl = canvas.toDataURL();
      setDataUrl(imageDataUrl);
    };
    image.src = canvas.toDataURL(); // Trigger the image load
  }, [firstName]);

  // Check if canvas is not yet initialized
  if (!canvasRef.current) {
    return null;
  }

  console.log('data url', dataUrl);
  return <img src={dataUrl} alt={`User: ${firstName}`} width={200} height={200} />;
};

export default page;
