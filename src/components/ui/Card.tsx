import type { ElementType, ReactNode } from "react";

export function Card({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`rounded-card border border-line bg-white p-6 shadow-card ${className}`}>
      {children}
    </Tag>
  );
}
