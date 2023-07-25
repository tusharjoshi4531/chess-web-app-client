import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { removeUserDataFromLocalStorage } from "../../helper/local-storage";
import { USER_ACTION_TYPE } from "../../store/user/types";
import UserContext from "../../store/user/user-context";
import WindowContext from "../../store/window/window-context";
import styles from "./Navbar.module.css";

interface INavbarProps {
    onLoginClick: () => void;
    onSignupClick: () => void;
    onLogoutClick: () => void;
    onExpandClick: () => void;
    isAsideHidden: boolean;
    isLogin: boolean;
    name?: string;
}

const Navbar: React.FC<INavbarProps> = ({
    onLoginClick,
    onSignupClick,
    onLogoutClick,
    onExpandClick,
    isAsideHidden,
    isLogin,
    name = "",
}) => {

    return (
        <div className={styles.navbar}>
            {isAsideHidden && (
                <button className={styles.menuButton} onClick={onExpandClick} />
            )}
            <div className={styles.userName}>{name}</div>
            {!isLogin && (
                <>
                    <button onClick={onLoginClick}>login</button>
                    <button onClick={onSignupClick}>signup</button>
                </>
            )}
            {isLogin && <button onClick={onLogoutClick}>logout</button>}
        </div>
    );
};

export default Navbar;
