import React from 'react';

type LeftPanelProps = {
  children: React.ReactNode;
};

type RightPanelProps = LeftPanelProps & {};

export const LeftPanel: React.FC<LeftPanelProps> = ({ children }) => {
  return <>{children}</>;
};

export const RightPanel: React.FC<RightPanelProps> = ({ children }) => {
  return <>{children}</>;
};
