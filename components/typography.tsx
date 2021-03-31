import styled, { css } from 'styled-components'

const font14 = css`
  font-weight: normal;
  font-size: 1rem;
  line-height: 1.36;
  letter-spacing: 0.015em;
`

const font16 = css`
  font-weight: bold;
  font-size: 1.14rem;
  line-height: 1.38;
`

const font18 = css`
  font-weight: normal;
  font-size: 1.29rem;
  line-height: 1.39;
  letter-spacing: 0.015em;
`

const font22 = css`
  font-weight: bold;
  font-size: 1.57rem;
  line-height: 1.36;
  letter-spacing: 0.01em;
`

const font32 = css`
  font-weight: normal;
  font-size: 2.28rem;
  line-height: 1.38;
  letter-spacing: 0.01em;
`

interface TextProps {
  font?: '22' | '18' | '16' | '14'
}

const Text = styled.span<TextProps>`
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
    }
  }}
`

interface HeadingProps {
  font?: '32' | '22'
}

const Heading = styled.h1<HeadingProps>`
  ${(props) => {
    switch (props.font) {
      case '22':
        return font22
      default:
      case '32':
        return font32
    }
  }}
`

export { Heading, Text, font32, font22, font18, font16, font14 }
export type { HeadingProps, TextProps }
