import { useParams } from 'react-router-dom';
import './VerificationSubmitPage.css';

function VerificationSubmitPage() {
  const { challengeId } = useParams();

  return (
    <section className="route-page">
      <h1>챌린지 인증</h1>
      <p>챌린지 ID: {challengeId}</p>
    </section>
  );
}

export default VerificationSubmitPage;
