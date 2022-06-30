import useCanvas from '../hooks/useCanvas'
import React , { useState, useCallback, useEffect } from 'react';

interface CanvasProps {
  id: string
  pixelColor: string
}
export default function Canvas({ id, pixelColor }: CanvasProps): JSX.Element {

  const [client, setClient] = useState({
    x: 0,
    y: 0,
  })

  const [pixColor, setPixColor] = useState("#e66465")
  const boxSize = 16
  const handleLeftClick = useCallback((e: React.MouseEvent) => {
    const closestPosX = boxX.reduce((prev, curr) => {
      return (Math.abs((curr + (boxSize/2) - e.clientX)) < Math.abs((prev + (boxSize/2)) - e.clientX) ? curr: prev);
    })
    const closestPosY = boxY.reduce((prev, curr) => {
      return (Math.abs((curr + boxSize) - e.clientY) < Math.abs((prev + boxSize)  - e.clientY) ? curr : prev);
    })
    setClient({
      x: closestPosX,
      y: closestPosY,
    })
  }, [client.x, client.y])

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setPixColor('#ffffff')
  }
  const lineWidth = 4
  const boxX: Array<number> = []
  const boxY: Array<number> = []

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    const rect = ctx.canvas.getBoundingClientRect()
    const { width, height } = rect
    const { devicePixelRatio: ratio = 1 } = window
    if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
      ctx.canvas.width = width * ratio
      ctx.canvas.height = height * ratio
      ctx.scale(ratio, ratio)
    }
    let boxIndex = 0;
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1.5;
    for (let x = 0; x <= width; x += boxSize) {
      boxX[boxIndex++] = x
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();

    }
    boxIndex = 0;
    for (let y = 0; y <= height; y += boxSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
      boxY[boxIndex++] = y
    }

    ctx.beginPath();
    ctx.rect((client.x + lineWidth) - rect.left, ( client.y + 16)  - rect.top, boxSize, boxSize)
    ctx.fillStyle = pixColor;
    ctx.fill();
  }
  const canvasRef = useCanvas({draw})

  useEffect(() => {
    setPixColor(pixelColor)
  },[pixelColor])

  return <canvas id={id ||'canvas'} ref={canvasRef} onClick={handleLeftClick} onContextMenu={handleRightClick} />
}
