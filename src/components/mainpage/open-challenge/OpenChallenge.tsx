import FormLayout from "../../form/FormLayout";

interface IOpenChallengeProps {
    creator: string;
    creatorColor: 0 | 1;
    description: string;
}

const OpenChallenge: React.FC<IOpenChallengeProps> = ({
    creator,
    creatorColor,
    description,
}) => {
    const backgroundColor = creatorColor === 0 ? "black" : "white";
    const textColor = creatorColor === 1 ? "black" : "white";

    return (
        <FormLayout
            title={creator}
            control={
                <>
                    <div>
                        Creator color: {creatorColor === 0 ? "White" : "Black"}
                    </div>
                    <div>
                        Challenger color:{" "}
                        {creatorColor === 1 ? "White" : "Black"}
                    </div>
                    <div>{description}</div>
                </>
            }
            actions={<button type="submit">accept</button>}
            style={{
                width: "50%",
                margin: "16px auto",
                backgroundColor: backgroundColor,
                color: textColor,
            }}
            titleStyle={{ color: textColor }}
        />
    );
};

export default OpenChallenge;
