import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import Button from "@mui/material/Button";
import * as React from "react";
import Typography from "@mui/material/Typography";


export default function ItemToChoose({ data, descriptionElementRef, callback }) {
    const {
        name,
        rate,
        price,
    } = data
    return (
        <>
            <DialogTitle id="scroll-dialog-title">{name}</DialogTitle>
            <DialogContent dividers={scroll === 'paper'} sx={{ flexDirection: 'column'}}>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    {[...new Array(1)]
                        .map(
                            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                        )
                        .join('\n')}
                </DialogContentText>
                {rate
                    ? [...new Array(rate)].map(() => (
                        <StarPurple500OutlinedIcon key={Math.random()} htmlColor={'#FFD700'}/>
                ))
                    : <Typography component="h3" variant="h5">
                        {price} €
                    </Typography>
                }
                {/*<StarPurple500OutlinedIcon htmlColor={'#FFD700'}/>*/}
                {/*<StarPurple500OutlinedIcon htmlColor={'#FFD700'}/>*/}
                {/*<StarPurple500OutlinedIcon htmlColor={'#FFD700'}/>*/}
                <Button
                    onClick={() =>
                        !price ? callback(name) : callback({ name, price})
                    }
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#613659' }}
                >
                    Choose
                </Button>
            </DialogContent>
        </>
    )
}
