import { useState } from "react";
import styles from "./OpenChallengeList.module.css";
import OpenChallenge from "./OpenChallenge";

interface IOpenChallenge {
    creator: string;
    creatorColor: 0 | 1;
    description: string;
    id: string;
}

const OpenChallengeList = () => {
    const [openChallenges, setOpenChallenges] = useState<IOpenChallenge[]>([
        {
            creator: "test1",
            creatorColor: 0,
            description: "testing white",
            id: "1",
        },
        {
            creator: "test1",
            creatorColor: 1,
            description: "testing black",
            id: "2",
        },
    ]);

    const openChallengeComponents: React.ReactNode[] = openChallenges.map(
        (challenge) => (
            <OpenChallenge
                creator={challenge.creator}
                creatorColor={challenge.creatorColor}
                description={challenge.description}
                key={challenge.id}
            />
        )
    );

    return (
        <div className={styles.listContainer}>{openChallengeComponents}</div>
    );
};

export default OpenChallengeList;
