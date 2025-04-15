import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDowryAssessment } from "./components/gemini";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  const [formData, setFormData] = useState({
    salary: "",
    caste: "",
    complexion: "",
    height: "",
    propertyValue: "",
    education: "",
    familyStatus: "",
    foreignStatus: ""
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateDowry = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await getDowryAssessment(formData);
      setResult(response);
      
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 300);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sampleProfiles = [
    {
      name: "IT Professional (for example)",
      emoji: "👨‍💻",
      data: {
        salary: "4 LPA",
        caste: "Brahmin",
        complexion: "Fair",
        height: "165",
        propertyValue: "4 acre farm and 2 bhk flat",
        education: "B.tech",
        familyStatus: " Middle class",
        foreignStatus: "None"
      }
    
    }
  ];

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    
    <div className="dowry-calculator">
      {/* Animated background elements */}
      <motion.div 
        className="bg-coin bg-coin-1"
        animate={floatingAnimation}
      >
        💰
      </motion.div>
      <motion.div 
        className="bg-coin bg-coin-2"
        animate={{ ...floatingAnimation, y: [0, -25, 0] }}
      >
        💵
      </motion.div>
      <motion.div 
        className="bg-coin bg-coin-3"
        animate={{ ...floatingAnimation, y: [0, -20, 0], delay: 1 }}
      >
        🏡
      </motion.div>
      <motion.div 
        className="bg-coin bg-coin-4"
        animate={{ ...floatingAnimation, y: [0, -18, 0], delay: 0.5 }}
      >
        ✈️
      </motion.div>

      <Container className="main-container">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="content-wrapper"
        >
          {/* Header */}
          <motion.header 
            className="header"
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="title">
                <span className="money-emoji">💰</span> Calculate My Dahej.com <span className="money-emoji">💰</span>
              </h1>
            </motion.div>
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              "Get Your Market Rate"
            </motion.p>
          </motion.header>

          {/* Sample Profiles */}
          <motion.div 
            className="sample-profiles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {sampleProfiles.map((profile, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormData(profile.data)}
                className="profile-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <span className="profile-emoji">{profile.emoji}</span>
                <span className="profile-name">{profile.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="form-container"
          >
            <Form onSubmit={calculateDowry}>
              <Row className="form-fields">
                {[
                  { 
                    label: "Annual Income", 
                    name: "salary", 
                    emoji: "💰", 
                    type: "text",
                    placeholder: "e.g. 15 LPA or Family Business" 
                  },
                  { 
                    label: "Caste Category", 
                    name: "caste", 
                    emoji: "🏷️", 
                    type: "text",
                    placeholder: "e.g. Brahmin, Baniya, Rajput" 
                  },
                  { 
                    label: "Complexion", 
                    name: "complexion", 
                    emoji: "🎨", 
                    type: "text",
                    placeholder: "Fair, Wheatish, Dark" 
                  },
                  { 
                    label: "Height (cm)", 
                    name: "height", 
                    emoji: "📏", 
                    type: "number",
                    placeholder: "Height in centimeters" 
                  },
                  { 
                    label: "Property Value", 
                    name: "propertyValue", 
                    emoji: "🏡", 
                    type: "text",
                    placeholder: "Total family property worth" 
                  },
                  { 
                    label: "Education", 
                    name: "education", 
                    emoji: "🎓", 
                    type: "text",
                    placeholder: "e.g. IIT, AIIMS, Harvard" 
                  },
                  { 
                    label: "Family Status", 
                    name: "familyStatus", 
                    emoji: "👨‍👩‍👧‍👦", 
                    type: "text",
                    placeholder: "Middle Class, Rich, Business Family" 
                  },
                  { 
                    label: "Foreign Status", 
                    name: "foreignStatus", 
                    emoji: "✈️", 
                    type: "text",
                    placeholder: "NRI, Green Card, None" 
                  }
                ].map((field, i) => (
                  <Col md={6} key={i}>
                    <motion.div
                      initial={{ opacity: 0, x: i % 2 ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      whileHover={{ y: -3 }}
                    >
                      <Form.Group>
                        <Form.Label className="field-label">
                          <span className="field-emoji">{field.emoji}</span>
                          <span className="field-text">{field.label}</span>
                        </Form.Label>
                        <Form.Control
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="form-input"
                          placeholder={field.placeholder}
                          required={i < 4}
                        />
                      </Form.Group>
                    </motion.div>
                  </Col>
                ))}
              </Row>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="submit-button"
                >
                  {loading ? (
                    <span className="button-loading">
                      <span className="spinner"></span>
                      Calculating Groom's Value...
                    </span>
                  ) : (
                    <span className="button-content">
                      <span>💍</span> Calculate Marriage Package <span>💍</span>
                    </span>
                  )}
                </Button>
              </motion.div>

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="error-message"
                  >
                    <div className="error-text">
                      {error}
                    </div>
                    <a
                      href="https://ai.google.dev/tutorials/setup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="error-link"
                    >
                      ↗️ Google AI Setup Guide
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </Form>
          </motion.div>

          {/* Results Display */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="result-container"
              >
                {/* Decorative corner elements */}
                <div className="result-decoration result-decoration-top">
                  💰
                </div>
                <div className="result-decoration result-decoration-bottom">
                  💵
                </div>
                
                <div className="result-header">
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="result-emoji"
                  >
                    💰
                  </motion.div>
                  <h3 className="result-title">
                    Marriage Valuation Report
                  </h3>
                </div>
                
                <div className="result-content">
                  {result.split('\n').map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`result-line ${
                        line.startsWith('💸') ? 'highlight-money' : 
                        line.startsWith('📜') ? 'highlight-details' :
                        line.startsWith('🔥') ? 'highlight-important' : 
                        'normal-text'
                      }`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <motion.div 
                  className="result-footer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setResult(null)}
                    className="try-again-button"
                  >
                    Evaluate Another Groom
                  </Button>
                </motion.div>
              </motion.div>

            )}
          </AnimatePresence>
        </motion.div>
      </Container>
      <div className="dowry-footer">
    <p><strong>Disclaimer:</strong> This is a fun and educational project created solely for awareness purposes. We <strong>strictly condemn</strong> all forms of dowry practices.</p>

    <p>Dowry is a criminal offense under Indian law. If you are a victim or witness to such activities, please report to the proper legal authorities.</p>

    <small >
      © 2025 Dowry Awareness Project. All rights reserved.  
      This project is not affiliated with any government body and is intended for educational use only.
    </small>
  </div>

      {/* In-page CSS */}
      <style jsx>{`

        .dowry-footer {
        
    font-size: 18px;
        color:red;
    line-height: 1;
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px solid #ddd;
    width: 100%;
  }

  .dowry-footer p {
    margin-bottom: 8px;
  }

  .dowry-footer small {
    font-size: 14px;
    color: #777;
    display:flex;
    justify-content:center;
    margin:10px;
    padding:10px;
    background-color:yellow;
  
  }
        .dowry-calculator {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #ffeef8 100%);
          overflow: hidden;
          position: relative;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .bg-coin {
          position: absolute;
          font-size: 3rem;
          opacity: 0.1;
          z-index: 0;
        }
        
        .bg-coin-1 {
          top: 15%;
          left: 10%;
        }
        
        .bg-coin-2 {
          bottom: 25%;
          right: 15%;
          font-size: 4rem;
        }
        
        .bg-coin-3 {
          top: 35%;
          right: 25%;
          font-size: 3.5rem;
        }
        
        .bg-coin-4 {
          bottom: 15%;
          left: 20%;
          font-size: 3rem;
        }
        
        .main-container {
          position: relative;
          z-index: 1;
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        
        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .money-emoji {
          display: inline-block;
          background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          font-style: italic;
        }
        
        .sample-profiles {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        
        .profile-card {
          padding: 0.75rem 1.5rem;
          background-color: white;
          border: 2px solid #ff6b6b;
          border-radius: 50px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .profile-card:hover {
          background-color: #fff5f5;
        }
        
        .profile-emoji {
          font-size: 1.5rem;
        }
        
        .profile-name {
          font-weight: 500;
          color: #333;
        }
        
        .form-container {
          background-color: white;
          border-radius: 1.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          border-top: 4px solid #ff6b6b;
          margin-bottom: 2rem;
        }
        
        .form-fields {
          margin-bottom: 2rem;
        }
        
        .field-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #444;
        }
        
        .field-emoji {
          font-size: 1.25rem;
        }
        
        .field-text {
          font-size: 0.95rem;
        }
        
        .form-input {
          width: 95%;
          padding: 0.75rem 1rem;
          border: 2px solid rgba(255, 107, 107, 0.25);
          border-radius: 0.75rem;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        
        .form-input:focus {
          border-color: #ff6b6b;
          box-shadow: 0 0 0 0.2rem rgba(255, 107, 107, 0.25);
        }
        
        .form-input::placeholder {
          color: #aaa;
          font-size: 0.9rem;
        }
        
        .submit-button {
          width: 100%;
          padding: 1rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          background: linear-gradient(90deg, #ff6b6b 0%, #ffa502 100%);
          color: white;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        
        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
        }
        
        .submit-button:disabled {
          background: #ffc107;
          cursor: not-allowed;
        }
        
        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .button-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .spinner {
          display: inline-block;
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .error-message {
          margin-top: 1.5rem;
          background-color: rgba(220, 53, 69, 0.1);
          border-left: 4px solid #dc3545;
          border-radius: 0.5rem;
          padding: 1rem;
          overflow: hidden;
        }
        
        .error-text {
          font-family: monospace;
          color: #dc3545;
          white-space: pre-line;
          font-size: 0.9rem;
        }
        
        .error-link {
          display: inline-block;
          margin-top: 0.5rem;
          color: #0d6efd;
          text-decoration: none;
          font-size: 0.9rem;
        }
        
        .error-link:hover {
          text-decoration: underline;
        }
        
        .result-container {
          background-color: white;
          border-radius: 1.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          border: 3px solid #ffc107;
          position: relative;
          overflow: hidden;
          margin-bottom: 2rem;
        }
        
        .result-decoration {
          position: absolute;
          font-size: 3rem;
          opacity: 0.2;
          z-index: 0;
        }
        
        .result-decoration-top {
          top: 0.5rem;
          right: 1rem;
        }
        
        .result-decoration-bottom {
          bottom: 0.5rem;
          left: 1rem;
        }
        
        .result-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }
        
        .result-emoji {
          font-size: 2.5rem;
        }
        
        .result-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .result-content {
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }
        
        .result-line {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        
        .highlight-money {
          color: #d63384;
          font-weight: 600;
          font-size: 1.1rem;
        }
        
        .highlight-details {
          color: #fd7e14;
        }
        
        .highlight-important {
          color: #dc3545;
          font-weight: 600;
        }
        
        .normal-text {
          color: #333;
        }
        
        .result-footer {
          display: flex;
          justify-content: flex-end;
          position: relative;
          z-index: 1;
        }
        
        .try-again-button {
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          border-radius: 50px;
          border: 2px solid #ffc107;
          background-color: rgba(255, 193, 7, 0.1);
          color: #ffc107;
          transition: all 0.2s;
        }
        
        .try-again-button:hover {
          background-color: rgba(255, 193, 7, 0.2);
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .title {
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .form-container {
            padding: 1.5rem;
          }
          
          .result-container {
            padding: 1.5rem;
          }
          
          .result-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default App;