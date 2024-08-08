import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Variables from "../StyleConstants"
import { motion } from "framer-motion"

const Wrapper = styled(motion.header)`
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
  grid-template-rows: ${Variables.menu.height} auto;
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
const HomeLink = styled(Link)`
  grid-row: 1 / 2;
  grid-column: 1 / 5;
  place-self: center start;
  h1 {
    padding: 0;
    margin: 0;
  }
`
const MenuButton = styled.button`
  grid-column: 6 / 7;
  grid-row: 1 / 2;
  justify-self: end;
  height: ${Variables.menu.height};
  width: ${Variables.menu.height};
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: transparent;
  cursor: pointer;
  .hamburger {
    font-size: 2rem;
    line-height: 0;
  }
  .cross {
    font-size: 3rem;
    line-height: 0;
  }
  .hamburger,
  .cross {
    text-align: right;
  }

  :hover {
    color: black;
  }
`
const MenuItem = styled.li`
  font-family: ${Variables.font.sansSerif};
  list-style: none;
  text-align: center;
  padding: 0.65rem 0;
  font-size: 1.3rem;
  /* border: 1px solid black; */
`

const menuData = [
  { label: "writings", destination: "/writings" },
  // { label: "shop", destination: "/shop" },
]

export default function Menu({ title }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    setIsOpen(!isOpen)
  }

  const menuHeight = 60 * menuData.length

  return (
    <Wrapper>
      <NavBar>
        <HomeLink to="/">
          <span>{title}</span>
        </HomeLink>
        <MenuButton onClick={handleClick}>
          {isOpen ? (
            <span className="cross">&#215;</span>
          ) : (
            <span className="hamburger">&#9776;</span>
          )}
        </MenuButton>

        <MenuListWrapper
          initial={{ opacity: 0, x: 200, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            x: isOpen ? 0 : 200,
            height: isOpen ? menuHeight : 0,
          }}
          transition={{ type: "tween", duration: 0.25 }}
        >
          <MenuList>
            {menuData.map((item, index) => (
              <MenuItem key={index}>
                <Link to={item.destination}>{item.label}</Link>
              </MenuItem>
            ))}
          </MenuList>
        </MenuListWrapper>
      </NavBar>
    </Wrapper>
  )
}
