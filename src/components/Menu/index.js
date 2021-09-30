import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Variables from "../StyleConstants"
import { motion } from "framer-motion"

const NavBarWrapper = styled.div`
  background-color: white;
  box-shadow: 0 -2px 5px grey;
  position: fixed;
  top: 0;
  width: 100%; /* Full width */
  box-sizing: border-box;
  z-index: 10;
`
const NavBar = styled.nav`
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
const MenuListWrapper = styled(motion.div)`
  padding: 0;
  grid-row: 2 / 3;
  grid-column: 1 / 7;
  margin: 0;
  justify-self: end;
  align-self: center;
`
const MenuList = styled.ul`
  margin: 0;
  li {
    padding-left: 2rem;
  }
  display: flex;
  flex-direction: column;
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
  font-size: 1.5rem;
`
const MenuItem = styled.li`
  font-family: ${Variables.font.sansSerif};
  list-style: none;
  text-align: center;
  padding: 0.65rem 0;
  /* border: 1px solid black; */
`

export default function Menu({ title }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    setIsOpen(!isOpen)
  }

  return (
    <NavBarWrapper>
      <NavBar>
        <HomeLink>
          <Link to="/">{title}</Link>
        </HomeLink>
        <MenuButton onClick={handleClick}>
          {isOpen ? <span>&#10539;</span> : <span>&#9776;</span>}
        </MenuButton>

        <MenuListWrapper
          initial={{ opacity: 0, x: 50, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            x: isOpen ? 0 : 50,
            height: isOpen ? 90 : 0,
          }}
          transition={{ type: "tween", duration: 0.25 }}
        >
          <MenuList>
            <MenuItem>
              <Link to="/writings">writings</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/">shop</Link>
            </MenuItem>
          </MenuList>
        </MenuListWrapper>
      </NavBar>
    </NavBarWrapper>
  )
}
