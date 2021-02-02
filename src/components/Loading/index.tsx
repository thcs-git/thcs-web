import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CircularProgressProps } from '@material-ui/core/CircularProgress';

import LoadingSollar from '../../assets/img/sollar-loading.gif';

const useStylesFacebook = makeStyles((theme: Theme) =>
  createStyles({
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
      color: '#0899BA',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
  }),
);

const body = document.querySelector("body");
const divRoot = document.querySelector('#root');

const FacebookCircularProgress = (props: CircularProgressProps) => {
  const classes = useStylesFacebook();
  const elementSpinner = useRef(document.createElement("div"))
  elementSpinner.current.setAttribute('class', 'spinner-loading');

  useEffect(() => {
    body?.appendChild(elementSpinner.current);
    divRoot?.classList.add('blur');

    return () => {
      body?.removeChild(elementSpinner.current)
      divRoot?.classList.remove('blur');
    };
  }, []);

  const spinner = (
    <>
      {/* <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      /> */}
      <img src={LoadingSollar} />
    </>
  )

  return createPortal(spinner, elementSpinner.current);
}

export default React.memo(FacebookCircularProgress);
