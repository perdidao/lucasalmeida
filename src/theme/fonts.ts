import { toRem } from '@helpers/designSystem'
import { ThemeFontsProps } from './types'

export const fonts: ThemeFontsProps = {
  primary: '"Sora", sans-serif',
  secondary: '"Archivo", sans-serif',

  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
  },

  size: {
    xxxs: toRem(13),
    xxs: toRem(15),
    xs: toRem(16),
    sm: toRem(20),
    md: toRem(24),
    lg: toRem(32),
    xl: toRem(40),
    xxl: toRem(48),
    xxxl: toRem(56),
  },

  height: {
    xxxs: toRem(16),
    xxs: toRem(20),
    xs: toRem(24),
    sm: toRem(28),
    md: toRem(32),
    lg: toRem(40),
    xl: toRem(44),
    xxl: toRem(52),
    xxxl: toRem(60),
  },

  spacing: {
    xxxs: '-0.96px',
    xxs: '-0.64px',
    xs: '-0.32px',
    sm: '0.16px',
    md: '0.24px',
    lg: '0.32px',
    xl: '0.40px',
  },
}
