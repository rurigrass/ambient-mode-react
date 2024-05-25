import { useEffect, useRef } from "react";



type AmbientContainerProps = {
  ambient: boolean;
  fileType: 
};

const AmbientContainer = ({ ambient }: AmbientContainerProps) => {
  const videoRef = useRef<HTMLVideoElement | HTMLImageElement>(null);
  // const videoRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const media = videoRef.current;
    if (!media) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawAmbient(ctx, canvas, media, ambient);
    !ambient && ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [ambient]);

  const drawAmbient = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    media: HTMLVideoElement | HTMLImageElement,
    // video: HTMLIFrameElement,
    ambient: boolean
  ) => {
    ctx.drawImage(media, 0, 0, 1, 1, 0, 0, canvas.width, canvas.height);

    media.ontimeupdate = () => {
      ambient
        ? ctx.drawImage(media, 0, 0, 1, 1, 0, 0, canvas.width, canvas.height)
        : ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  };

  return (
    <div className="container">
      <canvas className="canvas" ref={canvasRef}></canvas>
      {/* <video
        className="video"
        ref={videoRef}
        controls
        autoPlay
        muted
        loop
        // src="/media/AmbientModeTest.mp4"
        src="/media/AmbientModeTriangle.mp4"
      ></video> */}
      <img
        className="video"
        ref={videoRef}
        src="/media/AmbientModeImage.jpg"
        // src="/media/ContrastingImage.jpg"
      ></img>
      {/* <iframe
        className="video"
        ref={videoRef}
        width="560"
        height="315"
        src="https://www.youtube.com/embed/E7zz_BGVvrg?si=hdRtCHe6HyeBqNcW"
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // referrerpolicy="strict-origin-when-cross-origin"
        // allowfullscreen
      ></iframe> */}
    </div>
  );
};

export default AmbientContainer;
