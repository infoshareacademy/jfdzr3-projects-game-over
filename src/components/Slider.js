// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useState } from "react";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: "San Francisco – Oakland Bay Bridge, United States",
        imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
        label: "Bird",
        imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
        label: "Bali, Indonesia",
        imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
    },
    {
        label: "NeONBRAND Digital Marketing, Las Vegas, United States",
        imgPath: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
        label: "Goč, Serbia",
        imgPath: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
    },
];

const styles = (theme) => ({
    root: {
        maxWidth: "100vh",
        flexGrow: 1,
    },
    header: {
        display: "flex",
        alignItems: "center",
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        display: "block",
        maxWidth: "100vh",
        overflow: "hidden",
        width: "100%",
    },
});

function Slider() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        // this.setState((prevState) => ({
        //     activeStep: prevState.activeStep + 1,
        // }));
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
        // this.setState((prevState) => ({
        //     activeStep: prevState.activeStep - 1,
        // }));
    };

    const handleStepChange = (activeStep) => {
        setActiveStep(activeStep);
        // this.setState({ activeStep });
    };
    // const { classes, theme } = this.props;
    // const { activeStep } = activeStep;
    const maxSteps = tutorialSteps.length;
    return (
        // <div className={classes.root}>
        <div>
            {/* <Paper square elevation={0} className={classes.header}> */}
            <Paper square elevation={0}>
                <Typography>{tutorialSteps[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
                {tutorialSteps.map((step, index) => (
                    <div key={step.label}>{Math.abs(activeStep - index) <= 2 ? <img src={step.imgPath} alt={step.label} /> : null}</div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                // className={classes.mobileStepper}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {/* {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} */}
                        {<KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {/* {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} */}
                        {<KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </div>
    );
}

// Slider.propTypes = {
//     classes: PropTypes.object.isRequired,
//     theme: PropTypes.object.isRequired,
// };

export default withStyles(styles, { withTheme: true })(Slider);