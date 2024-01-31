import React, { ReactNode, useCallback, useLayoutEffect, useRef } from 'react';
import { ScreenConstructor, ScreenInterface } from './Screen';
import { Router } from '../Router';
import { RouteNames } from './index';
import { container } from '../constants';
 
export const HTMLScreen: ScreenConstructor<RouteNames> =  class HTMLScreen implements ScreenInterface<RouteNames> {
  router: Router<RouteNames>;
  root: HTMLDivElement;

  constructor (router: Router<RouteNames>) {
    this.router = router;
    this.root = document.createElement('div') as HTMLDivElement;
    this.root.style.position = 'relative';
    this.root.style.left = '-480px';
    this.root.className = 'html';
  }

  start () {
    container.appendChild(this.root)
  }

  resume = () => {}
  
  onShown = () => {}

  onHide = () => {
    this.root.remove();
  }

  onRemoved = () => {
    this.root.remove();
  }

  move (position: number) {
    const left = position * 480;

    this.root.style.left = `${left}px`
  }
}

export const In: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>()

  const fadeIn = useCallback((time: DOMHighResTimeStamp, lastTime = 0, passed = 0) => {
    const delta = lastTime ? (time - lastTime) / 1000 : 0;
    lastTime = time;
    passed += delta;

    if (passed >= 1) {
      const opacity = 1 - Math.min(1, (passed - 1) / 0.5)
  
      ref.current.style.background = `rgba(0, 0, 0, ${opacity})`
    }

    if (passed < 1.5) {
      requestAnimationFrame(t => fadeIn(t, lastTime, passed))

    } else {
      ref.current.style.display = 'none'
    }
  }, [])

  const fadeOut = useCallback((time: DOMHighResTimeStamp, lastTime = 0, passed = 0) => {
    const delta = lastTime ? (time - lastTime) / 1000 : 0;
    lastTime = time;
    passed += delta;

    ref.current.style.background = `rgba(0, 0, 0, ${passed})`

    if (passed < 1) {
      requestAnimationFrame(t => fadeIn(t, lastTime, passed))
    }
  }, [])

  useLayoutEffect(() => {
    if (ref.current) {
      requestAnimationFrame(fadeIn)
    }

    return () => {
      console.log('unmount')
      ref.current.style.display = 'block'
      requestAnimationFrame(fadeOut);
    }
  }, [fadeIn, fadeOut])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {children}
      <div ref={ref} style={{ backgroundColor: 'black', position: 'absolute', width: '100%', height: '100%', top: 0 }} />
    </div>
  )
}