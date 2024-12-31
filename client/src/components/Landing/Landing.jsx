import { useState } from 'react';
import styles from './Landing.module.css';

const Landing = ({ onStartGuidance }) => {
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    {
      id: 1,
      title: 'Affordable Prices',
      description: 'Quality dental care that fits your budget',
      icon: '💰' // We can replace these with proper SVG icons later
    },
    {
      id: 2,
      title: 'Modern Equipment',
      description: 'State-of-the-art technology for the best results',
      icon: '🔧'
    },
    {
      id: 3,
      title: 'Experienced Dentists',
      description: 'Expert care from qualified professionals',
      icon: '👨‍⚕️'
    }
  ];

  const socialProof = [
    { id: 1, stat: '1000+', label: 'Happy Patients' },
    { id: 2, stat: '15+', label: 'Years Experience' },
    { id: 3, stat: '4.9/5', label: 'Patient Rating' }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Transform Your Smile Today</h1>
        <p className={styles.subtitle}>
          Get personalized dental care tailored to your needs in just 3 simple steps
        </p>
        <div className={styles.ctaContainer}>
          <button
            className={`${styles.cta} ${isHovered ? styles.ctaHovered : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onStartGuidance}
          >
            Find Your Perfect Dental Solution
          </button>
          <p className={styles.ctaSubtext}>Free consultation • No obligation</p>
        </div>
      </header>

      <section className={styles.socialProof}>
        {socialProof.map(item => (
          <div key={item.id} className={styles.statItem}>
            <div className={styles.statNumber}>{item.stat}</div>
            <div className={styles.statLabel}>{item.label}</div>
          </div>
        ))}
      </section>

      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit) => (
            <div key={benefit.id} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.urgencyBanner}>
        <p>Limited Time Offer: Free Initial Consultation</p>
        <button 
          className={styles.secondaryCta}
          onClick={onStartGuidance}
        >
          Start Now →
        </button>
      </section>
    </div>
  );
};

export default Landing; 