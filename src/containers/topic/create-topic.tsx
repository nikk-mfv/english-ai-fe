import { useCreateTopic } from "@/hooks/use-topic";

export function CreateTopic({
  handleGetTopics,
}: {
  handleGetTopics: () => void;
}) {
  const { name, setName, handleCreateTopic } = useCreateTopic();

  const createTopic = async () => {
    await handleCreateTopic();
    
    // Call the handleGetTopics function to refresh the topics list
    handleGetTopics();
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold p-5">Create your new topic</h1>
        <div className="max-w-sx">
          <input
            id="name"
            value={name}
            className="w-full mb-2"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={createTopic}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
