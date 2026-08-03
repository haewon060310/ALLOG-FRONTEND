function EmptyState({
  title = '표시할 내용이 없습니다.',
  description,
  action,
}) {
  return (
    <section>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action && <div>{action}</div>}
    </section>
  );
}

export default EmptyState;
