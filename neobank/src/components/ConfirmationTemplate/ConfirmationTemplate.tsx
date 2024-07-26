import React from 'react';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import './ConfirmationTemplate.scss';

interface ConfirmationTemplateProps {
  title: string;
  message: string;
}

const ConfirmationTemplate: React.FC<ConfirmationTemplateProps> = ({ title, message }) => {
  return (
    <section>
      <Header />
      <div className="confirmation-content">
        <h3 className="confirmation-h3">{title}</h3>
        <p className="confirmation-p">{message}</p>
      </div>
      <Footer />
    </section>
  );
};

export default ConfirmationTemplate;
