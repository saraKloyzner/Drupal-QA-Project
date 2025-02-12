
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
  Container,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import CategoryIcon from "@mui/icons-material/Category";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2979ff",
      contrastText: "#fff",
    },
  },
});

const FAQ = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const getAllQuestions = async () => {
    try {
      const response = await fetch("/jsonapi/node/question");
      const data = await response.json();
      if (data.data) {
        setQuestions(data.data);
        setFilteredQuestions(data.data);
      } else {
        console.error("Unexpected response structure:", data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const getAllTopics = async () => {
    try {
      const response = await fetch("/jsonapi/taxonomy_term/Tags");
      const topic = await response.json();
      if (topic.data) {
        setTopics(topic.data);
      } else {
        console.error("Unexpected response structure:", topic);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    getAllQuestions();
    getAllTopics();
  }, []);

  const handleTopicClick = (topicId) => {
    const filtered = questions.filter((question) => {
      const topicRelation = question.relationships.field_topic.data;
      return topicRelation && topicRelation.id === topicId;
    });
    setFilteredQuestions(filtered);
    setSelectedTopic(topicId);
  };

  const getIconForTopic = (topicName) => {
    switch (topicName) {
      case "Infomattion":
        return <InfoIcon style={{ fontSize: "3rem" }} />;
      case "What types are there?":
        return <CategoryIcon style={{ fontSize: "3rem" }} />;
      case "Professional questions about AI":
        return <HelpOutlineIcon style={{ fontSize: "3rem" }} />;
      default:
        return null;
    }
  };

  const renderHTMLWithCustomListItems = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const listItems = doc.querySelectorAll('li');
    listItems.forEach((li) => {
      const customLi = document.createElement('li');
      customLi.style.backgroundColor = 'white';
      customLi.style.color = 'inherit';
      customLi.style.listStyleType = 'none';
      customLi.style.padding = '8px';
      customLi.style.marginBottom = '4px';
      customLi.innerHTML = li.innerHTML;
      li.replaceWith(customLi);
    });
    return doc.body.innerHTML;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          component="div"
          sx={{
            backgroundImage: 'url(/themes/my_theme/public/images/background1.jpg)',
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            filter: "brightness(1.6)",
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            zIndex: 0,
          }}
        />

        <Container>
          <Box my={4}>
            <h1 className="title">AI?</h1>
            <Box
              mb={4}
              display="flex"
              justifyContent="space-around"
              flexWrap="nowrap"
              sx={{ width: "100%" }}
            >
              {topics.map((topic) => (
                <Button
                  key={topic.id}
                  variant={selectedTopic === topic.id ? "contained" : "outlined"}
                  onClick={() => handleTopicClick(topic.id)}
                  sx={{
                    flexGrow: 1,
                    height: "170px",
                    textAlign: "center",
                    fontSize: "1.1rem",
                    flexDirection: "column",
                    maxWidth: "190px",
                    whiteSpace: "normal",
                    border: '3px solid',
                    '& svg': {
                      fontSize: '3rem'
                    },
                  }}
                  color="primary"
                >
                  {getIconForTopic(topic.attributes.name)}
                  {topic.attributes.name}
                </Button>
              ))}
            </Box>
            <Typography variant="h4" gutterBottom>
            </Typography>
            {filteredQuestions.map((question) => (
              <Accordion
                key={question.id}
                sx={{
                  margin: "0 auto 5px",
                  borderRadius: "8px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ minHeight: "60px" }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: '"Poppins", sans-serif', fontWeight: "bold" }}
                  >
                    {question.attributes?.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    color: grey[800],
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: grey[800],
                      fontFamily: '"Poppins", sans-serif',
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: renderHTMLWithCustomListItems(question.attributes.body && question.attributes.body.value
                          ? question.attributes.body.value
                          : "No body value found"),
                      }}
                    />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FAQ;
