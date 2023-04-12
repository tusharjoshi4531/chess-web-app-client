import axios from "axios";
import { ICreateChallengeRequestBody } from "../../store/game/types";
import { SERVER_URL } from "../Util";

export const createOpenChallenge = async (
    creatorColor: 0 | 1,
    description: string,
    validityTime: number,
    token: string
): Promise<boolean> => {
    try {
        await axios.post<ICreateChallengeRequestBody>(
            `${SERVER_URL}/challenge/open`,
            { creatorColor, description, validityTime },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
