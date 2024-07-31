import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CategoryIcon from '@mui/icons-material/Category';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import '../../css/components/style.css';

const FAQ = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const getAllQuestions = async () => {
    console.log("Fetching questions...");
    try {
      const response = await fetch("/jsonapi/node/question");
      const data = await response.json();
      console.log("question", data);
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
    console.log("Fetching topics...");
    try {
      const response = await fetch("/jsonapi/taxonomy_term/Tags");
      const topic = await response.json();
      console.log("topic", topic);
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
    console.log("Topic clicked:", topicId);
    const filtered = questions.filter((question) => {
      const topicRelation = question.relationships.field_topic.data;
      return topicRelation && topicRelation.id === topicId;
    });
    console.log("Filtered questions:", filtered);
    setFilteredQuestions(filtered);
    setSelectedTopic(topicId);
  };

  const getIconForTopic = (topicName) => {
    switch (topicName) {
      case 'מידע על בינה מלאכותית':
        return <LightbulbIcon style={{ fontSize: '4rem' }} />;
      case 'סוגים שונים של בינה מלאכותית':
        return <CategoryIcon style={{ fontSize: '4rem' }} />;
      case 'שאלות מקצועיות על בינה מלאכותית':
        return <HelpOutlineIcon style={{ fontSize: '4rem' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="background"></div>
      <div className="overlay"></div>

      <Container>
        <Box my={4}>
          <h1 className="title">AI?</h1>
          <div className="button-container">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={`button ${selectedTopic === topic.id ? 'selected' : ''}`}
                onClick={() => handleTopicClick(topic.id)}
              >
                {getIconForTopic(topic.attributes.name)}
                {topic.attributes.name}
              </div>
            ))}
          </div>
          <Typography variant="h4" gutterBottom>
            {/* Questions */}
          </Typography>
          {filteredQuestions.map((question) => (
            <Accordion key={question.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="accordion-summary"
              >
                <Typography variant="h5">{question.attributes?.title}</Typography>
              </AccordionSummary>
              <AccordionDetails className="accordion-details">
                <Typography>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        question.attributes.body && question.attributes.body.value
                          ? question.attributes.body.value
                          : "No body value found",
                    }}
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default FAQ;
