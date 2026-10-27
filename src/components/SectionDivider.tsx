import React from "react";

interface SectionDividerProps {
  className?: string;
  id?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ className = "", id }) => {
  return (
    <div
      id={id}
      aria-hidden="true"
      className={`w-full max-w-full overflow-hidden pointer-events-none block ${className}`}
      style={{ height: "1px", minHeight: "1px" }}
    >
      <div className="section-divider-bar is-revealed" />
    </div>
  );
};

export default React.memo(SectionDivider);

