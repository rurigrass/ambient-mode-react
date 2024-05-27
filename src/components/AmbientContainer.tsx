import { useEffect, useRef } from "react";

enum FileType {
  VIDEO = "video",
  IMAGE = "image",
  IFRAME = "iframe",
}

type AmbientContainerProps = {
  ambient: boolean;
  fileType: FileType;
};

const AmbientContainer = ({ ambient, fileType }: AmbientContainerProps) => {
  const mediaRef = useRef<HTMLVideoElement | HTMLImageElement | null>(null);
  console.log(typeof fileType);

  // const videoRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const media = mediaRef.current;
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

      {fileType === FileType.IMAGE && (
        <img
          className="video"
          ref={mediaRef as React.RefObject<HTMLImageElement>}
          src="/media/AmbientModeImage.jpg"
          // src="/media/ContrastingImage.jpg"
        ></img>
      )}
      {fileType === FileType.VIDEO && (
        <video
          className="video"
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          controls
          autoPlay
          muted
          loop
          src="/media/AmbientModeTriangle.mp4"
        ></video>
      )}
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
