import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Logo from '../MoveoWeahterLogo.png'

const styles = theme => ({
    page: {
        background: "#FFFFFF",
        position: 'sticky',
        width: "100%",
        display: 'flex',
    },
    logo: {
        marginLeft: '100%'
    }
});

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.page}>
                <div>
                    <img src={Logo} className={classes.logo} />
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);