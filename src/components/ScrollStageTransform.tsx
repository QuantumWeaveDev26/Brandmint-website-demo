import React from 'react';

/** Keep section wrappers stable: content remains readable during fast scrolling and reduced motion. */
export const ScrollStageTransform: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full">{children}</div>
);
