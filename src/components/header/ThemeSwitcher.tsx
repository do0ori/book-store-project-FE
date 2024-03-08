import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import styled from "styled-components";

function ThemeSwitcher() {
    const { themeName, toggleTheme } = useContext(ThemeContext)

    return (
        <ThemeSwitcherStyle onClick={toggleTheme}>{
            themeName === "light"
                ? <div className="theme-icon"><FaMoon /><span>Dark</span></div>
                : <div className="theme-icon"><FaSun /><span>Light</span></div>
        }</ThemeSwitcherStyle>
    );
}

const ThemeSwitcherStyle = styled.button`
    .theme-icon {
        svg {
            width: 15px;
            height: 15px;
            fill: ${({ theme }) => theme.color.text};
        }
    }
`;

export default ThemeSwitcher;