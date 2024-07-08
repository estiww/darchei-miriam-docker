import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Container, Card, CardMedia, CardContent, TextField } from '@mui/material';
import { DirectionsCar, People, LocalCafe, LocalHospital, Healing } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import FileUpload from '../components/FileUpload';

const AnimatedNumber = ({ end, duration }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            setCount(Math.floor(start));
            if (start >= end) {
                clearInterval(timer);
                setCount(end);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [end, duration]);

    return <span>{count.toLocaleString()}</span>;
};

const useStyles = makeStyles((theme) => ({
    galleryCard: {
        position: 'relative',
        overflow: 'hidden',
        animation: 'fadeInUp 1s',
        '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease',
        },
    },
    galleryImage: {
        transition: 'transform 1s',
    },
}));

const HomePage = () => {
    const classes = useStyles();

    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [emailError, setEmailError] = useState('');

    const handleChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(contactForm.email)) {
            setEmailError('אימייל לא תקין');
            return;
        } else {
            setEmailError('');
        }

        try {
            const response = await fetch('http://localhost:3000/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactForm),
            });

            if (response.ok) {
                alert('ההודעה נשלחה בהצלחה!');
                setContactForm({
                    name: '',
                    email: '',
                    message: ''
                });
            } else {
                alert('שגיאה בשליחת ההודעה.');
            }
        } catch (error) {
            alert('שגיאה בשליחת ההודעה.');
        }
    };

    return (
        <Container style={{ marginTop: '80px' }}>
            <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
                <Grid item xs={12} textAlign="center">
                    <Typography variant="h4" gutterBottom>
                        ברוכים הבאים לארגון דרכי מרים
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card className={classes.galleryCard}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image="/path/to/image1.jpg"
                                    alt="תמונה 1"
                                    className={classes.galleryImage}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        פעילות הארגון
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        תיאור קצר של פעילות הארגון.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card className={classes.galleryCard}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image="/path/to/image2.jpg"
                                    alt="תמונה 2"
                                    className={classes.galleryImage}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        פעילויות נוספות
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        מידע נוסף על פעילויות הארגון.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} textAlign="center" marginTop={4}>
                    <Button
                        component={Link}
                        to="/donate"
                        variant="contained"
                        color="secondary"
                        size="large"
                    >
                        תרום עכשיו
                    </Button>
                </Grid>
                <Grid item xs={12} textAlign="center" marginTop={4}>
                    <Typography variant="h6">אודות הארגון</Typography>
                    <Typography variant="body1" paragraph>
                        דרכי מרים הינו ארגון המוקדש לעזרה וסיוע לקהילה. אנו מספקים מגוון שירותים ופעילויות לקהילה המקומית.
                    </Typography>
                </Grid>
                {/* סקציה חדשה */}
                <Grid item xs={12} textAlign="center" marginTop={4} style={{backgroundColor: '#B300B3', padding: '20px', color: 'white'}}>
                    <Grid container spacing={3} justifyContent="center" style={{marginTop: '20px'}}>
                        <Grid item xs={6} sm={4} md={2} style={{animation: 'fadeInUp 1s'}}>
                            <DirectionsCar style={{fontSize: 48}} />
                            <Typography variant="h4"><AnimatedNumber end={50000} duration={2000} /></Typography>
                            <Typography variant="body2">RIDES<br/>Each Year</Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} style={{animation: 'fadeInUp 1s 0.2s'}}>
                            <People style={{fontSize: 48}} />
                            <Typography variant="h4"><AnimatedNumber end={2000} duration={2000} /></Typography>
                            <Typography variant="body2">VOLUNTEERS</Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} style={{animation: 'fadeInUp 1s 0.4s'}}>
                            <LocalCafe style={{fontSize: 48}} />
                            <Typography variant="h4"><AnimatedNumber end={100000} duration={2000} /></Typography>
                            <Typography variant="body2">CUPS<br/>Each Year</Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} style={{animation: 'fadeInUp 1s 0.6s'}}>
                            <LocalHospital style={{fontSize: 48}} />
                            <Typography variant="h4"><AnimatedNumber end={5000} duration={2000} /></Typography>
                            <Typography variant="body2">PATIENTS</Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} style={{animation: 'fadeInUp 1s 0.8s'}}>
                            <Healing style={{fontSize: 48}} />
                            <Typography variant="h4"><AnimatedNumber end={180000} duration={2000} /></Typography>
                            <Typography variant="body2">LIFE-<br/>SAVING<br/>MEDICINE</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6} textAlign="center" marginTop={4}>
                    <Typography variant="h6">צור קשר</Typography>
                    <form onSubmit={handleSubmit} style={{ animation: 'fadeInUp 1s' }}>
                        <TextField
                            label="שם"
                            name="name"
                            value={contactForm.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="אימייל"
                            name="email"
                            value={contactForm.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <TextField
                            label="הודעה"
                            name="message"
                            value={contactForm.message}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '16px' }}>
                            שלח
                        </Button>
                    </form>
                    <FileUpload />

                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;