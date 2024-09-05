import { useEffect, useRef } from "react";

export default function AwayListener({
  onClickAway,
  open,
  children,
  sx,
}: {
  onClickAway: () => void;
  open: boolean;
  children: JSX.Element | JSX.Element[];
  sx?: string;
}) {
  const mainDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        mainDivRef.current &&
        !(
          event.target instanceof Node &&
          mainDivRef.current.contains(event.target)
        )
      ) {
        onClickAway();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClickAway();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClickAway]);
  return (
    <section className={sx} ref={mainDivRef}>
      {children}
    </section>
  );
}
