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
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserContext } from "../App"; // Assuming UserContext is exported from App.js

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
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container style={{ marginTop: "80px", marginBottom: "20px" }}>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} textAlign="center">
          <Typography variant="h4" gutterBottom>
            ברוכים הבאים לארגון דרכי מרים
          </Typography>
        </Grid>

        {/* Display the approval message if the request is pending */}
        {user && !user.isApproved && (
          <Grid item xs={12} textAlign="center">
            <Typography variant="h6" color="error">
              הבקשה שלך להצטרפות נשלחה, והיא מחכה לאישור
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                style={{
                  position: "relative",
                  overflow: "hidden",
                  animation: "fadeInUp 1s",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image="/path/to/image1.jpg"
                  alt="תמונה 1"
                  style={{ transition: "transform 1s" }}
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
              <Card
                style={{
                  position: "relative",
                  overflow: "hidden",
                  animation: "fadeInUp 1s",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image="/path/to/image2.jpg"
                  alt="תמונה 2"
                  style={{ transition: "transform 1s" }}
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

        <Grid
          item
          xs={12}
          textAlign="center"
          marginTop={4}
          style={{
            backgroundColor: "#B300B3",
            padding: "20px",
            color: "white",
          }}
        >
          <Grid
            container
            spacing={3}
            justifyContent="center"
            style={{ marginTop: "20px" }}
          >
            <Grid
              item
              xs={6}
              sm={4}
              md={2}
              style={{ animation: "fadeInUp 1s" }}
            >
              <DirectionsCar style={{ fontSize: 48 }} />
              <Typography variant="h4">
                <AnimatedNumber end={50000} duration={2000} />
              </Typography>
              <Typography variant="body2">
                נסיעות
                <br />
                בכל שנה
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              md={2}
              style={{ animation: "fadeInUp 1s 0.2s" }}
            >
              <People style={{ fontSize: 48 }} />
              <Typography variant="h4">
                <AnimatedNumber end={2000} duration={2000} />
              </Typography>
              <Typography variant="body2">מתנדבים</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              md={2}
              style={{ animation: "fadeInUp 1s 0.4s" }}
            >
              <LocalCafe style={{ fontSize: 48 }} />
              <Typography variant="h4">
                <AnimatedNumber end={100000} duration={2000} />
              </Typography>
              <Typography variant="body2">
                כוסות
                <br />
                בכל שנה
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              md={2}
              style={{ animation: "fadeInUp 1s 0.6s" }}
            >
              <LocalHospital style={{ fontSize: 48 }} />
              <Typography variant="h4">
                <AnimatedNumber end={5000} duration={2000} />
              </Typography>
              <Typography variant="body2">מטופלים</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={4}
              md={2}
              style={{ animation: "fadeInUp 1s 0.8s" }}
            >
              <Healing style={{ fontSize: 48 }} />
              <Typography variant="h4">
                <AnimatedNumber end={180000} duration={2000} />
              </Typography>
              <Typography variant="body2">שירותים</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} marginTop={4}>
          <Typography variant="h5" align="center" gutterBottom>
            גלריה
          </Typography>
          <Slider {...slickSettings}>
            {galleryImages.map((image, index) => (
              <Box key={index}>
                <img
                  src={image}
                  alt={`גלריה ${index + 1}`}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Box>
            ))}
          </Slider>
        </Grid>

        <Grid item xs={12} sm={8} md={6} lg={4} mt={5}>
          <Box p={3} bgcolor="background.paper" boxShadow={2}>
            <Typography variant="h5" align="center" gutterBottom>
              צור קשר
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="שם מלא"
                    fullWidth
                    name="name"
                    value={contactForm.name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="כתובת אימייל"
                    fullWidth
                    name="email"
                    value={contactForm.email}
                    onChange={handleChange}
                    error={!!emailError}
                    helperText={emailError}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="הודעה"
                    fullWidth
                    multiline
                    rows={4}
                    name="message"
                    value={contactForm.message}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <Button type="submit" variant="contained" color="primary">
                    שליחה
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <IconButton
              onClick={() => window.open("tel:+077-414-7777")}
              aria-label="טלפון"
            >
              <PhoneIcon fontSize="large" />
            </IconButton>
            <Typography variant="body2" align="center">
              077-414-7777
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => window.open("fax:+025325639")}
              aria-label="פקס"
            >
              <FaxIcon fontSize="large" />
            </IconButton>
            <Typography variant="body2" align="center">
              02-5325639
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => window.open("mailto:info@darcheimiriam.org.il")}
              aria-label="אימייל"
            >
              <EmailIcon fontSize="large" />
            </IconButton>
            <Typography variant="body2" align="center">
              info@darcheimiriam.org.il
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
