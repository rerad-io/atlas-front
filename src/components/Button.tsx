type ButtonProps = {
    label?: string;
    onClick?: () => void | unknown;
};

const Button = (props: ButtonProps) => {
    const onClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };
    const label = props.label ?? "";
    return <button onClick={() => onClick()}>{label}</button>;
};

export default Button;
