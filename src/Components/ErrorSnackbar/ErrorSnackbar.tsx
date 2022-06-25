import React, { SyntheticEvent } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../store/store';
import { errorMessage } from '../../store/app-reducer';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function ErrorSnackbar() {

    const error = useSelector<AppRootStateType, string>(state => state.app.error)
    const errorCode = useSelector<AppRootStateType, number>(state => state.app.errorCode)

    const dispatch = useDispatch();

    const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(errorMessage(''))
    };

    return (
        <Snackbar open={error !== ''} autoHideDuration={6000} onClose={handleClose} >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                code {errorCode} | {error}
            </Alert>
        </Snackbar>
    );
}
