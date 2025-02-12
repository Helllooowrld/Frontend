import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import PostEditor from "./PostEditor";
import { Edit } from "lucide-react";

export function CreatePost({
  isCreate,
  postContent,
  postId,
}: {
  isCreate: boolean;
  postContent: string;
  postId?: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {isCreate ? (
          <Button size={"lg"}>Create post</Button>
        ) : (
          <Button className="h-3 w-3 hover:bg-transparent" variant={"ghost"}>
            <Edit className="stroke-red-500" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[100%]">
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Create a post" : "Update Post"}
          </DialogTitle>
          <DialogDescription>
            {isCreate
              ? "Create a new post to make it available to dashboard."
              : "Update your post"}
          </DialogDescription>
        </DialogHeader>
        <PostEditor
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          initialContent={isCreate ? "" : postContent}
          isCreate={isCreate}
          postId={postId}
        />
      </DialogContent>
    </Dialog>
  );
}
