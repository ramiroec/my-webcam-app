// src/WebcamComponent.tsx
import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamComponent: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const videoConstraints = {
    width: 640,
    height: 360,
    facingMode: "user",
  };

  const captureAndSendEmail = useCallback(async (imageSrc: string) => {
    try {
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageSrc }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el correo");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        captureAndSendEmail(imageSrc); // Enviar la imagen por correo
      }
    }
  }, [captureAndSendEmail]);

  const detectMotion = useCallback(() => {
    if (!webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current.video as HTMLVideoElement;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const currentFrame = context.getImageData(0, 0, canvas.width, canvas.height);

      if (canvasRef.current?.dataset.prevFrame) {
        const prevFrameData = JSON.parse(canvasRef.current.dataset.prevFrame);
        const prevFrame = new ImageData(
          new Uint8ClampedArray(prevFrameData.data),
          prevFrameData.width,
          prevFrameData.height
        );

        let diffPixelsCount = 0;
        const pixelDiffThreshold = 80; // Nuevo umbral de diferencia por píxel (más alto = menos sensible)
        const motionPixelThreshold = 0.05; // Proporción mínima de píxeles con diferencia para detectar movimiento (5%)

        for (let i = 0; i < currentFrame.data.length; i += 4) {
          const diff =
            Math.abs(currentFrame.data[i] - prevFrame.data[i]) +
            Math.abs(currentFrame.data[i + 1] - prevFrame.data[i + 1]) +
            Math.abs(currentFrame.data[i + 2] - prevFrame.data[i + 2]);

          if (diff > pixelDiffThreshold) {
            diffPixelsCount++;
          }
        }

        // Calcula el porcentaje de píxeles con diferencia significativa
        const totalPixels = currentFrame.data.length / 4;
        const motionRatio = diffPixelsCount / totalPixels;

        // Detecta movimiento solo si se alcanza el umbral de píxeles
        if (motionRatio > motionPixelThreshold && !isCapturing) {
          setIsCapturing(true);
          capture();
          setTimeout(() => setIsCapturing(false), 5000); // Evita capturas continuas durante 5 segundos
        }
      }

      // Guardar el frame actual como el frame anterior
      canvasRef.current.dataset.prevFrame = JSON.stringify({
        data: Array.from(currentFrame.data),
        width: currentFrame.width,
        height: currentFrame.height,
      });
    }
  }, [capture, isCapturing]);

  useEffect(() => {
    const interval = setInterval(detectMotion, 1000); // Comprobación cada 1 segundo
    return () => clearInterval(interval);
  }, [detectMotion]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Detección de Movimiento Optimizada</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={360}
        videoConstraints={videoConstraints}
      />
      <canvas ref={canvasRef} width={640} height={360} style={{ display: "none" }} />
    </div>
  );
};

export default WebcamComponent;
