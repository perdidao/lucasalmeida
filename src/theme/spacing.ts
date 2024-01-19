import { toRem } from '@helpers/designSystem'

export const spacing: Record<string, string> = {
  nano: toRem(4),
  tiny: toRem(8),
  xxxs: toRem(12),
  xxs: toRem(16),
  xs: toRem(20),
  sm: toRem(24),
  md: toRem(32),
  lg: toRem(40),
  xl: toRem(48),
  xxl: toRem(64),
  xxxl: toRem(80),
  huge: toRem(120),
  giga: toRem(160),
}
