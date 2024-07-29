import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "proptypes";
import { Button } from "@mui/material";

export const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        };
    });

    return (
        <div style={{ paddingTop: "20px" }} className="text-center">
            <div style={hideWhenVisible}>
                <Button variant="contained" size="small" onClick={toggleVisibility}>
                    {buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <Button size="small" variant="contained" color="warning" onClick={toggleVisibility}>Hidden</Button>
            </div>
        </div>
    );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};
