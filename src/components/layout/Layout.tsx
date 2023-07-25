import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { removeUserDataFromLocalStorage } from "../../helper/local-storage";
import GameContext from "../../store/game/game-context";
import { USER_ACTION_TYPE } from "../../store/user/types";
import UserContext from "../../store/user/user-context";
import WindowContext from "../../store/window/window-context";
import Aside from "./Aside";
import styles from "./Layout.module.css";
import Navbar from "./Navbar";

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    const { innerWidth } = useContext(WindowContext);
    const { userId, dispatch, socket, username } = useContext(UserContext);
    const { gameData } = useContext(GameContext);

    const [isAsideHidden, setIsAsideHidden] = useState(true);

    const navigate = useNavigate();

    const loginClickHandler = () => {
        navigate("/login");
    };

    const signupClickHandler = () => {
        navigate("/signup");
    };

    const logoutClickHandler = () => {
        socket.disconnect();
        dispatch({ type: USER_ACTION_TYPE.CLEAR_USER });
        removeUserDataFromLocalStorage();
    };

    const homeClickHandler = () => {
        navigate("");
    };
    const gameClickHandler = () => {
        navigate("/game");
    };

    const asideExpandClickHandler = () => {
        setIsAsideHidden((state) => !state);
    };

    let assideClassname = "";
    if (innerWidth <= 750) {
        assideClassname = isAsideHidden ? styles.hidden : styles.fixed;
    }

    return (
        <div className={styles.layout}>
            <nav>
                <Navbar
                    onLoginClick={loginClickHandler}
                    onSignupClick={signupClickHandler}
                    onLogoutClick={logoutClickHandler}
                    onExpandClick={asideExpandClickHandler}
                    isAsideHidden={innerWidth <= 750}
                    isLogin={userId !== ""}
                    name={username}
                />
            </nav>
            <div className={styles.body}>
                <aside className={assideClassname}>
                    <Aside
                        onHomeClick={homeClickHandler}
                        onGameClick={gameClickHandler}
                        isGameShown={gameData.roomId !== ""}
                    />
                </aside>
                {innerWidth <= 750 && !isAsideHidden && (
                    <div className={styles.asideFilter} />
                )}
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
