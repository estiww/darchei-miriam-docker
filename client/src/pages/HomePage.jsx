import React, { useContext, useState } from 'react';
import { Grid, Typography, Button, Container, Card, CardMedia, CardContent, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Logo from '../imgs/Logo.png'
const HomePage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
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

        // ולידציה לאימייל
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(contactForm.email)) {
            setEmailError('אימייל לא תקין');
            return;
        } else {
            setEmailError('');
        }

        // שלח את הטופס לשרת או בצע פעולה אחרת
        console.log('Form submitted:', contactForm);

        try {
            const response = await fetch('https://', {
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
                    {user && !user.isApproved && (
                        <Typography style={{ color: "red" }}>
                            בקשתך להצטרפות נשלחה לאישור. תעודכן ברגע שתאושר.
                        </Typography>
                    )}
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image= {Logo}// תמונה ראשונה
                                    alt="תמונה 1"
                                    style={{ animation: "fadeIn 1s" }}
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
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image="image2.jpg" // תמונה שנייה
                                    alt="תמונה 2"
                                    style={{ animation: "fadeIn 1s" }}
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
                    <Typography variant="h6">אודות הארגון</Typography>
                    <Typography variant="body1" paragraph>
                        דרכי מרים הינו ארגון המוקדש לעזרה וסיוע לקהילה. אנו מספקים מגוון שירותים ופעילויות לקהילה המקומית.
                    </Typography>
                </Grid>

                <Grid item xs={6} textAlign="center" marginTop={4}>
                    <Typography variant="h6">צור קשר</Typography>
                    <form onSubmit={handleSubmit}>
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
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
