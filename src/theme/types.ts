export interface ThemeColorsProps {
  primary: string
  white: string
  black: string
  brand: Record<string, string>
  shadow: Record<string, string>
  background: Record<string, string>
  border: Record<string, string>
  content: Record<string, string>
  feedback: Record<string, string>
}

export type PrimitiveThemeColors = 'primary' | 'white' | 'black'
export type DeepThemeColors =
  | 'brand'
  | 'shadow'
  | 'background'
  | 'border'
  | 'content'
  | 'feedback'

export interface ThemeFontsProps {
  primary: string
  secondary: string
  weight: Record<string, string>
  size: Record<string, string>
  height: Record<string, string>
  spacing: Record<string, string>
}

export interface ThemeProps {
  colors: ThemeColorsProps
  fonts: ThemeFontsProps
  spacing: Record<string, string>
  animation: Record<string, string>
}

export type Size =
  | 'nano'
  | 'tiny'
  | 'xxxs'
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | 'huge'
  | 'giga'

export type FontSize =
  | 'xxxs'
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl'

export type LineHeight =
  | 'xxxs'
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl'

export type FontSpacing = 'xxxs' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type TextTransform = 'capitalize' | 'uppercase' | 'lowercase'

export type FontFamily = 'primary' | 'secondary'

export type FontWeight = 'normal' | 'medium' | 'semibold'

export type FontPresetSize = 'sm' | 'md' | 'lg'

export type MediaSize = 'mobile' | 'tablet' | 'desktop'

export interface ThemeOptions {
  [key: string]: Record<string, unknown>
}

export interface FontProps {
  family?: string
  weight?: FontWeight
  size?: FontSize
  height?: LineHeight
  spacing?: FontSpacing
  transform?: TextTransform
}
