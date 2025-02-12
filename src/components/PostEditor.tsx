import {
  createPostApi,
  PostInputData,
  updatePostApi,
  UpdatePostInputData,
} from "@/api/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PostResponse } from "@/lib/typedef";
import { useUpdatePostMutation } from "@/hooks/updatePost";

const PostEditor = ({
  isDialogOpen,
  setIsDialogOpen,
  initialContent,
  isCreate,
  postId,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  initialContent: string;
  isCreate: boolean;
  postId?: string;
}) => {
  const [content, setContent] = useState(initialContent);

  // const extensions = [StarterKit];
  // const contentT = "<p>Hello World!</p>";
  const queryClient = useQueryClient();

  const { isPending, mutate: createPostMutation } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (content: PostInputData) => createPostApi(content),
    onSuccess: () => {
      toast.success("Post Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },

    onError: (error: any) => {
      handleMutationError(error);
    },
  });

  const {
    data,
    error,
    isPending: isUpdatePending,
    mutate: updatePostMutation,
  } = useUpdatePostMutation();

  const handleMutationError = (error: any) => {
    if (Array.isArray(error.message)) {
      error.message.forEach(({ message }: { message: string }) =>
        toast.error(message)
      );
    } else if (typeof error.message === "string") {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred.");
      console.error("Unexpected error structure:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSave = () => {
    if (isCreate) {
      // Call create mutation
      createPostMutation({ content });
    } else {
      // Call update mutation (postId is required for updates)
      if (!postId) {
        toast.error("Post ID is required to update the post.");
        return;
      }
      updatePostMutation({ id: postId, content });
    }
    setIsDialogOpen(false);
  };

  // const modules = {
  //   toolbar: [
  //     [{ size: [] }],
  //     ["bold", "italic", "underline"],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     ["link"],
  //   ],
  //   clipboard: {
  //     matchVisual: false,
  //   },
  // };
  return (
    <div className="flex justify-center flex-col items-end">
      <div className="w-[100%] flex justify-center items-center flex-col mb-4">
        <Input
          placeholder="Write something unique"
          onChange={handleChange}
          defaultValue={content}
        />
      </div>
      <Button
        onClick={handleSave}
        type="submit"
        disabled={isPending || isUpdatePending}
      >
        Save changes
      </Button>
    </div>
  );
};

export default PostEditor;
