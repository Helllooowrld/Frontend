import { updatePostApi, UpdatePostInputData } from "@/api/posts";
import { PostResponse } from "@/lib/typedef";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateAPost"],
    mutationFn: (updatePostData: UpdatePostInputData) =>
      updatePostApi(updatePostData),
    onMutate: async ({ id: postId, content, like }) => {
      await queryClient.cancelQueries({ queryKey: "posts" });
      // Snapshot the previous value
      const previousPosts =
        queryClient.getQueryData<PostResponse[]>(["posts", ""]) || [];

      const updateCache = (oldPosts: PostResponse[]) =>
        oldPosts?.map((post) =>
          post.id === postId
            ? {
                ...post,
                likesCount: like ? post.likesCount + 1 : post.likesCount,
                content: content || post.content,
              }
            : post
        );
      queryClient.setQueryData<PostResponse[]>(
        ["posts", ""],
        updateCache(previousPosts)
      );
      // Return a context object with the snapshot value
      return { previousPosts };
    },
    onError: (err, { id: postId }, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts", ""], context.previousPosts);
      }

      toast.error("Error while updating post");
    },
  });
};
