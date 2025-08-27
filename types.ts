import { StaticImageData } from 'next/image';
import type React from 'react';

export interface Certificate {
  id: number;
  company: string;
  title: string;
  logo: string | StaticImageData; // Changed from React.FC<React.SVGProps<SVGSVGElement>>
  imageUrl: string;
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
}
