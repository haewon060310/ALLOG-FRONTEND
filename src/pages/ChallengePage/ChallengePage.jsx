import { useParams } from 'react-router-dom';
import './ChallengePage.css';

function ChallengePage() {
  const { challengeId } = useParams();

  return (
    <section className="route-page">
      <h1>챌린지</h1>
      <p>챌린지 ID: {challengeId}</p>
    </section>
  );
}

export default ChallengePage;
