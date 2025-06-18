import { CreateTopic } from "@/containers/topic/create-topic";
import { TopicDetail } from "@/containers/topic/topic-detail";
import { useGetTopics, useDeleteTopic } from "@/hooks/use-topic";
import { Pagination } from "@/components/pagination";
import { ITopic } from "@/services/topic";
import { Delete } from "@/components/delete";

export default function Topic() {
  const { topics, totalTopics, handleGetTopics, setTopics } = useGetTopics();

  const handleEditTopic = async (topic: ITopic) => {
    setTopics((old) => old.map((t) => (t.iD === topic.iD ? topic : t)));
    handleGetTopics();
  };

  const handleRemoveTopic = async (topic: ITopic) => {
    setTopics((old) => old.filter((t) => t.iD !== topic.iD));
    handleGetTopics();
  };

  const { handleDeleteTopic } = useDeleteTopic();

  return (
    <div>
      <CreateTopic handleGetTopics={handleGetTopics} />

      <h1 className="text-2xl font-bold mt-10 text-center">Topic List</h1>
      {topics.length === 0 ? (
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-center">
            No topic has found
          </p>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <div className="grid grid-cols-2 gap-4 m-4">
            {topics.map((topic) => (
              <TopicDetail
                key={topic.iD}
                topic={topic}
                removeTopic={handleRemoveTopic}
                editTopic={handleEditTopic}
              >
                <>
                  <Delete<ITopic>
                    object={topic}
                    refetch={handleGetTopics}
                    handleDelete={handleDeleteTopic}
                  />
                </>
              </TopicDetail>
            ))}
          </div>
        </div>
      )}

      <Pagination total={totalTopics} onChange={handleGetTopics} />
    </div>
  );
}
