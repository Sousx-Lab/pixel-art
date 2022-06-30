import { useRef, useEffect } from 'react';

interface IUseCanvas {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void,
  options?: { 
    [key: string]: string | null };
}

export default function useCanvas({ draw }: IUseCanvas): React.RefObject<HTMLCanvasElement> {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context: CanvasRenderingContext2D = canvas?.getContext('2d')!
    let frameCount = 0
    let animationFrameId: number
    draw(context, frameCount)
    // const render = () => {
    //   frameCount++
    //   draw(context, frameCount)
    //   animationFrameId = window.requestAnimationFrame(render)
    // }
    // render()
    // return () => {
    //   window.cancelAnimationFrame(animationFrameId)
    // }
  }, [draw])
  return canvasRef;
}