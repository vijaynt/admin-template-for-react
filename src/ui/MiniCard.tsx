import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
    Paper,
    Theme,
    createStyles,
    withStyles,
    Typography,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { variantColor } from '../theme';

const miniCardStyles = (theme: Theme) =>
    createStyles({
        ...variantColor(theme),
        root: {
            position: 'relative',
            color: theme.palette.type === 'light' ? '' : theme.palette.text.primary,
            '&:hover $icon': {
                transform: 'scale(4)',
            },
        },
        body: {
            padding: `${theme.spacing.unit} ${theme.spacing.unit * 1.5} ${theme.spacing.unit * 2} ${theme.spacing.unit *
                1.5}`,
        },
        icon: {
            position: 'absolute',
            top: theme.spacing.unit,
            right: theme.spacing.unit,
            opacity: 0.3,
            transform: 'scale(3.5)',
            transformOrigin: 'top right',
            transition: 'all .2s ease-in-out',
        },
        linkContainer: {
            display: 'flex',
            backgroundColor: fade(theme.palette.common.black, 0.1),
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            overflow: 'hidden',
            '& > *': {
                flex: 1,
                display: 'block',
                textAlign: 'center',
                paddingTop: theme.spacing.unit / 4,
                paddingBottom: theme.spacing.unit / 4,
                opacity: 0.8,
                '&:hover': {
                    backgroundColor: fade(theme.palette.common.black, 0.2),
                    opacity: 1,
                },
            },
        },
    });

class MiniCard extends React.Component<
    {
        classes: any;
        className?: string;
        title: string;
        description: string;
        icon: any;
        variant?: string;
        links: Map<string, string>;
    },
    {}
> {
    constructor(props) {
        super(props);
    }

    public render() {
        const { classes, className, icon, title, description, links } = this.props;
        const linkEls = [];
        if (links) {
            for (const [ key, value ] of links) {
                linkEls.push(
                    value ? (
                        <Link color='default' key={key} to={value}>
                            <Typography color='inherit' variant='caption'>
                                {key}
                            </Typography>
                        </Link>
                    ) : (
                        <Typography color='inherit' variant='caption' key={key}>
                            {key}
                        </Typography>
                    ),
                );
            }
        }
        return (
            <Paper className={classNames(classes.root, classes[this.props.variant], className)}>
                <div className={classes.body}>
                    <Typography color='inherit' variant='h4' component='h4'>
                        {title}
                    </Typography>
                    <Typography color='inherit' variant='caption'>
                        {description}
                    </Typography>
                </div>
                <div className={classes.icon}>{icon}</div>
                <Typography className={classes.linkContainer} color='inherit' variant='caption' component='div'>
                    {linkEls}
                </Typography>
            </Paper>
        );
    }
}

export default withStyles(miniCardStyles)(MiniCard);
