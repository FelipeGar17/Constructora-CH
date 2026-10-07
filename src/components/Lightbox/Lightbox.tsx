"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Lightbox.module.css";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goToNext, goToPrevious]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Cerrar galería"
        type="button"
      >
        <X size={24} />
      </button>

      <button
        className={styles.navButton}
        onClick={(e) => {
          e.stopPropagation();
          goToPrevious();
        }}
        aria-label="Imagen anterior"
        type="button"
      >
        <ChevronLeft size={28} />
      </button>

      <div className={styles.imageContainer} onClick={(e) => e.stopPropagation()}>
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className={styles.image}
          sizes="100vw"
          priority
        />
      </div>

      <button
        className={styles.navButton}
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        aria-label="Imagen siguiente"
        type="button"
        data-position="right"
      >
        <ChevronRight size={28} />
      </button>

      {images.length > 1 && (
        <div className={styles.counter} onClick={(e) => e.stopPropagation()}>
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
