import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getHeader } from "../../../app/store/reducers/headerSlice";
import "./headerNav.scss";

const HeaderNav = ({ className, start = 0, end, onLinkClick }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHeader());
    }, [dispatch]);

    const header = useSelector((state) => state.header);
    const headerMenu = header.data
        ? [
            { name: "about", path: "/about", label: header.data.about_library },
        { name: "support", path: "/support", label: header.data.supports },
        { name: "news", path: "/news", label: header.data.news },
        { name: "services", path: "/services", label: header.data.services },
        { name: "catalog", path: "/catalog", label: header.data.catalog },
        { name: "afisha", path: "/afisha", label: header.data.afisha },
        { name: "professional", path: "/professional", label: header.data.pro_activity },
        { name: "readers", path: "/reader", label: header.data.page_for_readers },
        { name: "electronic", path: "/electronic", label: header.data.el_library },
        { name: "projects", path: "/project", label: header.data.projects },
        ]
        : [];

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
                    {t(page.label)}
                </NavLink>
            ))}
        </nav>
    );
};

export default HeaderNav;
