import Button from '../Button/Button.jsx';

function ConfirmDialog({
  open,
  title = '확인이 필요합니다.',
  message,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <section role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <h2 id="confirm-title">{title}</h2>
      {message && <p>{message}</p>}
      <div>
        <Button onClick={onCancel}>{cancelLabel}</Button>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </section>
  );
}

export default ConfirmDialog;
