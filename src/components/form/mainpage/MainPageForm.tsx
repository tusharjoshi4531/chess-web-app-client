import { useContext, useRef, useState } from "react";
import { createOpenChallenge } from "../../../api/challenge/createChallenge";
import { IChallengeData } from "../../../store/game/types";
import UserContext from "../../../store/user/user-context";
import FormLayout from "../FormLayout";

import styles from "./MainPageForm.module.css";

type IChallengeType = "Challenge User" | "Open Challenge";

const MainPageForm = () => {
    // Refs
    const usernameInputRef = useRef<HTMLInputElement>(null!);
    const emailInputRef = useRef<HTMLInputElement>(null!);
    const descriptionInputRef = useRef<HTMLInputElement>(null!);
    const validityDurationMinutesInputRef = useRef<HTMLInputElement>(null!);
    const validityDurationSecondsInputRef = useRef<HTMLInputElement>(null!);

    // hooks
    const { username, email, socket, token } = useContext(UserContext);

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

    const getTimeInMs = (minutes: number, seconds: number): number => {
        if (minutes < 0 || seconds < 0 || (minutes === 0 && seconds === 0))
            return NaN;
        else return Date.now() + 1000 * (60 * minutes + seconds);
    };

    const openChallengeSubmitHandler = () => {
        const description = descriptionInputRef.current.value;

        const validityTime = getTimeInMs(
            Number(validityDurationMinutesInputRef.current.value),
            Number(validityDurationMinutesInputRef.current.value)
        );

        const color = chosenWhite ? 0 : 1;

        if (isNaN(validityTime)) return;

        console.log({ description, validityTime, color });
        createOpenChallenge(color, description, validityTime, token);
    };

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
            <input
                type="text"
                placeholder="description"
                ref={descriptionInputRef}
            />
            <label>Validity Duration</label>
            <div className={styles.inputGroup}>
                <input
                    type="number"
                    placeholder="Minutes"
                    ref={validityDurationMinutesInputRef}
                />
                <input
                    type="number"
                    placeholder="Seconds"
                    ref={validityDurationSecondsInputRef}
                />
            </div>
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
