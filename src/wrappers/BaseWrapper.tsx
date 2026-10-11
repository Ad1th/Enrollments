import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

// Fixed-height app shell (inner panels scroll) only on roomy desktop viewports;
// phones and tablets get natural page scroll so nothing is clipped.
const BaseWrapper = ({ children }: Props) => {
  return (
    <div className="w-full min-h-[100dvh] h-fit flex flex-col overflow-x-hidden font-arcade lg:[@media(min-height:700px)]:h-screen lg:[@media(min-height:700px)]:max-h-screen lg:[@media(min-height:700px)]:overflow-hidden">
      {children}
    </div>
  );
};

export default BaseWrapper;
