import React from "react";

type PropsType = {
    onClick: () => void
    className?: string
}

const Button: React.FC<PropsType> = ({onClick, className, ...restProps}) => {
    return(
        <button className={className} onClick={onClick} {...restProps}></button>
    )
}

export default Button;