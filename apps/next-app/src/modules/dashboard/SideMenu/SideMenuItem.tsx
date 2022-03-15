import React, { useState } from 'react';
import { ArrowLeft, ExpandMore } from '@mui/icons-material';
import { styled, Typography, TypographyProps } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
} from './StyledAccordions';
import { ISideMenuItem } from './types';

const HoverableText = styled(Typography)<
  TypographyProps & { active?: boolean }
>(({ theme, active }) => ({
  padding: 5,
  paddingLeft: 25,
  borderRadius: 5,
  cursor: 'pointer',
  backgroundColor: `${active && theme.palette.primary.light}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

interface SideMenuItemProps {
  menuItem: ISideMenuItem;
  activeAccordionKey?: string;
  activeAccordionItemKey?: string;
}

export const SideMenuItem: React.FC<SideMenuItemProps> = ({
  activeAccordionKey,
  activeAccordionItemKey,
  menuItem,
}) => {
  const key = Object.keys(menuItem)[0];
  const { title, href, subItems } = menuItem[key];

  const [open, setOpen] = useState(activeAccordionKey === key || !subItems);
  const router = useRouter();

  const onClick = () => {
    if (!subItems && href) {
      router.push(href);
    } else {
      setOpen(!open);
    }
  };

  return (
    <StyledAccordion disableGutters elevation={0} expanded={open}>
      <StyledAccordionSummary
        active={activeAccordionKey === key && !subItems}
        onClick={onClick}
        expandIcon={subItems?.length ? <ExpandMore /> : <ArrowLeft />}
      >
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        {subItems?.map((item) => {
          const sKey = Object.keys(item)[0];
          return (
            <Link key={sKey} passHref href={item[sKey].href}>
              <HoverableText active={activeAccordionItemKey === sKey}>
                {item[sKey].title}
              </HoverableText>
            </Link>
          );
        })}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};
