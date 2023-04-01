import { useContext, useRef, useState } from "react";
import { IChallengeData } from "../../../store/game/types";
import UserContext from "../../../store/user/user-context";
import FormLayout from "../FormLayout";

import styles from "./MainPageForm.module.css";

type IChallengeType = "Challenge User" | "Open Challenge";

const MainPageForm = () => {
    // Refs
    const usernameInputRef = useRef<HTMLInputElement>(null!);
    const emailInputRef = useRef<HTMLInputElement>(null!);

    // hooks
    const { username, email, socket } = useContext(UserContext);

    const [chosenWhite, setChosenWhite] = useState<boolean>(true);
    const [challengeType, setChallengeType] =
        useState<IChallengeType>("Challenge User");

    const usernameInputBlurHandler = () =>
        (emailInputRef.current.disabled = !!usernameInputRef.current.value);

    const emailInputBlurHandler = () =>
        (usernameInputRef.current.disabled = !!emailInputRef.current.value);

    const whiteButtonClasses = `${styles.colorSelectorButton} ${
        chosenWhite && styles.selectdColorSelectorButton
    }`;

    const blackButtonClasses = `${styles.colorSelectorButton} ${
        !chosenWhite && styles.selectdColorSelectorButton
    }`;

    const challengeUserSubmitHandler = () => {
        const to = emailInputRef.current.value + usernameInputRef.current.value;
        if (to == username || to == email) return;

        const data: IChallengeData = {
            black: !chosenWhite ? username : to,
            white: chosenWhite ? username : to,
            from: username,
            to,
        };

        socket.sendChallenge(data, (status: boolean) => console.log(status));
    };

    const openChallengeSubmitHandler = () => {};

    const submitFormHandler = () => {
        switch (challengeType) {
            case "Challenge User":
                challengeUserSubmitHandler();
            case "Open Challenge":
                openChallengeSubmitHandler();
        }
    };

    const challengeUserInputComponents = (
        <>
            <label>Username</label>
            <input
                type="text"
                placeholder="Username"
                ref={usernameInputRef}
                onBlur={usernameInputBlurHandler}
            />
            <label>Email</label>
            <input
                type="text"
                placeholder="Email"
                ref={emailInputRef}
                onBlur={emailInputBlurHandler}
            />
        </>
    );

    const openChallengeInputComponents = (
        <>
            <label>Description</label>
            <input type="text" placeholder="description" />
        </>
    );

    return (
        <FormLayout
            onSubmit={submitFormHandler}
            title={challengeType}
            control={
                <>
                    <label>Challenge Type</label>
                    <select
                        name="challenge type"
                        id="challenge type"
                        onChange={(e) =>
                            setChallengeType(e.target.value as IChallengeType)
                        }
                    >
                        <option value="Challenge User">Challenge User</option>
                        <option value="Open Challenge">Open Challenge</option>
                    </select>
                    {challengeType === "Challenge User" &&
                        challengeUserInputComponents}
                    {challengeType === "Open Challenge" &&
                        openChallengeInputComponents}
                    <label>Color</label>
                    <div className={styles.colorSelectorContainer}>
                        <button
                            className={whiteButtonClasses}
                            onClick={() => setChosenWhite(true)}
                            type="button"
                        >
                            White
                        </button>
                        <button
                            className={blackButtonClasses}
                            onClick={() => setChosenWhite(false)}
                            type="button"
                        >
                            Black
                        </button>
                    </div>
                </>
            }
            actions={
                <>
                    <button type="submit">Submit</button>
                </>
            }
            style={{
                width: "50%",
                margin: "32px auto",
            }}
        />
    );
};

export default MainPageForm;
