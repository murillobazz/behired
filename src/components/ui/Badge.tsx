import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentProps<"span"> & {
  color?: string;
};

export const Badge = ({ className, color, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
        className,
      )}
      style={{ backgroundColor: color ? `${color}1A` : undefined, color }}
      {...props}
    />
  );
};
