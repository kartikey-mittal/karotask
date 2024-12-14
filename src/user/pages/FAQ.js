import React, { useState, useEffect } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { FaQuestionCircle } from 'react-icons/fa';
import UserTopLayer from '../components/UserTopLayer';

const TopLayer = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return <UserTopLayer name="FAQs" icon={FaQuestionCircle} />;
};

const FAQSection = ({ title, questions, headingColor }) => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    
    handleResize();

    window.addEventListener('resize', handleResize);

    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        marginTop: '30px',
        marginBottom: '30px',
        padding: isMobile ? '15px' : '20px', 
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '.05rem solid #f4f4f4',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2
        style={{
          marginBottom: '20px',
          color: headingColor,
          fontSize: isMobile ? '1.5rem' : '1.8rem',
          fontWeight: 'bold',
        }}
      >
        {title}
      </h2>
      {questions.map((question, index) => (
        <div
          key={index}
          style={{
            marginBottom: '20px',
            padding: isMobile ? '15px' : '20px', 
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '.05rem solid #c8c8c8',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s ease, transform 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)'}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              fontWeight: '600',
            }}
            onClick={() => toggleQuestion(index)}
          >
            <span style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: '#333' }}>
              {question.question}
            </span>
            <button
              style={{
                background: 'none',
                border: 'none',
                fontSize: isMobile ? '1.5rem' : '1.8rem', 
                color: '#7e7e7e',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
              }}
            >
              {openQuestion === index ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </button>
          </div>
          {openQuestion === index && (
            <div
              style={{
                marginTop: '15px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                lineHeight: '1.6',
                color: '#555',
                fontSize: isMobile ? '0.9rem' : '1rem', 
                transition: 'opacity 0.3s ease',
              }}
            >
              {question.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const FAQ = () => {
  const signUpQuestions = [
    { question: 'How do I sign up for karoTask?', answer: 'You can sign up by visiting the registration page and filling out the required information.' },
    { question: 'Do I need to provide any personal information to sign up?', answer: 'Yes, you will need to provide some personal information to create an account.' },
    { question: 'Is there any age restriction to join karoTask?', answer: 'Yes, you must be at least 18 years old to join.' },
    { question: 'Can I use multiple accounts to sign up?', answer: 'No, each user is allowed to have only one account.' },
    { question: 'What should I do if I don\'t receive the OTP?', answer: 'Please check your spam folder or request a new OTP.' },
  ];

  const taskQuestions = [
    { question: 'What kind of tasks will I be doing on karoTask?', answer: 'You will be doing various tasks based on your skills and interests.' },
    { question: 'How do I know which tasks are available?', answer: 'You can view available tasks in the Tasks section of your dashboard.' },
    { question: 'Are there any guidelines for completing tasks?', answer: 'Yes, each task comes with specific guidelines. Make sure to read them before starting the task.' },
    { question: 'Can I choose which tasks I want to do?', answer: 'Yes, you can choose tasks that match your skills and availability.' },
    { question: 'How do I submit proof of task completion?', answer: 'You can submit proof by uploading the required files or completing the specific steps outlined in the task instructions.' },
  ];

  const paymentQuestions = [
    { question: 'How will I get paid for the tasks I complete?', answer: 'Payments will be transferred directly to your UPI ID or bank account as per your registered payment details.' },
    { question: 'What is the payment cycle?', answer: 'The payment cycle is typically weekly or monthly, depending on the task guidelines.' },
    { question: 'How do I update my UPI ID?', answer: 'You can update your UPI ID in the Payment Settings section of your profile.' },
    { question: 'What should I do if I don’t receive my payment?', answer: 'If you don’t receive your payment, please contact support with your task details and proof of completion.' },
    { question: 'Are there any fees for receiving payments?', answer: 'No, there are no fees for receiving payments. However, your bank might charge a nominal transaction fee.' },
  ];

  return (
    <div
      style={{
        maxHeight: 'calc(100vh - 20px)',
        backgroundColor: "#f4f4f4",
        padding: '20px',
        overflowY: 'auto',
        overflowX: 'hidden',
        
      }}
    >
      <TopLayer />
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <FAQSection title="Sign Up FAQ" questions={signUpQuestions} headingColor="#ff4081" />
        <FAQSection title="Task FAQ" questions={taskQuestions} headingColor="#ff4081" />
        <FAQSection title="Payment FAQ" questions={paymentQuestions} headingColor="#ff4081" />
      </div>
    </div>
  );
};

export default FAQ;
