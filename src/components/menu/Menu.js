import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Variables from "../StyleConstants"

const MenuBarWrapper = styled.div`
  background-color: white;
  box-shadow: 0 -2px 5px grey;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  box-sizing: border-box;
  z-index: 10;
`
const MenuBar = styled.nav`
  display: grid;
  padding: 0 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 60px auto;
  max-width: 1280px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 0 2rem;
  }

  a,
  span {
    text-decoration: none;
    color: ${Variables.color.lightGrey};
  }
`
const MenuListWrapper = styled.div`
  padding: 0;
  grid-row: 2 / 3;
  grid-column: 1 / 7;
  display: ${props => (props.display ? "block" : "none")};
  margin: 0;
  justify-self: end;
  align-self: center;

  @media (min-width: 768px) {
    grid-row: 1 / 2;
    grid-column: 6 / 7;
    display: block;
  }
`
const MenuList = styled.ul`
  margin: 0;
  li {
    padding-left: 2rem;
  }
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }
`
const HomeLink = styled.h1`
  grid-row: 1 / 2;
  grid-column: 1 / 5;
  margin: 0;
  align-self: center;
  justify-self: start;
`
const MenuButton = styled.span`
  grid-column: 6 / 7;
  grid-row: 1 / 2;
  align-self: center;
  justify-self: end;

  /* border: 1px solid blue; */
  @media (min-width: 768px) {
    display: none;
  }
`
const MenuItem = styled.li`
  font-family: ${Variables.font.sansSerif};
  list-style: none;
  text-align: center;
  padding: 0.65rem 0;
  /* border: 1px solid black; */
`

export default function Menu({ location, title }) {
  const [isOpen, setIsOpen] = useState(false)
  function handleClick() {
    setIsOpen(!isOpen)
  }

  return (
    <MenuBarWrapper>
      <MenuBar>
        <HomeLink>
          <Link to="/">{title}</Link>
        </HomeLink>
        <MenuButton onClick={handleClick}>
          {isOpen ? <span>&#10539;</span> : <span>&#9776;</span>}
        </MenuButton>
        <MenuListWrapper display={isOpen}>
          <MenuList>
            <MenuItem>
              <Link to="/">writings</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/">shop</Link>
            </MenuItem>
          </MenuList>
        </MenuListWrapper>
      </MenuBar>
    </MenuBarWrapper>
  )
}
