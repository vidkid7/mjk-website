'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedNepalFlagBackground, MountainSilhouette } from '@/components/ui/NepalFlag';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  mediaContain?: boolean;
  mediaBgClass?: string;
  showNepalFlag?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  mediaContain = false,
  mediaBgClass,
  showNepalFlag = false,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = useState<number>(1200);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setViewportWidth(window.innerWidth);
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = (isMobileState ? 240 : 300) + scrollProgress * (isMobileState ? 660 : 1250);
  const mediaHeight = (isMobileState ? 300 : 400) + scrollProgress * (isMobileState ? 240 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const isCompactState = !isMobileState && viewportWidth < 1100;
  const mediaLeft = isMobileState ? '50%' : `${(isCompactState ? 73 : 62) - scrollProgress * (isCompactState ? 23 : 12)}%`;
  const mediaTop = isMobileState ? `${75 - scrollProgress * 25}%` : '50%';
  const introOpacity = Math.max(0, 1 - scrollProgress * 1.35);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  const imageObjectClass = mediaContain
    ? 'w-full h-full object-contain object-bottom rounded-xl'
    : 'w-full h-full object-cover rounded-xl';

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh] overflow-hidden bg-[#071224]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          {showNepalFlag && <AnimatedNepalFlagBackground />}

          {/* Background image layer */}
          <motion.div
            className="absolute inset-0 z-[1] h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: showNepalFlag ? 0.28 - scrollProgress * 0.12 : 1 - scrollProgress * 0.7 }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#071224]/85 via-[#071224]/45 to-[#071224]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071224]/85 via-[#071224]/25 to-[#071224]/65" />
          </motion.div>

          <MountainSilhouette className="absolute bottom-0 left-0 z-[2] h-[28vh] w-full text-white opacity-[0.35]" />

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <motion.div
                className="absolute left-5 right-5 top-[12%] z-20 max-w-sm text-center sm:left-8 sm:right-auto sm:top-1/2 sm:-translate-y-1/2 sm:text-left lg:left-16 lg:max-w-xl"
                style={{
                  opacity: introOpacity,
                  pointerEvents: introOpacity > 0.15 ? 'auto' : 'none',
                }}
              >
                <div className="mb-5 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-crimson shadow-[0_0_14px_rgba(220,38,38,0.75)]" />
                  {date || 'Leading Nepal'}
                </div>
                {title && (
                  <h1 className="font-playfair text-5xl font-extrabold leading-[0.95] tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
                    <span className="block">{firstWord}</span>
                    <span className="block text-[#f2c45b]">{restOfTitle}</span>
                  </h1>
                )}
                <p className="mt-6 max-w-sm text-sm font-medium leading-7 text-white/70 sm:text-base lg:max-w-md">
                  A modern civic movement rooted in Kathmandu, youth leadership, and service for Nepal.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3 sm:justify-start">
                  <a
                    href="#vision"
                    className="inline-flex items-center bg-crimson px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-xl shadow-crimson/25 transition hover:bg-crimson-dark"
                  >
                    Explore Vision
                  </a>
                  <a
                    href="#about"
                    className="inline-flex items-center border border-white/25 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur transition hover:bg-white/20"
                  >
                    About Mukesh
                  </a>
                </div>
              </motion.div>

              <div
                className="absolute z-10 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-lg"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  left: mediaLeft,
                  top: mediaTop,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 24px 80px rgba(0, 0, 0, 0.42)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className="relative w-full h-full pointer-events-none overflow-hidden rounded-lg">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className="w-full h-full rounded-lg"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: 'none' }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-lg"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full pointer-events-none bg-[#0a0e1a] rounded-lg overflow-hidden border border-white/15">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-contain rounded-lg"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: 'none' }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/20 rounded-lg"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0.4 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div className="absolute inset-0 rounded-lg ring-1 ring-white/10" />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#071224]/70 to-transparent" />
                    </div>
                  )
                ) : (
                  <div className={`relative w-full h-full rounded-lg overflow-hidden border border-white/15 ${mediaBgClass || ''}`}>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className={imageObjectClass}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 rounded-lg"
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 0.6 - scrollProgress * 0.5 }}
                      transition={{ duration: 0.2 }}
                    />
                    {/* Subtle crimson glow ring */}
                    <div className="absolute inset-0 rounded-lg ring-1 ring-crimson/20 shadow-[0_0_60px_rgba(220,38,38,0.15)]" />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
                  {date && (
                    <p
                      className="text-lg font-semibold uppercase tracking-[0.18em] text-white/80"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-white/60 font-medium text-center text-sm"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div className={textBlend ? 'mix-blend-normal' : 'mix-blend-normal'} />
            </div>

            <motion.section
              className="flex flex-col w-full px-5 py-12 md:px-10 lg:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
