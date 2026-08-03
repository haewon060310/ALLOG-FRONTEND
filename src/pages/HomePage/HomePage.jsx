import { Link } from 'react-router-dom';
import {
  ROUTES,
  createChallengeDetailPath,
  createChallengeVerifyPath,
  createGroupDetailPath,
  createRetryMissionPath,
  createVerificationDetailPath,
} from '../../constants/routes.js';
import './HomePage.css';

function HomePage() {
  return (
    <section className="home-page">
      <p className="home-page__eyebrow">React + Vite</p>
      <h1>ALLLOG 프로젝트를 시작합니다.</h1>
      <p>필요한 기능을 명확한 역할별 폴더에 확장할 수 있습니다.</p>

      <nav aria-label="페이지 이동">
        <ul className="home-page__links">
          <li><Link to={ROUTES.LOGIN}>로그인</Link></li>
          <li><Link to={ROUTES.SIGNUP}>회원가입</Link></li>
          <li><Link to={ROUTES.ONBOARDING}>온보딩</Link></li>
          <li><Link to={ROUTES.GROUPS}>그룹 목록</Link></li>
          <li><Link to={ROUTES.REWARDS}>리워드</Link></li>
          <li><Link to={ROUTES.RETRY}>재도전</Link></li>
          <li><Link to={ROUTES.PROFILE}>프로필</Link></li>
          <li><Link to={ROUTES.SETTINGS}>설정</Link></li>
          <li><Link to={ROUTES.OPERATOR_REVIEWS}>운영자 검토</Link></li>
          <li><Link to={createGroupDetailPath('group-1')}>그룹 상세 예시</Link></li>
          <li><Link to={createChallengeDetailPath('challenge-1')}>챌린지 상세 예시</Link></li>
          <li><Link to={createChallengeVerifyPath('challenge-1')}>챌린지 인증 예시</Link></li>
          <li><Link to={createVerificationDetailPath('verification-1')}>인증 상세 예시</Link></li>
          <li><Link to={createRetryMissionPath('mission-1')}>재도전 미션 예시</Link></li>
        </ul>
      </nav>
    </section>
  );
}

export default HomePage;
