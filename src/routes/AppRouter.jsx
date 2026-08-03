import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';
import ChallengePage from '../pages/ChallengePage/ChallengePage.jsx';
import GroupDetailPage from '../pages/GroupDetailPage/GroupDetailPage.jsx';
import GroupListPage from '../pages/GroupListPage/GroupListPage.jsx';
import HomePage from '../pages/HomePage/HomePage.jsx';
import LoginPage from '../pages/LoginPage/LoginPage.jsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';
import OnboardingPage from '../pages/OnboardingPage/OnboardingPage.jsx';
import OperatorReviewPage from '../pages/OperatorReviewPage/OperatorReviewPage.jsx';
import ProfilePage from '../pages/ProfilePage/ProfilePage.jsx';
import RetryMissionPage from '../pages/RetryMissionPage/RetryMissionPage.jsx';
import RetryPage from '../pages/RetryPage/RetryPage.jsx';
import RewardsPage from '../pages/RewardsPage/RewardsPage.jsx';
import SettingsPage from '../pages/SettingsPage/SettingsPage.jsx';
import SignupPage from '../pages/SignupPage/SignupPage.jsx';
import VerificationDetailPage from '../pages/VerificationDetailPage/VerificationDetailPage.jsx';
import VerificationSubmitPage from '../pages/VerificationSubmitPage/VerificationSubmitPage.jsx';

function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
      <Route path={ROUTES.GROUPS} element={<GroupListPage />} />
      <Route path={ROUTES.GROUP_DETAIL} element={<GroupDetailPage />} />
      <Route path={ROUTES.CHALLENGE_DETAIL} element={<ChallengePage />} />
      <Route
        path={ROUTES.CHALLENGE_VERIFY}
        element={<VerificationSubmitPage />}
      />
      <Route
        path={ROUTES.VERIFICATION_DETAIL}
        element={<VerificationDetailPage />}
      />
      <Route path={ROUTES.REWARDS} element={<RewardsPage />} />
      <Route path={ROUTES.RETRY} element={<RetryPage />} />
      <Route path={ROUTES.RETRY_MISSION} element={<RetryMissionPage />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
      <Route
        path={ROUTES.OPERATOR_REVIEWS}
        element={<OperatorReviewPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
