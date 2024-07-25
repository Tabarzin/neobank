import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import './DocumentsFormed.scss';

const DocumentsFormed: React.FC = () => {
  return (
    <section>
      <Header />
      <div className="documents-content">
        <h3 className="documents-h3">Documents are formed</h3>

        <p className="documents-p">Documents for signing will be sent to your email</p>
      </div>
      <Footer />
    </section>
  );
};

export default DocumentsFormed;
