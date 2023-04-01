import { useContext } from "react";
import MainPageForm from "../components/form/mainpage/MainPageForm";
import LoginToContinue from "../components/mainpage/LoginToContinue";
import OpenChallengeList from "../components/mainpage/open-challenge/OpenChallengeList";
import UserContext from "../store/user/user-context";

const Mainpage = () => {
    const { userId } = useContext(UserContext);

    if (!userId) return <LoginToContinue />;

    return (
        <>
            <MainPageForm />
            <OpenChallengeList />
        </>
    );
};

export default Mainpage;
