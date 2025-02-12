import { PostResponse } from "@/lib/typedef";
import { format, formatDistance } from "date-fns";
import { Edit, Heart, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostApi, updatePostApi, UpdatePostInputData } from "@/api/posts";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth";
import { CreatePost } from "./CreatePost";
import { useUpdatePostMutation } from "@/hooks/updatePost";

const PostCard = ({ cardProp }: { cardProp: PostResponse }) => {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isPending,
    mutate: postUpdate,
  } = useUpdatePostMutation();

  const { isPending: isDeletePending, mutate: deleteSinglePost } = useMutation({
    mutationKey: ["deleteAPost"],
    mutationFn: (id: string) => deletePostApi(id),
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Error while deleting post");
    },
  });
  const { user } = useAuth();

  return (
    <div className="bg-teal-100 border-2 shadow-lg rounded-lg max-w-md md:max-w-2xl p-5 h-max">
      <div className="">
        <div className="flex items-center justify-between">
          {cardProp.content}
          <div className="px-4 text-sm text-gray-700">
            {formatDistance(cardProp.createdAt, new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
        <p className="mt-3 text-gray-700 text-md">
          <span className="text-xs">PostedBy</span>:{cardProp.author.fullName}
        </p>
        <p className="text-gray-700 text-xs">
          Joined {format(cardProp.author.createdAt, "do MMM yyyy")}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex mr-2 text-gray-700 text-sm ">
            <Button
              className="h-3 w-3 hover:bg-transparent"
              variant={"ghost"}
              onClick={() => postUpdate({ id: cardProp.id, like: true })}
              disabled={isPending}
            >
              <Heart className="stroke-red-500" />
            </Button>
            <span>{cardProp.likesCount}</span>
          </div>
          <div>
            {/* <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg> */}

            {cardProp.author.id === user.userId && (
              <CreatePost
                isCreate={false}
                postContent={cardProp.content}
                postId={cardProp.id}
              />
            )}
            {cardProp.author.id === user.userId && (
              <Button
                className="h-3 w-3 hover:bg-transparent"
                variant={"ghost"}
                disabled={isDeletePending}
                onClick={() => deleteSinglePost(cardProp.id)}
              >
                <Trash className="stroke-red-500" />
              </Button>
            )}
          </div>
          {/* <div className="flex mr-2 text-gray-700 text-sm">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <span>8</span>
          </div>
          <div className="flex mr-2 text-gray-700 text-sm">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span>share</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
