import React from 'react';
import './ContactUs.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ContactUs = () => {
  return (
    <>    
    <div className="contact-container">
    <h1 className="contact-title">Contact Us</h1>
    <p className="contact-subtitle">We'd love to hear from you! Fill out the form below or reach us through the provided contact details.</p>

    <div className="contact-form-container">
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Your Email" required />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
        </div>

        <button type="submit" className="submit-button">Send Message</button>
      </form>

      <div className="contact-details">
        <h2>Contact Details</h2>
        <p><strong>Email:</strong> contact@greenfuture.com</p>
        <p><strong>Phone:</strong> +123 456 7890</p>
        <p><strong>Address:</strong> 21 chestnut Avenue, west drayton, London</p>
      </div>
    </div>
  </div>
  </>
  );
};

export default ContactUs;
