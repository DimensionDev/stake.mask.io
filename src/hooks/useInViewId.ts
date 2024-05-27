import { useEffect, useState } from 'react'

export function useInViewId(postSelector: string, headingSelector = 'h1, h2, h3, h4, h5, h6') {
  const [inViewId, setInViewId] = useState<string | undefined>()

  useEffect(() => {
    const inViewSet = new Map<string, HTMLElement>()

    const callback: IntersectionObserverCallback = (changes) => {
      for (const change of changes) {
        change.isIntersecting
          ? inViewSet.set(change.target.id, change.target as HTMLElement)
          : inViewSet.delete(change.target.id)
      }

      const inView = Array.from(inViewSet.entries())
        .map(([id, el]) => [id, el.offsetTop] as const)
        .filter(([id]) => !!id)

      if (inView.length > 0) {
        setInViewId(inView.reduce((acc, next) => (next[1] < acc[1] ? next : acc))[0])
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-100px 0px -50% 0px',
    })

    for (const el of document.querySelector(postSelector)!.querySelectorAll(headingSelector)) {
      observer.observe(el)
    }
    return () => observer.disconnect()
  }, [headingSelector, postSelector])

  return { inViewId }
}
