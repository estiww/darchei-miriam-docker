import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Typography,
  Button,
  Container,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  DirectionsCar,
  People,
  LocalCafe,
  LocalHospital,
  Healing,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Fax as FaxIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserContext } from "../App";
import { styled } from "@mui/system";

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/path/to/hero-image.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
}));

const StatsBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

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

const HomePage = () => {

  const { user, setUser } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(contactForm.email)) {
      setEmailError("אימייל לא תקין");
      return;
    } else {
      setEmailError("");
    }

    try {
      const response = await fetch("http://localhost:3000/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        alert("ההודעה נשלחה בהצלחה!");
        setContactForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert("שגיאה בשליחת ההודעה.");
      }
    } catch (error) {
      alert("שגיאה בשליחת ההודעה.");
    }
  };

  const galleryImages = [
    "/path/to/gallery1.jpg",
    "/path/to/gallery2.jpg",
    "/path/to/gallery3.jpg",
    "/path/to/gallery4.jpg",
    "/path/to/gallery5.jpg",
  ];

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <HeroSection>
        <Container>
          <Typography variant="h2" gutterBottom>
            דרכי מרים - לב ואוזן קשבת
          </Typography>
          <Typography variant="h5" gutterBottom>
            עמותה לסיוע ותמיכה בחולים ובני משפחותיהם
          </Typography>
        </Container>
      </HeroSection>

      <Container sx={{ mt: 8, mb: 8 }}>
        {user && !user.isApproved && (
          <Box sx={{ mb: 4, p: 2, bgcolor: 'warning.light', borderRadius: 2 }}>
            <Typography variant="h6" align="center">
              הבקשה שלך להצטרפות נשלחה, והיא מחכה לאישור
            </Typography>
          </Box>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              מי אנחנו
            </Typography>
            <Typography variant="body1" paragraph>
              דרכי מרים הוקמה בשנת 2006 על ידי קבוצת מתנדבים שהחליטו להקים ארגון שיסייע לחולים ולבני משפחותיהם. 
              מטרת העמותה היא להקל על סבלם של החולים ובני משפחותיהם, ולסייע להם בכל דרך אפשרית.
            </Typography>
            <Typography variant="body1">
              אנו מספקים שירותי הסעות, תמיכה רגשית, וסיוע בצרכים יומיומיים למאות אנשים מדי יום. 
              בנוסף, אנו מפעילים מערך מתנדבים ענף, מרכזי תמיכה, ומארגנים אירועי קהילה לחיזוק הקשרים החברתיים.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="400"
              image="/path/to/volunteers.jpg"
              alt="מתנדבי דרכי מרים"
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        </Grid>

        <Box sx={{ my: 8, py: 6, bgcolor: 'primary.main', color: 'white', borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            ההשפעה שלנו במספרים
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { icon: DirectionsCar, number: 50000, text: "נסיעות בשנה" },
              { icon: People, number: 2000, text: "מתנדבים" },
              { icon: LocalCafe, number: 100000, text: "כוסות קפה" },
              { icon: LocalHospital, number: 5000, text: "מטופלים" },
              { icon: Healing, number: 180000, text: "שירותים" },
            ].map((item, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <StatsBox>
                  <item.icon sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    <AnimatedNumber end={item.number} duration={2000} />
                  </Typography>
                  <Typography variant="body2" align="center">
                    {item.text}
                  </Typography>
                </StatsBox>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          הפעילות שלנו
        </Typography>
        <Slider {...slickSettings}>
          {galleryImages.map((image, index) => (
            <Box key={index} sx={{ p: 1 }}>
              <img
                src={image}
                alt={`פעילות ${index + 1}`}
                style={{ width: "100%", borderRadius: "8px", height: "250px", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Slider>

        <Grid container spacing={4} sx={{ mt: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              צור קשר
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="שם מלא"
                fullWidth
                name="name"
                value={contactForm.name}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="כתובת אימייל"
                fullWidth
                name="email"
                value={contactForm.email}
                onChange={handleChange}
                error={!!emailError}
                helperText={emailError}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="הודעה"
                fullWidth
                multiline
                rows={4}
                name="message"
                value={contactForm.message}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                שליחה
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6} mt={8}>
            <Typography variant="h4" gutterBottom>
              פרטי התקשרות
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>077-414-7777</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FaxIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>02-5325639</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>info@darcheimiriam.org.il</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>זכרון יעקב 15, ירושלים</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
