import React, { useRef, useState } from "react";
import vide from "../../assets/3129902-uhd_3840_2160_25fps (1).mp4";
import "./Hero.scss";
import logo from "../../assets/logo.png";
import { ChevronDown, ArrowLeft } from "lucide-react";
import fblogo from "../../assets/facebook logo (1).png";
import instalogo from "../../assets/hugeicons_instagram.png";
import linkedinlogo from "../../assets/bxl_linkedin (1).png";
import whatsapplogo from "../../assets/famicons_logo-whatsapp.png";
import maillogo from "../../assets/oui_email.png";
import emailjs from "@emailjs/browser";

const Hero = () => {
  const socialData = [
    { img: fblogo },
    { img: instalogo },
    { img: linkedinlogo },
    { img: maillogo },
  ];
  const [animate, setAnimate] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonRef = useRef(null);
  const logoRef = useRef(null);
  const formRef = useRef(null);

  const handleJoinClick = () => {
    if (!logoRef.current || !buttonRef.current) return;

    const logoRect = logoRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();

    const x =
      buttonRect.left +
      buttonRect.width / 2 -
      (logoRect.left + logoRect.width / 2);
    const y =
      buttonRect.top +
      buttonRect.height / 2 -
      (logoRect.top + logoRect.height / 2);

    logoRef.current.style.setProperty("--x", `${x}px`);
    logoRef.current.style.setProperty("--y", `${y}px`);

    buttonRef.current.classList.add("fade");
    setShowForm(true);

    setTimeout(() => {
      setAnimate(true);
    }, 50);
  };

  const handleBack = () => {
    setAnimate(false);
    setShowSuccess(false);
    setTimeout(() => {
      setShowForm(false);
      buttonRef.current.classList.remove("fade");
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EmailJS configuration
    // Replace these with your actual EmailJS credentials
    const serviceId = "service_97bbjw6";
    const templateId = "template_utjpo7d";
    const publicKey = "9sx0QbVo0cHFGUvvd";

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        setShowSuccess(true);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Email send failed:", error.text);
        alert("Failed to send request. Please try again.");
        setIsSubmitting(false);
      });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "971581832670"; // Remove spaces and special characters
    const message = encodeURIComponent(
      "Hello! I would like to discuss a project with HAGAWeb."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="Hero">
      <img
        ref={logoRef}
        className={`hero-logo-img ${animate ? "animate" : ""}`}
        src={logo}
        alt="Logo"
      />
      <div className="hero-header">
        <button>
          ENG <ChevronDown size={15} />
        </button>
        <button
          ref={buttonRef}
          onClick={handleJoinClick}
          className="join-button"
        >
          Join The Waitlist
        </button>
      </div>

      <video autoPlay loop muted src={vide}></video>

      {showForm && (
        <div
          className={`form-container ${animate ? "grow" : ""} ${
            showSuccess ? "success" : ""
          }`}
        >
          {!showSuccess ? (
            <form
              ref={formRef}
              className="waitlist-form"
              onSubmit={handleSubmit}
            >
              <input type="text" name="user_name" placeholder="Name" required />
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                required
              />
              <input type="text" name="company" placeholder="Company / Brand" />
              <select name="project_type" required>
                <option value="">Project Type</option>
                <option value="web">Web Design</option>
                <option value="brand">Brand Identity</option>
                <option value="ui">UI / UX</option>
              </select>
              <textarea
                name="message"
                placeholder="Tell us about your project or vision"
                rows={4}
              ></textarea>
              <div className="form-buttons">
                <button
                  type="button"
                  onClick={handleBack}
                  className="back-btn"
                  disabled={isSubmitting}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="submit"
                  className="send-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Request"}
                </button>
              </div>
            </form>
          ) : (
            <div className="success-message">
              <h2>Request Received</h2>
              <p className="thank-you">Thank you for contacting HAGAWeb.</p>
              <p className="follow-up">
                Our team will review your brief and contact you within 24 hours
                with your project quote link.
              </p>
              <button onClick={handleBack} className="back-home-btn">
                Back to home
              </button>
            </div>
          )}
        </div>
      )}
      <div className="hero-bottom">
        <div className="hero-bottom-social-box">
          <a href="" target="_blank" rel="noopener noreferrer">
            <img src={fblogo} alt="" />
          </a>
        </div>
        <div className="hero-bottom-social-box">
          <a href="" target="_blank" rel="noopener noreferrer">
            <img src={instalogo} alt="" />
          </a>
        </div>
        <div className="hero-bottom-social-box">
          <a
            href="https://www.linkedin.com/showcase/halo-web/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinlogo} alt="" />
          </a>
        </div>
        <div className="hero-bottom-social-box">
          <a
            href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSDbtkcZmZGLHqTrQKxbqdbRRgKvDlSpLpmDqlRsJpXXmrRBKTvqzbCcJZfHwQQVCWwcvNNx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={maillogo} alt="" />
          </a>
        </div>

        <button onClick={handleWhatsAppClick}>
          Whatsapp
          <img src={whatsapplogo} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
