import { ITopic } from "@/services/topic";
import { useState } from "react";
import { useUpdateTopic } from "@/hooks/use-topic";
type TopicProps = {
  topic: ITopic;
  editTopic: (topic: ITopic) => void;
};

export function TopicDetail({ topic, editTopic }: TopicProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTopic, setNewTopic] = useState<ITopic>(topic);
  const { handleUpdateTopic } = useUpdateTopic();

  const cancelEdit = () => {
    setIsEditing(false);
    setNewTopic(topic);
  };

  const edit = async () => {
  
  await handleUpdateTopic(topic.iD, newTopic);
  editTopic(newTopic);
  setIsEditing(false);
  };

  return (
    <>
      <div className="card w-60 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="card-body">
          {isEditing ? (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Name</legend>
                <input
                  type="text"
                  className="input input-neutral w-full"
                  value={newTopic.name}
                  onChange={(e) =>
                    setNewTopic({ ...newTopic, name: e.target.value})
                  }
                />
              </fieldset>
            </>
          ) : (
            <>
              <h2 className="card-title">{topic.name}</h2>
            </>
          )}

          <div className="card-actions">
            {isEditing ? (
              <>
                <button
                  className="btn btn-error btn-xs btn-outline"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success btn-xs btn-outline"
                  onClick={edit}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-outline btn-xs" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );


}
