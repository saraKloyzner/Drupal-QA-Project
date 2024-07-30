// import React, { useState, useEffect } from "react";
// import { Accordion, AccordionSummary, AccordionDetails, Button, Typography, Container, Box } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const FAQ = () => {
//   const [questions, setQuestions] = useState([]);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [topics, setTopics] = useState([]);
//   const [selectedTopic, setSelectedTopic] = useState(null);

//   const getAllQuestions = async () => {
//     console.log("Fetching questions...");
//     try {
//       const response = await fetch("/jsonapi/node/question");
//       const data = await response.json();
//       console.log("question", data);
//       if (data.data) {
//         setQuestions(data.data);
//         setFilteredQuestions(data.data);
//       } else {
//         console.error("Unexpected response structure:", data);
//       }
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };

//   const getAllTopics = async () => {
//     console.log("Fetching topics...");
//     try {
//       const response = await fetch("/jsonapi/taxonomy_term/Tags");
//       const topic = await response.json();
//       console.log("topic", topic);
//       if (topic.data) {
//         setTopics(topic.data);
//       } else {
//         console.error("Unexpected response structure:", topic);
//       }
//     } catch (error) {
//       console.error("Error fetching topics:", error);
//     }
//   };

//   useEffect(() => {
//     getAllQuestions();
//     getAllTopics();
//   }, []);

//   const handleTopicClick = (topicId) => {
//     console.log("Topic clicked:", topicId);
//     const filtered = questions.filter((question) => {
//       const topicRelation = question.relationships.field_topic.data;
//       return topicRelation && topicRelation.id === topicId;
//     });
//     console.log("Filtered questions:", filtered);
//     setFilteredQuestions(filtered);
//     setSelectedTopic(topicId);
//   };

//   return (
//     <Container>
//       <Box my={4}>
//         <Typography variant="h4" gutterBottom>
//           Topics
//         </Typography>
//         <Box mb={4} display="flex" flexWrap="wrap" gap={2}>
//           {topics.map((topic) => (
//             <Button
//               key={topic.id}
//               variant={selectedTopic === topic.id ? "contained" : "outlined"}
//               onClick={() => handleTopicClick(topic.id)}
//             >
//               {topic.attributes.name}
//             </Button>
//           ))}
//         </Box>
//         <Typography variant="h4" gutterBottom>
//           Questions
//         </Typography>
//         {filteredQuestions.map((question) => (
//           <Accordion key={question.id}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography variant="body1">{question.attributes?.title}</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html:
//                     question.attributes.body && question.attributes.body.value
//                       ? question.attributes.body.value
//                       : "No body value found",
//                 }}
//               />
//             </AccordionDetails>
//           </Accordion>
//         ))}
//       </Box>
//       <Box
//         sx={{
//           position: "fixed",
//           top: 0,
//           bottom: 0,
//           width: "200px", // Increase width for larger images
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           alignItems: "center",
//           left: 0,
//           padding: "5px", // Smaller padding
//         }}
//       >
//         {[1, 2, 3, 4, 5].map((i) => (
//           <Box
//             key={i}
//             component="img"
//             src={`/themes/react_theme/public/images/AI${i}.jpg`}
//             alt={`AI ${i}`}
//             sx={{
//               width: "100%",
//               margin: "2px 0", // Smaller margin
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//             }}
//           />
//         ))}
//       </Box>
//       <Box
//         sx={{
//           position: "fixed",
//           top: 0,
//           bottom: 0,
//           width: "200px", // Increase width for larger images
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           alignItems: "center",
//           right: 0,
//           padding: "5px", // Smaller padding
//         }}
//       >
//         {[6,7,8,9,10].map((i) => (
//           <Box
//             key={i}
//             component="img"
//             src={`/themes/react_theme/public/images/AI${i}.jpg`}
//             alt={`AI ${i}`}
//             sx={{
//               width: "100%",
//               margin: "2px 0", // Smaller margin
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//             }}
//           />
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default FAQ;

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

  return (
    // <Box
    //   sx={{
    //     backgroundImage:background,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     minHeight: '100vh',
    //     py: 4,
    //   }}
    // >
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
      backgroundImage: `url(/themes/react_theme/public/images/background1.jpg)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "fixed", // משנה ל-fixed
      // position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      filter: "brightness(1.6)", // הבהרת התמונה
      zIndex: -1, // שים את התמונה מאחור
    }}
  />
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.5)", // צבע לבן עם שקיפות
      zIndex: 0, // שים את המסכה מעל התמונה
    }}
  />
  
      <Container>
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Topics
          </Typography>
          <Box mb={4} display="flex" flexWrap="wrap" gap={2}>
            {topics.map((topic) => (
              <Button
                key={topic.id}
                variant={selectedTopic === topic.id ? "contained" : "outlined"}
                onClick={() => handleTopicClick(topic.id)}
              >
                {topic.attributes.name}
              </Button>
            ))}
          </Box>
          <Typography variant="h4" gutterBottom>
            Questions
          </Typography>
          {filteredQuestions.map((question) => (
            <Accordion key={question.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body1">
                  {question.attributes?.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      question.attributes.body && question.attributes.body.value
                        ? question.attributes.body.value
                        : "No body value found",
                  }}
                />
              
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
