import { ChangeEvent } from "react"
import styled from "styled-components"

type SelectProps = {
  value: string
  onChange: (value: string) => void
  options: string[]
}

const StyledSelect = styled.select`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  color: #333;
  background-color: #fff;
  appearance: none;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #0077ff;
  }
`

const Option = styled.option`
  font-size: 1rem;
  color: #333;
`

export const Select = ({ value, onChange, options }: SelectProps) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }

  return (
    <StyledSelect value={value} onChange={handleSelectChange}>
      {options.map((key) => (
        <Option key={key} value={key}>
          {key}
        </Option>
      ))}
    </StyledSelect>
  )
}
