import styles from "./FormLayout.module.css";

interface IFormProps {
    style?: React.CSSProperties;
    actionStyle?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    title?: string;
    control: React.ReactNode;
    actions: React.ReactNode;
    onSubmit?: () => void;
}

const FormLayout: React.FC<IFormProps> = ({
    style,
    actionStyle,
    titleStyle,
    title,
    control,
    actions,
    onSubmit,
}) => {
    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
    };

    return (
        <form onSubmit={formSubmitHandler} style={style}>
            {title && (
                <>
                    <label className={styles.title} style={titleStyle}>
                        {title}
                    </label>
                    <div
                        className={styles.divider}
                        style={{ backgroundColor: titleStyle?.color }}
                    />
                </>
            )}
            <div className={styles.control}>{control}</div>
            <div className={styles.actions} style={actionStyle}>
                {actions}
            </div>
        </form>
    );
};

export default FormLayout;
