import { Button } from "./ui/button";

const PostCardLoadMore = () => {
  return (
    <div className="p-4 bg-teal-50 rounded-lg shadow-md relative">
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
      <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-300 rounded w-5/6 mb-4"></div>
      <div className="flex space-x-4">
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
      </div>
      <Button
        variant={"secondary"}
        className="text-lg absolute bottom-3 right-3"
      >
        Load More
      </Button>
    </div>
  );
};

export default PostCardLoadMore;
