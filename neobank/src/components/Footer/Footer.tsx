import './Footer.scss';

const Footer = () => {
  return (
    <footer className=" footer">
      <div className="footer-content">
        <div className="footer-content__contacts"></div>
        <nav className="footer-content__nav">
          <ul className="footer-content__nav_list">
            <li>About bank</li>
            <li>Ask a Question</li>
            <li>Quality of service</li>
            <li>Requisites</li>
            <li>Press center</li>
            <li>Bank career</li>
            <li>Investors</li>
            <li>Analytics</li>
            <li>Business and processes</li>
            <li>Compliance and business ethics</li>
          </ul>
        </nav>
        <p className="footer-content__legalinfo">
          We use cookies to personalize our services and improve the user experience of our website. Cookies are small
          files containing information about previous visits to a website. If you do not want to use cookies, please
          change your browser settings
        </p>
      </div>
    </footer>
  );
};

export default Footer;
