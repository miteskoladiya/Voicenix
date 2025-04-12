import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { AIModelToGenerateFeedbackAndNotes } from "@/services/GlobalServices";
import { useMutation } from "convex/react";
import { LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const ChatBox = ({ conversation, enableFeedbackNotes, coachingOptions }) => {
  const [loading, setLoading] = React.useState(false);
  const { roomid } = useParams();

  const updateSummery = useMutation(api.DiscussionRoom.UpdateSummery);

  const GenerateFeedbackNotes = async () => {
    setLoading(true);

    try {
      const result = await AIModelToGenerateFeedbackAndNotes(
        coachingOptions,
        conversation
      );
      console.log(result);


      await updateSummery({ id: roomid, summery: result });
      setLoading(false);
      toast("Feedback/Notes Saved Successfully" );
    } catch (e) {
      setLoading(false);
      toast("Something went wrong, please try again")
      console.log(e);
    }
  };

  return (
    <div>
      <div className="h-[60vh] bg-secondary border rounded-xl flex flex-col relative p-4 overflow-auto scrollbar-hide">
        {/* <div> */}
        {conversation.map((item, index) => (
          <div
            key={index}
            className={`flex ${item.role == "user" && "justify-end"}`}
          >
            {item.role === "assistant" ? (
              <h2 className="p-1 px-2 bg-primary text-white inline-block mt-2 rounded-md">
                {item.content}
              </h2>
            ) : (
              <h2 className="p-1 px-2 mt-2 bg-gray-200  inline-block rounded-md">
                {item?.content}
              </h2>
            )}
          </div>
        ))}
        {/* </div> */}
      </div>
      {!enableFeedbackNotes ? (
        <h2 className="mt-4 text-gray-400 text-sm">
         
        </h2>
      ) : (
        <Button
          className="mt-7 w-full"
          onClick={GenerateFeedbackNotes}
          diabled={loading}
        >
          {loading && <LoaderCircle className="animate-spin" />}
          Generate Feedback/Notes
        </Button>
      )}
    </div>
  );
};

export default ChatBox;
