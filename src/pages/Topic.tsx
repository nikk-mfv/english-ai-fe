import { CreateTopic } from "@/containers/topic/create-topic";
import { TopicDetail } from "@/containers/topic/topic-detail";
import { useGetTopics } from "@/hooks/use-topic";
import { Pagination } from "@/components/pagination";

export default function Topic() {
  const { topics,totalTopics, handleGetTopics } = useGetTopics();

  return (
    <div>
      <CreateTopic handleGetTopics={handleGetTopics} />

      <h1 className="text-2xl font-bold mt-10 text-center">Topic List</h1>
      {topics.length === 0 ? (
        <div className="text-xl font-semibold m-4 text-center">No topic has found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 m-4">
          {topics.map(topic => (
            <TopicDetail key={topic.iD} topic={topic} />
          ))}
        </div>
      )}

      <Pagination total={totalTopics} onChange={handleGetTopics} />
    </div>
  );
}
