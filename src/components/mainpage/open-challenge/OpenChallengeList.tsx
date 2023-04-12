import { useContext, useEffect, useState } from "react";
import styles from "./OpenChallengeList.module.css";
import OpenChallenge from "./OpenChallenge";
import { getOpenChallenges } from "../../../api/challenge/getChallenges";
import UserContext from "../../../store/user/user-context";
import {
    IGameData,
    IOpenChallenge,
    startGameState,
} from "../../../store/game/types";

const OpenChallengeList = () => {
    // hooks
    const { username, token, socket } = useContext(UserContext);

    const [openChallenges, setOpenChallenges] = useState<IOpenChallenge[]>([]);

    useEffect(() => {
        getOpenChallenges(token).then((challenges) =>
            setOpenChallenges(challenges)
        );
    }, []);

    if (openChallenges.length == 0) {
        return <h2 style={{ textAlign: "center" }}>No Challenges Present</h2>;
    }

    const openChallengeAcceptHandler = (
        creator: string,
        creatorColor: 0 | 1,
        id: string
    ) => {
        console.log({ creatorColor, creator });

        const data: IGameData = {
            black: creatorColor === 1 ? creator : username,
            white: creatorColor === 0 ? creator : username,
            from: creator,
            to: username,
            boardState: startGameState,
        };

        socket.obj.emit(
            "open-challenge-accepted",
            { gameData: data, id },
            (status: boolean) => {
                if (!status) {
                    console.log("could not accept challenge");
                }
            }
        );
    };

    const openChallengeComponents: React.ReactNode[] = openChallenges.map(
        (challenge) => (
            <OpenChallenge
                creator={challenge.creator}
                creatorColor={challenge.creatorColor}
                description={challenge.description}
                key={challenge.id}
                onAccept={() =>
                    openChallengeAcceptHandler(
                        challenge.creator,
                        challenge.creatorColor,
                        challenge.id
                    )
                }
            />
        )
    );

    return (
        <div className={styles.listContainer}>{openChallengeComponents}</div>
    );
};

export default OpenChallengeList;
