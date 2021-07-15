import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, DialogActions, Button } from '@material-ui/core';


export default function Popup(props: any) {

    const { title, children, openPopup, setOpenPopup } = props;

    return (
        <Dialog 
        open={openPopup} 
        maxWidth="md" 
        aria-labelledby="alert-dialog-slide-title" 
        aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title"><h4>{title}</h4></DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setOpenPopup(false) }} color="primary">
                    Fechar
                </Button>
            </DialogActions>

        </Dialog>
    )
}