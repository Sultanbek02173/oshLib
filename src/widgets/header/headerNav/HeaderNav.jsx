import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./headerNav.scss";

const headerMenu = [
    { name: "about", path: "/about" },
    { name: "support", path: "/support" },
    { name: "news", path: "/news" },
    { name: "services", path: "/services" },
    { name: "catalog", path: "/catalog" },
    { name: "afisha", path: "/afisha" },
    { name: "professional", path: "/professional" },
    { name: "readers", path: "/reader" },
    { name: "electronic", path: "/electronic/all" },
    { name: "projects", path: "/project" }
];

const HeaderNav = ({ className, start = 0, end, onLinkClick }) => {
    const { t } = useTranslation();
    const menuItems = end ? headerMenu.slice(start, end) : headerMenu;

    return (
        <nav className={`headerNav ${className || ''}`}>
            {menuItems.map((page) => (
                <NavLink
                    key={page.name}
                    to={page.path}
                    className="headerNav_link"
                    onClick={onLinkClick}
                >
                    {t(page.name)}
                </NavLink>

            ))}
        </nav>
    );
};

export default HeaderNav;
