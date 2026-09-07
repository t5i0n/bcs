import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroFarm from "@/assets/hero-farm.jpg";
import farmers from "@/assets/farmers.jpg";
import drying from "@/assets/drying.jpg";
import washing from "@/assets/washing.jpg";
import cherries from "@/assets/cherries.jpg";
import grading from "@/assets/grading.jpg";
import ceremony from "@/assets/ceremony.jpg";
import exportImg from "@/assets/export.jpg";

const PHOTOS = [
  { src: heroFarm, alt: "Ethiopian coffee farm at sunrise" },
  { src: farmers, alt: "Ethiopian coffee farmers at harvest" },
  { src: cherries, alt: "Freshly picked coffee cherries" },
  { src: washing, alt: "Coffee washing station" },
  { src: drying, alt: "Coffee beans drying in the sun" },
  { src: grading, alt: "Coffee grading and sorting" },
  { src: ceremony, alt: "Traditional Ethiopian coffee ceremony" },
  { src: exportImg, alt: "Coffee export and logistics" },
];

const INTERVAL = 3500;
const SWIPE_THRESHOLD = 50;

export function StackedCardCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const didDrag = useRef(false);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % PHOTOS.length);
  }, []);

  useEffect(() => {
    if (isPaused || isDragging) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, isDragging, next]);

  // --- Touch / Mouse drag handlers ---
  function onPointerDown(x: number, y: number) {
    dragStart.current = { x, y };
    didDrag.current = false;
    setIsDragging(true);
  }

  function onPointerMove(x: number) {
    if (!dragStart.current) return;
    const dx = x - dragStart.current.x;
    if (Math.abs(dx) > 5) didDrag.current = true;
    setDragOffset(dx);
  }

  function onPointerUp() {
    if (!dragStart.current) return;
    if (dragOffset < -SWIPE_THRESHOLD) next();
    else if (dragOffset > SWIPE_THRESHOLD) prev();
    dragStart.current = null;
    setDragOffset(0);
    setIsDragging(false);
  }

  // Touch events
  function handleTouchStart(e: React.TouchEvent) {
    onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
  }
  function handleTouchMove(e: React.TouchEvent) {
    e.preventDefault(); // prevent scroll while swiping
    onPointerMove(e.touches[0].clientX);
  }
  function handleTouchEnd() {
    onPointerUp();
  }

  // Mouse events
  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    onPointerDown(e.clientX, e.clientY);
  }
  function handleMouseMove(e: React.MouseEvent) {
    onPointerMove(e.clientX);
  }
  function handleMouseUp() {
    onPointerUp();
  }

  function handleClick() {
    // Only navigate if user didn't drag
    if (!didDrag.current) navigate("/field");
  }

  return (
    <div
      className="relative cursor-grab active:cursor-grabbing select-none"
      style={{ width: 380, height: 475 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); onPointerUp(); }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={isDragging ? handleMouseUp : undefined}
    >
      {/* Single photo with crossfade */}
      {PHOTOS.map((photo, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-700 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current
              ? `translateX(${isDragging ? dragOffset : 0}px) rotate(${isDragging ? dragOffset * 0.03 : 0}deg)`
              : "scale(1.05)",
            zIndex: i === current ? 10 : 5,
          }}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover"
            loading={i === current ? "eager" : "lazy"}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Photo label (only on active) */}
          {i === current && (
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white/90 text-sm font-medium tracking-wide uppercase">
                From the Field
              </p>
              <p className="text-white text-lg font-display font-bold mt-1 group-hover:text-accent transition-colors">
                {photo.alt}
              </p>
              <p className="text-white/60 text-xs mt-2 group-hover:text-white/80 transition-colors">
                Click to explore →
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrent(i);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-accent w-6"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
