import FormLayout from "../../form/FormLayout";

interface IOpenChallengeProps {
    creator: string;
    creatorColor: 0 | 1;
    description: string;
    onAccept: () => void;
}

const OpenChallenge: React.FC<IOpenChallengeProps> = ({
    creator,
    creatorColor,
    description,
    onAccept,
}) => {
    const backgroundColor = creatorColor === 0 ? "black" : "white";
    const textColor = creatorColor === 1 ? "black" : "white";

    return (
        <FormLayout
            onSubmit={onAccept}
            title={creator}
            control={
                <>
                    <h3>{description}</h3>
                    <div>
                        <b>Creator color:</b>{" "}
                        {creatorColor === 0 ? "White" : "Black"}
                    </div>
                    <div>
                        <b>Challenger color:</b>{" "}
                        {creatorColor === 1 ? "White" : "Black"}
                    </div>
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
