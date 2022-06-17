import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollDialog from "../components/overlay/overlay";
import {useEffect, useState} from "react";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                AClients
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const specialists = [
    {
        name: 'Ivan Petrov',
        rate: 5,
    },
    {
        name: 'Alexey Kuznetsov',
        rate: 3,
    },
    {
        name: 'Ruslan Kuchin',
        rate: 4,
    },
]
const services = [
    {
        name: 'Haircut',
        price: 15,
    },
    {
        name: 'Beard styling',
        price: 8,
    },
    {
        name: 'Dangerous razor shaving',
        price: 13,
    },
]
const placeholders = {
    specialist: 'Choose your specialist',
    date: 'Choose your date and time',
    service: 'Choose your service',
}
const theme = createTheme();

export default function BookingSide() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [specialist, setSpecialist] = useState(placeholders.specialist);
    const [date, setDate] = useState(placeholders.date);
    const [service, setService] = useState(placeholders.service);
    const [price, setPrice] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        if (
           phone.length > 5 &&
           name.length &&
           surname.length &&
           specialist !== placeholders.specialist &&
           date !== placeholders.date &&
           service !== placeholders.service
        ) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [
        specialist,
        date,
        service,
        price,
        name,
        surname,
        phone,
    ])

    useEffect(() => {
        if (typeof date === 'undefined') {
            setDate(placeholders.date)
        }
    }, [date])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            name,
            surname,
            specialist,
            date,
            service,
            price,
            phone,
        })
    };

    const handleMaster = (data) => {
        setSpecialist(data);
    }
    const handleDate = (date) => {
        setDate(date);
    }
    const handleService = (serviceObject) => {
        const { name, price } = serviceObject
        setService(name);
        setPrice(price);
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={5}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#613659' }}>
                            <CalendarMonthOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Welcome to AClients
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} flexDirection={'column'}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value) }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="surname"
                                label="Surname"
                                type="surname"
                                id="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value) }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                label="Phone"
                                placeholder={'+7'}
                                type="number"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value) }
                            />
                            <ScrollDialog
                                placeholder={specialist}
                                paddingLeftCustom={'14px'}
                                callback={handleMaster}
                                data={specialists}
                            />
                            <ScrollDialog
                                placeholder={typeof date === 'string' ? date : date.toLocaleString()}
                                paddingLeftCustom={'14px'}
                                isDatePickerIncluded={true}
                                callback={handleDate}
                            />
                            <ScrollDialog
                                placeholder={service}
                                paddingLeftCustom={'14px'}
                                callback={handleService}
                                data={services}
                            />
                            <Typography component="h3" variant="h5">
                                Total price: {price} €
                            </Typography>
                            <Button
                                disabled={isDisabled}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: '#613659' }}
                            >
                                Book my service
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/index2" variant="body2" color={'#613659'}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}