// Hook para animar el placeholder con ejemplos de texto
import { useEffect, useState } from "react";

export function useAnimatedPlaceholder(examples: string[]) {
  const [animPlaceholder, setAnimPlaceholder] = useState("");
  const [animIndex, setAnimIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingForward, setTypingForward] = useState(true);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    if (!animating) return;
    const current = examples[animIndex];
    let timeout: number;
    if (typingForward) {
      if (charIndex < current.length) {
        timeout = window.setTimeout(() => {
          setCharIndex((ci) => ci + 1);
          setAnimPlaceholder(current.slice(0, charIndex + 1));
        }, 100);
      } else {
        timeout = window.setTimeout(() => setTypingForward(false), 1000);
      }
    } else {
      if (charIndex > 0) {
        timeout = window.setTimeout(() => {
          setCharIndex((ci) => ci - 1);
          setAnimPlaceholder(current.slice(0, charIndex - 1));
        }, 50);
      } else {
        let next = Math.floor(Math.random() * examples.length);
        if (next === animIndex) {
          next = (animIndex + 1) % examples.length;
        }
        setAnimIndex(next);
        setTypingForward(true);
      }
    }

    return () => window.clearTimeout(timeout);
  }, [charIndex, typingForward, animIndex, animating, examples]);

  return {
    animPlaceholder,
    startAnimating: () => setAnimating(true),
    stopAnimating: () => setAnimating(false),
  };
}
