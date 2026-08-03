import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <section className="route-page">
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>요청한 경로가 존재하지 않습니다.</p>
      <Link to={ROUTES.HOME}>홈으로 이동</Link>
    </section>
  );
}

export default NotFoundPage;
