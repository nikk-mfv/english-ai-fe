type Props<T extends { iD: number }> = {
  object: T;
  refetch: () => void;
  handleDelete: (id: number) => Promise<void>;
};

export function Delete<T extends { iD: number }>({
  object,
  refetch,
  handleDelete,
}: Props<T>) {
  const submit = async () => {
    await handleDelete(object.iD);
    refetch();
  };

  return (
    <div>
      <button className="btn btn-error btn-soft btn-xs" onClick={submit}>
        Delete
      </button>
    </div>
  );
}
