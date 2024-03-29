import { useContext } from "react";
import { useNavigate } from "react-router";
import GameContext from "../../store/game/game-context";
import styles from "./Aside.module.css";

interface IAsideProps {
    isGameShown: boolean;
    onHomeClick: () => void;
    onGameClick: () => void;
}

const Aside: React.FC<IAsideProps> = ({
    isGameShown,
    onGameClick,
    onHomeClick,
}) => {
    return (
        <div className={styles.Aside}>
            <button onClick={onHomeClick}>home</button>
            {isGameShown && <button onClick={onGameClick}>game</button>}
        </div>
    );
};

export default Aside;
