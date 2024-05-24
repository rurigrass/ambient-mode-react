import { useEffect, useRef } from "react";

type AmbientContainerProps = {
  ambient: boolean;
};

const AmbientContainer = ({ ambient }: AmbientContainerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const video = videoRef.current;
    if (!video) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawAmbient(ctx, canvas, video, ambient);
    !ambient && ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [ambient]);

  const drawAmbient = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement,
    ambient: boolean
  ) => {
    ctx.drawImage(video, 0, 0, 1, 1, 0, 0, canvas.width, canvas.height);
    video.ontimeupdate = () => {
      ambient
        ? ctx.drawImage(video, 0, 0, 1, 1, 0, 0, canvas.width, canvas.height)
        : ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  };

  return (
    <div className="container">
      <canvas className="canvas" ref={canvasRef}></canvas>
      <video
        ref={videoRef}
        controls
        // autoPlay
        muted
        loop
        src="/media/AmbientModeTest.mp4"
      ></video>
    </div>
  );
};

export default AmbientContainer;
