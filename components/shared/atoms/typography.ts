import styled, { css } from 'styled-components'

const font14 = css`
  font-size: 1rem;
  line-height: 1.36;
`

const font16 = css`
  font-size: 1.14rem;
  line-height: 1.38;
`

const font18 = css`
  font-size: 1.29rem;
  line-height: 1.39;
`

const font22 = css`
  font-size: 1.57rem;
  line-height: 1.36;
`

const font32 = css`
  font-size: 2.28rem;
  line-height: 1.38;
`

interface TypographyProps {
  font?: '32' | '22' | '18' | '16' | '14'
}

const Typography = styled.span<TypographyProps>`
  ${(props) => {
    switch (props.font) {
      default:
      case '14':
        return font14
      case '16':
        return font16
      case '18':
        return font18
      case '22':
        return font22
      case '32':
        return font32
    }
  }}
`

export { Typography as default, font32, font22, font18, font16, font14 }
export type { TypographyProps }
