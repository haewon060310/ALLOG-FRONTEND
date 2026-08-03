import { useParams } from 'react-router-dom';
import './RetryMissionPage.css';

function RetryMissionPage() {
  const { missionId } = useParams();

  return (
    <section className="route-page">
      <h1>재도전 미션</h1>
      <p>재도전 미션 ID: {missionId}</p>
    </section>
  );
}

export default RetryMissionPage;
