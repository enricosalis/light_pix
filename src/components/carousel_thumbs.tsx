"use client"

import React from "react";
import Image from "next/image";
import { ImageItem } from "./gallery";
import path from 'path';

type CarouselThumbsProps = {
  selected: boolean;
  slide: ImageItem;
  onClick: () => void;
}

export function CarouselThumbs({ selected, slide, onClick }: CarouselThumbsProps) {
  return (
    <div className="flex-[0_0_48px] md:flex-[0_0_80px] min-w-0 pl-1">
      <div className="relative aspect-square">
        <Image
          src={path.join(slide.relativePath, slide.name)}
          fill={true}
          alt={slide.name}
          style={{
            objectFit: "cover"
          }}
          onClick={onClick}
        />
      </div>
    </div>
  );
}