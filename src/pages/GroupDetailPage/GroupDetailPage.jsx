import { useParams } from 'react-router-dom';
import './GroupDetailPage.css';

function GroupDetailPage() {
  const { groupId } = useParams();

  return (
    <section className="route-page">
      <h1>그룹 상세</h1>
      <p>그룹 ID: {groupId}</p>
    </section>
  );
}

export default GroupDetailPage;
