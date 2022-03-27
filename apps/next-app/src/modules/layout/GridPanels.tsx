import React from 'react';

type LeftPanelProps = {
  children: React.ReactNode;
};

type RightPanelProps = LeftPanelProps & {};

export const LeftPanel: React.FC<LeftPanelProps> = ({ children }) => (
  <h1>{children}</h1>
);

export const RightPanel: React.FC<RightPanelProps> = ({ children }) => (
  <h1>{children}</h1>
);
