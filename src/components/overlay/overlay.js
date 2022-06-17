import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Avatar from "@mui/material/Avatar";
import CustomDateTimePicker from "../date/dateTimePicker";
import ItemToChoose from "../item/itemToChoose";

export default function ScrollDialog({
    data = [],
    placeholder = '',
    paddingLeftCustom = '0px',
    isDatePickerIncluded = false,
    callback = (id) => { console.log('id') },
}) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [chosenDate, setChosenDate] = React.useState(undefined)

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChoice = (data) => {
        console.log('data', data)
        callback(data);
        handleClose();
    }

    const handleChosenDataCallback = (date) => {
        setChosenDate(date)
    }

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    if (isDatePickerIncluded) {
        return (
            <div>
                <Button
                    fullWidth
                    onClick={handleClickOpen('body')}
                    sx={{
                        border: '1px solid',
                        py: '16px',
                        pl: `${paddingLeftCustom}`,
                        mt: '8px',
                        mb: '16px',
                        color: `grey !important`,
                        textTransform: 'capitalize',
                        fontSize: '16px',
                        textAlign: 'left !important',
                        display: 'flex',
                        justifyContent: 'left',
                    }}
                >
                    {placeholder}
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={'body'}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">{placeholder}</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'} sx={{ flexDirection: 'column'}}>
                        <CustomDateTimePicker callback={handleChosenDataCallback} />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{ color: '#613659' }}
                            disabled={!chosenDate}
                            onClick={() => handleChoice(chosenDate)}
                        >
                            Confirm
                        </Button>
                        <Button sx={{ color: '#613659' }} onClick={() => handleChoice('Choose your date and time')}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    } else {
        return (
            <div>
                <Button
                    fullWidth
                    // variant="outlined"
                    onClick={handleClickOpen('body')}
                    sx={{
                        border: '1px solid',
                        py: '16px',
                        pl: `${paddingLeftCustom}`,
                        mt: '8px',
                        mb: '16px',
                        color: `grey !important`,
                        textTransform: 'capitalize',
                        fontSize: '16px',
                        textAlign: 'left !important',
                        display: 'flex',
                        justifyContent: 'left'
                    }}
                >
                    {placeholder}
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={'body'}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    {data.map((item) =>
                        <ItemToChoose
                            descriptionElementRef={descriptionElementRef}
                            data={item}
                            key={item.name}
                            callback={handleChoice} />
                    )}
                    <DialogActions>
                        <Button sx={{ color: '#613659' }} onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
