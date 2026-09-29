const dimensions: Record<string, { width: number; height: number }> = {
  "/images/church/home-hero.jpg": { width: 1435, height: 957 },
  "/images/church/church-01.jpg": { width: 1024, height: 464 },
  "/images/church/church-02.jpg": { width: 1024, height: 1065 },
  "/images/church/church-03.jpg": { width: 1024, height: 1061 },
  "/images/church/church-04.jpg": { width: 1023, height: 537 },
  "/images/church/church-05.jpg": { width: 1024, height: 754 },
  "/images/church/church-06.png": { width: 1024, height: 315 },
  "/images/church/walls-fund-flyer.jpg": { width: 801, height: 1600 },
};

const fallback = { width: 1024, height: 768 };

export function getDimensions(src: string) {
  return dimensions[src] ?? fallback;
}
