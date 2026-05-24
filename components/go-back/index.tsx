'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ChevronLeft } from "lucide-react";

export const GoBackButton = ({ 
  text, 
  className = "",
  variant = "default"
}: { 
  text?: string, 
  className?: string,
  variant?: "default" | "minimal" | "highlight"
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // Variant styles
  const variants = {
    default: "py-3 gap-3",
    minimal: "py-2 gap-2",
    highlight: "py-3 gap-3 px-4 rounded-lg bg-accent/10 hover:bg-accent/20"
  };

  return (
    <button 
      className={`inline-flex items-center transition-all duration-300 group cursor-pointer ${variants[variant]} ${className}`}
      onClick={() => router.back()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={text || ""}
    >
      <div className={`transition-transform duration-300 ${isHovered ? '-translate-x-1' : ''}`}>
        {variant === "minimal" ? (
          <ChevronLeft size={20} className="text-foreground/70 group-hover:text-foreground transition-colors" />
        ) : (
          <ArrowLeft size={20} className="text-foreground/70 group-hover:text-foreground transition-colors" />
        )}
      </div>
      
      <span className="text-base font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300">
        {text || ''}
      </span>
    </button>
  );
};

