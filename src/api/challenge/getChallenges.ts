import axios from "axios";
import { IOpenChallenge } from "../../store/game/types";
import { SERVER_URL } from "../Util";

export const getOpenChallenges = async (
    token: string
): Promise<IOpenChallenge[]> => {
    try {
        const response = await axios.get<IOpenChallenge[]>(
            `${SERVER_URL}/challenge/open`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
