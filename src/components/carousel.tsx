"use client"

import Image from "next/image";
import path from 'path';
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ImageItem } from "./gallery";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CarouselThumbs } from "./carousel_thumbs";

// export type ImageItem = {
//   id: string;
//   name: string;
//   path: string;
//   href: string;
//   relativePath: string;
//   isDirectory: boolean;
// }

type CarouselProps = {
  slides: Array<ImageItem>;
  display: boolean;
  closeFn: () => void;
}

export function Carousel({ slides, display, closeFn }: CarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({loop: false});
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi?.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi?.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div 
      className={`
        overflow-hidden absolute z-40 left-0 top-0 flex flex-col
        w-dvw h-dvh bg-background p-4 ${display ? "" : "hidden"}
      `}
    >
      <div 
        className="overflow-hidden w-full grow"
        ref={emblaMainRef}
      >
        <div className="flex h-full">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0">
              <div className="relative h-full">
                <Image
                  src={path.join(slide.relativePath, slide.name)}
                  fill={true}
                  alt={slide.name}
                  style={{
                    objectFit: "contain"
                  }}
                ></Image>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-12 md:h-20 w-full">
        <div className="overflow-hidden w-full h-full" ref={emblaThumbsRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <CarouselThumbs
                key={slide.id}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                slide={slide}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={`absolute z-50 right-4 top-4 ${display ? "" : "hidden"}`}>
        <Button variant="ghost" size="icon" onClick={closeFn}>
          <X className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
        </Button>
      </div>
    </div>
  );
}