import { ITopic } from "@/services/topic";

type TopicProps = {
  topic: ITopic;
};

export function TopicDetail({ topic }: TopicProps) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold">{topic.name}</h2>
      </div>
    </div>
  );
}
