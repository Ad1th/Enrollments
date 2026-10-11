import { ReactNode } from "react";
import "./BoundingBox.css";

interface Props {
  children: ReactNode;
  className?: string;
}

const BoundingBox = ({ children, className = "" }: Props) => {
  return (
  <div className={`flex-1 w-full max-w-none min-h-[calc(100dvh-2rem)] h-full mx-auto border-2 md:border-2 border-prime p-3 sm:p-6 md:p-8 relative border-dashed border-spacing-4 md:border-spacing-8 overflow-hidden sm:border-t-0 flex bg-black ${className}`}>
      <div className="pointer-events-none w-full h-full absolute top-0 left-0 border-2 border-prime blur-lg"></div>
      <div className="flex-grow min-w-0">{children}</div>
    </div>
  );
};

export default BoundingBox;
