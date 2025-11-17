import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { CheckCircle, MessageSquare, Clock, Shield } from 'lucide-react';
import './commonDashboard.css';

const CommonDashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Voice Your Concerns",
      description: "A secure platform to raise and track your hostel grievances efficiently",
      image: "/images/hostel-j.jpeg"
    },
    {
      title: "Quick Resolution",
      description: "Get your issues resolved faster with our streamlined grievance management system",
      image: "/images/hostel-k.jpeg"
    },
    {
      title: "24/7 Support",
      description: "Submit grievances anytime, anywhere. We're here to help you round the clock",
      image: "/images/hostel-l.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div>
      <nav className="navbar">
        <div className="logo">🎓 Grievance Portal</div>
        <div className="auth-buttons">
          <button className="btn btn-student" onClick={()=>navigate('/login/student')}>Student Login</button>
          <button className="btn btn-admin" onClick={()=>navigate('/login/admin')}>Admin Login</button>
        </div>
      </nav>

      <div className="container">
        <div className="slider-section">
          <div className="slider">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="slide-overlay">
                  <div className="slide-content">
                    <h2>{slide.title}</h2>
                    <p>{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <p className="subtitle">
            Making hostel life better, one resolution at a time. Register today to start managing your concerns effectively.
          </p>

          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">
                <MessageSquare />
              </div>
              <div className="feature-text">
                <h3>Easy Submission</h3>
                <p>Submit your grievances with just a few clicks. Attach photos and provide detailed descriptions.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <Clock />
              </div>
              <div className="feature-text">
                <h3>Real-time Tracking</h3>
                <p>Track the status of your complaints in real-time and receive instant notifications on updates.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <CheckCircle />
              </div>
              <div className="feature-text">
                <h3>Transparent Process</h3>
                <p>Complete transparency throughout the resolution process with regular status updates.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <Shield />
              </div>
              <div className="feature-text">
                <h3>Secure & Confidential</h3>
                <p>Your privacy is our priority. All submissions are secure and handled confidentially.</p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <button className="btn btn-register" onClick={()=>navigate('/register/student')}>Start Now</button>
            <p className="info-text">
              Already have an account? Use the login buttons above to access your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonDashboard;