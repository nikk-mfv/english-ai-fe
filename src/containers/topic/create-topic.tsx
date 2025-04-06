import { useCreateTopic, useGetTopics } from "@/hooks/use-topic";

import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

export function CreateTopic() {
  const { topics, handleGetTopics } = useGetTopics();
  const { name, handleCreateTopic, handleInputChange } =
    useCreateTopic(handleGetTopics);
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold p-5">Create your new topic</h1>
        <div className="max-w-sx">
          <Input
            type="text"
            className="w-full mb-2"
            placeholder="input your topic"
            onChange={handleInputChange}
            value={name}
          />
          <Button className="w-full" onClick={handleCreateTopic}>
            Create
          </Button>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold m-4">Topic List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg :grid-cols-5 gap-4 m-4">
          {topics.map((topic) => (
            <div
              key={topic.name}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg "
            >
              <h2 className="text-xl font-semibold">{topic.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
