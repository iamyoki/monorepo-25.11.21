import type { ReactElement, ReactNode } from "react";

export function MyButton({
  children,
  onClick,
}: {
  children: ReactNode | ReactElement | string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <button style={{ fontSize: 30 }} onClick={onClick}>
      My Button: {children}
    </button>
  );
}
