"use client";

import { useEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const rafRef = useRef(null);
  const cardsRef = useRef([]);
  const cardPositionsRef = useRef([]);
  const isTickingRef = useRef(false);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  // Cache card positions on mount/resize
  const cachePositions = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    cardPositionsRef.current = cards.map(card => {
      if (useWindowScroll) {
        const rect = card.getBoundingClientRect();
        return rect.top + window.scrollY;
      }
      return card.offsetTop;
    });
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    const positions = cardPositionsRef.current;
    if (!cards.length || !positions.length) return;

    const scrollTop = useWindowScroll ? window.scrollY : scrollerRef.current?.scrollTop || 0;
    const containerHeight = useWindowScroll ? window.innerHeight : scrollerRef.current?.clientHeight || 0;
    
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');
    
    const endElementTop = endElement 
      ? (useWindowScroll 
          ? endElement.getBoundingClientRect().top + window.scrollY 
          : endElement.offsetTop)
      : 0;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = positions[i];
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      // Calculate scale
      let scaleProgress = 0;
      if (scrollTop >= triggerStart && scrollTop <= triggerEnd) {
        scaleProgress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      } else if (scrollTop > triggerEnd) {
        scaleProgress = 1;
      }

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      // Calculate translateY
      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;

      // Stack complete callback
      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isTickingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    useWindowScroll,
    onStackComplete,
    parsePercentage
  ]);

  const handleScroll = useCallback(() => {
    if (!isTickingRef.current) {
      isTickingRef.current = true;
      rafRef.current = requestAnimationFrame(updateCardTransforms);
    }
  }, [updateCardTransforms]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Get all cards
    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );
    cardsRef.current = cards;

    // Set up card styles
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
    });

    // Cache positions after a small delay to ensure layout is complete
    const positionTimeout = setTimeout(() => {
      cachePositions();
      updateCardTransforms();
    }, 100);

    // Add scroll listener
    const scrollTarget = useWindowScroll ? window : scroller;
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });

    // Recache positions on resize
    const handleResize = () => {
      cachePositions();
      updateCardTransforms();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(positionTimeout);
      scrollTarget.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      cardsRef.current = [];
      cardPositionsRef.current = [];
    };
  }, [itemDistance, useWindowScroll, handleScroll, cachePositions, updateCardTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;