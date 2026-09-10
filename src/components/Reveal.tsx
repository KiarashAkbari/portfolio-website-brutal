import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  clip?: boolean;
  as?: "div" | "span" | "li";
};

export default function Reveal({
  children,
  className,
  delay = 0,
  clip = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("on");
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ "--rvd": `${delay}ms` } as CSSProperties}
      className={cn("rv", clip && "rv-clip", className)}
    >
      {children}
    </div>
  );
}
