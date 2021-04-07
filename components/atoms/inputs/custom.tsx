import VisuallyHidden from 'components/atoms/accessibility'
import { InputHTMLAttributes } from 'react'
import { useUID } from 'react-uid'

const CustomInput = ({
  id,
  children,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  const uid = id && useUID()
  return (
    <>
      <input />
      <VisuallyHidden as="input" id={uid} {...rest} />
      <label htmlFor={uid} className={className}>
        {children}
      </label>
    </>
  )
}

export default CustomInput
