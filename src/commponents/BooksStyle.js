import styled from 'styled-components'

export const Container = styled.div`
  padding:40px 55px;
  background-image: url("https://i.ibb.co/p1N7b0L/bgJapan.jpg");
`

export const MainHeading = styled.h1`
  margin: 0 0 64px 0;
  font-size: 36px;
`

export const RecommendedHeading = styled.h2`
  margin: 0 0 36px 0;
  font-size: 24px;
`
export const YearHeading = styled.h2`
  margin: 0 0 16px 0;
  font-size: 20px;
`

export const Span = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
`

export const List = styled.ul`
  display: flex;
  gap: 20px;
  margin:0;
  padding:0;
  flex-wrap: wrap;
  height: 100%;
  list-style: none;
`

export const ListItem = styled.li`
  width: calc((100% - 60px) / 4);
  min-width: 380px;
  height: auto;
  border-radius: 10px;
  background-color: rgba(196, 196, 196, 0.7);
`

export const ListItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  height: 100%;
`

export const ListItemHeading = styled.h2`
  margin: 0 0 20px 0;
  max-width: 274px;
  font-size: 18px;
`

export const ListItemLink = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  margin-top: auto;
  padding: 10px;
  width: fit-content;
  border-radius: 10px;
  background-color: #1E1E1E;
  color: #E5E5E5;
  text-decoration: none;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #BF1D1D;
  }
`

export const LinkSpan = styled.span`
  display: block;
`

export const ButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`

export const Button = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  color: #1E1E1E;
  outline: 0;
  cursor: pointer;
  transition: scale 0.3s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    color: #BF1D1D;
    scale: 1.1;
  }
`

export const AddModalBtn = styled.button`
  padding: 22px 44px;
  border-radius: 10px;
  font-size: 18px;
  background-color: #BF1D1D;
  color: #E5E5E5;
  transition: background 0.3s ease-in-out;
  
  &:hover {
    background-color: #1E1E1E;
  }
`

export const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`

export const ModalContent = styled.div`
  padding: 20px;
  width: 430px;
  border-radius: 10px;
  background-color: #E5E5E5;
`

export const ModalHeading = styled.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
`

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const ModalLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
  font-size: 16px;

  &:last-child {
    margin-bottom: 36px;
  }
`

export const ModalInput = styled.input`
  padding: 0 20px;
  height: 40px;
  border-radius: 10px;
  font-size: 14px;
  background-color: #1E1E1E;
  color: #E5E5E5;
`

export const ModalSubmitBtn = styled.button`
  padding: 10px 26px;
  border-radius: 10px;
  background-color: #BF1D1D;
  color: #E5E5E5;
  transition: transform 0.3s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 2px 8px 0 rgba(30, 30, 30, 0.6);
  }
`

export const ModalCloseBtn = styled.button`
  padding: 10px 26px;
  border-radius: 10px;
  background-color: #1E1E1E;
  color: #E5E5E5;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #BF1D1D;
  }
`