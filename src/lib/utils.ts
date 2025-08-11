import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import fs from 'fs';
import path from 'path';
import mime from 'mime';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isImageFile(fileName: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
  const fileExtension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
  return imageExtensions.includes(fileExtension);
}

export function checkImageByExtension(fileName: string) : boolean {
  return isImageFile(fileName);
}

export function checkImageByMimeType(filePath: string) : boolean {
  return isImageFile(filePath.split('/').pop() || '');
}