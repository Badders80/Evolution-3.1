import type { ComponentProps } from 'react';
import FixedBg from "./FixedBg";

type GrassBgProps = {
  src: string;
  height?: ComponentProps<typeof FixedBg>['height'];
  className?: string;
};

export function GrassBg({
  src,
  height = 'h-[50vh]',
  className = '',
}: GrassBgProps) {
  return (
    <div className={`relative group overflow-hidden ${className}`}>
      <FixedBg
        src={src}
        height={height}
      />
    </div>
  );
}

export default GrassBg;
