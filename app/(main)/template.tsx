import type { ReactNode } from "react";

export default function PageTemplate({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Fixed curtain that fades away on navigation — page content is always opacity: 1 */}
      <div className="page-curtain" aria-hidden="true" />
      {children}
    </>
  );
}
