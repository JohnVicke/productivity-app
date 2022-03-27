export type IMiddlePanelSection = {
  title: string;
  body: string;
  content: React.ReactNode;
};

export type IPageInformation = Omit<IMiddlePanelSection, 'content'>;
