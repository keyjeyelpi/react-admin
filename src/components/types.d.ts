import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { SxProps, Theme, TypographyProps } from '@mui/material';

export type { SxProps, Theme, TypographyProps };

export type BlurredContainerProps = { children: ReactNode; sx?: SxProps };

export type LogoProps = {
  withText?: boolean;
  logoContainerSize?: number;
  logoSize?: number;
  textSize?: number;
};

export type Particle = {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
};

export type TabsProps = {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

export type TypingProps = TypographyProps & {
  text:
    | string
    | {
        xs?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
      };
  delay?: number;
  spacing?: number;
};
