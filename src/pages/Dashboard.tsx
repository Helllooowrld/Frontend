import { getPosts } from "@/api/posts";
import PostCard from "@/components/PostCard";
import PostCardLoadMore from "@/components/PostCardLoadMore";
import { Input } from "@/components/ui/input";
import { PostResponse } from "@/lib/typedef";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Ghost } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [cursor, setCursor] = useState<string>("");

  const { isPending, error, data, isLoading } =
    useQuery<PostResponse[]>({
      queryKey: ["posts", debouncedSearchTerm],
      queryFn: () => getPosts({ searchTerm: debouncedSearchTerm }),
    });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <div className="flex flex-col  mt-4 h-full w-full">
      <div className="flex flex-col mt-4 items-center justify-center">
        <Input
          className="max-w-2xl border-2 border-gray-300"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center flex-col h-full">
          <div className="flex items-center ">
            <span className="text-3xl mr-4">Loading</span>
            <svg
              className="animate-spin h-8 w-8 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      ) : (
        <>
          {data && data?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2  w-full p-5 gap-6 ">
              {data.map((post) => (
                <PostCard key={post.id} cardProp={post} />
              ))}
              {/* {data && data?.length >= 10 ? <PostCardLoadMore /> : null} */}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col h-full">
              <div className="flex items-center ">
                <Ghost className="h-8 w-8 mr-4" />
                <span className="text-3xl mr-4">
                  No data found please search again
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
