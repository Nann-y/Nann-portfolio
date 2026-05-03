import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface BackgroundVideoProps {
  src?: string;
  imageSrc?: string;
  imageOpacity?: number;
  videoOpacity?: number;
}

export function BackgroundVideo({
  src,
  imageSrc,
  imageOpacity = 0.45,
  videoOpacity = 0.38,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!src) return;

    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    const startVideo = () => {
      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: false,
          lowLatencyMode: true,
          backBufferLength: 0
        });
        
        hls.loadSource(src);
        hls.attachMedia(video);
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(err => {
            console.warn("HLS autoplay failed, retrying muted:", err);
            video.muted = true;
            video.play().catch(pErr => console.error("HLS final play error:", pErr));
          });
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error("HLS Network error, trying to recover...");
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("HLS Media error, trying to recover...");
                hls?.recoverMediaError();
                break;
              default:
                console.error("HLS Fatal error, destroying...");
                hls?.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS support (Safari)
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          video.play().catch(err => console.error("Native HLS play error:", err));
        });
      }
    };

    startVideo();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div className="bg-video-container">
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: imageOpacity }}
        />
      )}
      {src && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoOpacity }}
        />
      )}
    </div>
  );
}
