import { useParams } from 'react-router-dom';
import './VerificationDetailPage.css';

function VerificationDetailPage() {
  const { verificationId } = useParams();

  return (
    <section className="route-page">
      <h1>인증 상세</h1>
      <p>인증 ID: {verificationId}</p>
    </section>
  );
}

export default VerificationDetailPage;
