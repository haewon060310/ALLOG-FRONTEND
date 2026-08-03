import Button from '../Button/Button.jsx';

function ErrorState({ message = '오류가 발생했습니다.', onRetry }) {
  return (
    <section role="alert">
      <p>{message}</p>
      {onRetry && <Button onClick={onRetry}>다시 시도</Button>}
    </section>
  );
}

export default ErrorState;
