import React, { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { FaUserCircle, FaLock, FaQuestionCircle, FaSignOutAlt} from 'react-icons/fa';
import UserTopLayer from '../components/UserTopLayer';


const TopLayer = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <UserTopLayer name="FAQs" icon={FaQuestionCircle} />
  );
};

const FAQSection = ({ title, questions, headingColor }) => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div style={{ marginBottom: '10px', }}>
      {/* Section Title with dynamic color */}
      <h2 style={{ marginBottom: '20px', color: headingColor }}>{title}</h2>
      {questions.map((question, index) => (
        <div
          key={index}
          style={{
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#f7f9fb',
            border: '1px solid #ddd',
            borderRadius: '5px',
          }}
        >
          {/* Question Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => toggleQuestion(index)}
          >
            <span>{question.question}</span>
            <button
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                color: '#858585',
                cursor: 'pointer',
              }}
            >
              {openQuestion === index ? (
                <RiArrowDropUpLine />
              ) : (
                <RiArrowDropDownLine />
              )}
            </button>
          </div>

          {/* Answer */}
          {openQuestion === index && (
            <div
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '5px',
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
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
    }}
  >
     {/* Fixed Top Layer */}
     <div 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
        }}
      >
      <TopLayer />
      </div>

     {/* Scrollable Content */}
      <div 
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '20px',
          fontFamily: 'DMM, sans-serif',
          // Custom Scrollbar Styles
          scrollbarWidth: 'thin',
          scrollbarColor: '#d63384 #f1f1f1',overflowX:'hidden'
        }}
        // WebKit (Chrome, Safari, newer versions of Opera) scrollbar styling
        className="custom-scrollbar"
      >
        <div
          style={{
            padding: '10px',
            height: '100%',
            width: '100%',
            overflowY: 'scroll',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For IE and Edge
          }}
        >
          <style>
            {`
              /* For Chrome, Edge, and Safari */
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <FAQSection title="Sign Up FAQ" questions={signUpQuestions} headingColor="#ff4081" />
          <FAQSection title="Task FAQ" questions={taskQuestions} headingColor="#ff4081" />
          <FAQSection title="Payment FAQ" questions={paymentQuestions} headingColor="#ff4081" />
        </div>
      </div>
    </div>
  );
};

export default FAQ;



