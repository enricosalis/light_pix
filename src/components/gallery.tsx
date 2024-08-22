"use client"

import Image from "next/image";
import path from 'path';
import Link from "next/link";
import { useState } from "react";
import { Carousel } from "./carousel";

export type ImageItem = {
  id: string;
  name: string;
  path: string;
  href: string;
  relativePath: string;
  isDirectory: boolean;
}

type GalleryProps = {
  images: Array<ImageItem>
}

export function Gallery({ images }: GalleryProps) {
  const [displayCarousel, setDisplayCarousel] = useState(false);

  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-4 gap-1">
          {images.map((image) => (
            <div className="relative aspect-square" key={image.id}>
              <Image
                src={path.join(image.relativePath, image.name)}
                fill={true}
                alt={image.name}
                style={{
                  objectFit: "cover"
                }}
                onClick={() => setDisplayCarousel(true)}
              ></Image>
            </div>
          ))}
        </div>
      </div>
      <Carousel slides={images} display={displayCarousel} closeFn={() => setDisplayCarousel(false)} />
    </>
  );
}