type valueofvariantandutility = string | Array<string>;

const tailwindPrefix = [
  "hover",
  "focus",
  "focus-within",
  "focus-visible",
  "active",
  "visited",
  "target",
  "*",
  "**",
  "inert",
  "first",
  "last",
  "only",
  "odd",
  "even",
  "first-of-type",
  "last-of-type",
  "only-of-type",
  "empty",
  "disabled",
  "enabled",
  "checked",
  "indeterminate",
  "default",
  "optional",
  "required",
  "valid",
  "invalid",
  "user-valid",
  "user-invalid",
  "in-range",
  "out-of-range",
  "placeholder-shown",
  "details-content",
  "autofill",
  "read-only",
  "before",
  "after",
  "first-letter",
  "first-line",
  "marker",
  "selection",
  "file",
  "backdrop",
  "placeholder",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "max-sm",
  "max-md",
  "max-lg",
  "max-xl",
  "max-2xl",
  "@3xs",
  "@2xs",
  "@xs",
  "@sm",
  "@md",
  "@lg",
  "@xl",
  "@2xl",
  "@3xl",
  "@4xl",
  "@5xl",
  "@6xl",
  "@7xl",
  "@max-3xs",
  "@max-2xs",
  "@max-xs",
  "@max-sm",
  "@max-md",
  "@max-lg",
  "@max-xl",
  "@max-2xl",
  "@max-3xl",
  "@max-4xl",
  "@max-5xl",
  "@max-6xl",
  "@max-7xl",
  "dark",
  "motion-safe",
  "motion-reduce",
  "contrast-more",
  "contrast-less",
  "forced-colors",
  "inverted-colors",
  "pointer-fine",
  "pointer-coarse",
  "pointer-none",
  "any-pointer-fine",
  "any-pointer-coarse",
  "any-pointer-none",
  "portrait",
  "landscape",
  "noscpae",
  "print",
  "aria-busy",
  "aria-checked",
  "aria-disabled",
  "aria-expanded",
  "aria-hidden",
  "aria-pressed",
  "aria-readonly",
  "aria-required",
  "aria-selected",
  "rtl",
  "ltr",
  "open",
  "starting"];

const tailwindPrefixSet = new Set(tailwindPrefix);

export interface BabelType {
  hover?: string | BabelType;
  focus?: string | BabelType;
  "focus-within"?: string | BabelType;
  "focus-visible"?: string | BabelType;
  active?: string | BabelType;
  visited?: string | BabelType;
  target?: string | BabelType;
  "*"?: string | BabelType;
  "**"?: string | BabelType;
  inert?: string | BabelType;
  first?: string | BabelType;
  last?: string | BabelType;
  only?: string | BabelType;
  odd?: string | BabelType;
  even?: string | BabelType;
  "first-of-type"?: string | BabelType;
  "last-of-type"?: string | BabelType;
  "only-of-type"?: string | BabelType;
  empty?: string | BabelType;
  disabled?: string | BabelType;
  enabled?: string | BabelType;
  checked?: string | BabelType;
  indeterminate?: string | BabelType;
  default?: string | BabelType;
  optional?: string | BabelType;
  required?: string | BabelType;
  valid?: string | BabelType;
  invalid?: string | BabelType;
  "user-valid"?: string | BabelType;
  "user-invalid"?: string | BabelType;
  "in-range"?: string | BabelType;
  "out-of-range"?: string | BabelType;
  "placeholder-shown"?: string | BabelType;
  "details-content"?: string | BabelType;
  autofill?: string | BabelType;
  "read-only"?: string | BabelType;
  before?: string | BabelType;
  after?: string | BabelType;
  "first-letter"?: string | BabelType;
  "first-line"?: string | BabelType;
  marker?: string | BabelType;
  selection?: string | BabelType;
  file?: string | BabelType;
  backdrop?: string | BabelType;
  placeholder?: string | BabelType;
  sm?: string | BabelType;
  md?: string | BabelType;
  lg?: string | BabelType;
  xl?: string | BabelType;
  "2xl"?: string | BabelType;
  "max-sm"?: string | BabelType;
  "max-md"?: string | BabelType;
  "max-lg"?: string | BabelType;
  "max-xl"?: string | BabelType;
  "max-2xl"?: string | BabelType;
  "@3xs"?: string | BabelType;
  "@2xs"?: string | BabelType;
  "@xs"?: string | BabelType;
  "@sm"?: string | BabelType;
  "@md"?: string | BabelType;
  "@lg"?: string | BabelType;
  "@xl"?: string | BabelType;
  "@2xl"?: string | BabelType;
  "@3xl"?: string | BabelType;
  "@4xl"?: string | BabelType;
  "@5xl"?: string | BabelType;
  "@6xl"?: string | BabelType;
  "@7xl"?: string | BabelType;
  "@max-3xs"?: string | BabelType;
  "@max-2xs"?: string | BabelType;
  "@max-xs"?: string | BabelType;
  "@max-sm"?: string | BabelType;
  "@max-md"?: string | BabelType;
  "@max-lg"?: string | BabelType;
  "@max-xl"?: string | BabelType;
  "@max-2xl"?: string | BabelType;
  "@max-3xl"?: string | BabelType;
  "@max-4xl"?: string | BabelType;
  "@max-5xl"?: string | BabelType;
  "@max-6xl"?: string | BabelType;
  "@max-7xl"?: string | BabelType;
  dark?: string | BabelType;
  "motion-safe"?: string | BabelType;
  "motion-reduce"?: string | BabelType;
  "contrast-more"?: string | BabelType;
  "contrast-less"?: string | BabelType;
  "forced-colors"?: string | BabelType;
  "inverted-colors"?: string | BabelType;
  "pointer-fine"?: string | BabelType;
  "pointer-coarse"?: string | BabelType;
  "pointer-none"?: string | BabelType;
  "any-pointer-fine"?: string | BabelType;
  "any-pointer-coarse"?: string | BabelType;
  "any-pointer-none"?: string | BabelType;
  "portrait"?: string | BabelType;
  "landscape"?: string | BabelType;
  "noscpae"?: string | BabelType;
  "print"?: string | BabelType;
  "aria-busy"?: string | BabelType;
  "aria-checked"?: string | BabelType;
  "aria-disabled"?: string | BabelType;
  "aria-expanded"?: string | BabelType;
  "aria-hidden"?: string | BabelType;
  "aria-pressed"?: string | BabelType;
  "aria-readonly"?: string | BabelType;
  "aria-required"?: string | BabelType;
  "aria-selected"?: string | BabelType;
  rtl?: string | BabelType;
  ltr?: string | BabelType;
  open?: string | BabelType;
  starting?: string | BabelType;
  [customVariant: string]: string | BabelType | undefined;
}