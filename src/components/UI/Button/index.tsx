import { ReactNode } from "react";
import { Link } from "react-router-dom";
import s from "./styles.module.scss";

interface ButtonProps {
    to?: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export default function Button({ children, to, type, className, ...props }: ButtonProps) {
    const buttonClassName = [s.button, className].join(" ");
    if (to) {
        return (
            <Link to={to} {...props} className={buttonClassName}>
                {children}
            </Link>
        );
    } else {
        return (
            <button className={buttonClassName} {...props} type={type}>
                {children}
            </button>
        );
    }
}
