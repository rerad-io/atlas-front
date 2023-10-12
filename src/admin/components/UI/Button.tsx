import { ReactNode } from "react";
import { Link } from "react-router-dom";
import s from "./s.module.css";

interface ButtonProps {
    to?: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export default function Button({ children, to, className, ...props }: ButtonProps) {
    const buttonClassName = [s.button, className].join(" ");
    if (to) {
        return (
            <Link to={to} {...props} className={buttonClassName}>
                {children}
            </Link>
        );
    } else {
        return (
            <button className={buttonClassName} {...props}>
                {children}
            </button>
        );
    }
}
