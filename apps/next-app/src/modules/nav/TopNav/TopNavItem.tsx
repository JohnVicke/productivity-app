import { SvgIconComponent, ArrowDropDown } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface TopNavItemProps {
  href: string;
  title: string;
  IconComponent: SvgIconComponent;
  dropdown?: boolean;
  displayText?: boolean;
}

const iconStyle = { m: 1, color: '#fff', opacity: 0.6 };

export const TopNavItem: React.FC<TopNavItemProps> = ({
  title,
  href,
  IconComponent,
  dropdown,
  displayText,
}) => (
  <Link href={href} passHref>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ cursor: 'pointer' }}
    >
      <IconComponent fontSize="small" sx={iconStyle} />
      {displayText && <Typography>{title}</Typography>}
      {dropdown && displayText && (
        <ArrowDropDown fontSize="small" sx={iconStyle} />
      )}
    </Box>
  </Link>
);
