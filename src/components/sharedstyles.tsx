import styled, { keyframes } from "styled-components"

const Container = styled.div`
  padding: 0 0.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 100vh;
`
const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
  text-decoration: none;
`

const Description = styled.p`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #767676;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: ${spin} 0.6s linear infinite;
`
export const Input = styled.input`
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 3px rgba(0, 112, 243, 0.3);
  }
`

const FlexContainerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const FlexContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`
const Button = styled.button`
  cursor: pointer;
  padding: 1rem;
  font-size: 1.25rem;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 10px;
  background-color: #fff;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 100%;

  &:hover,
  :focus,
  :active {
    color: #0070f3;
    border-color: #0070f3;
  }
`

export { FlexContainerRow, Button, Main, Title, Description, Container, FlexContainerColumn }
