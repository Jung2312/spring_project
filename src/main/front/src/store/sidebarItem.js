import * as React from "react";

export const SidebarItem = ({ text, iconSrc, isActive }) => {
    return (
        <div className={`store-sidebar-item ${isActive ? "store-active" : ""}`}>
            <span className="store-sidebar-item-text">{text}</span>
            <img
                loading="lazy"
                src={iconSrc}
                alt={`${text} 아이콘`}
                className="store-sidebar-item-icon"
            />
        </div>
    );
};

