import { Post } from "@lib/blog";
import { PostRow } from "../layout/PostRow";
import { IconFileText } from "@tabler/icons-react";

interface PostsProps {
  posts: Post[];
}

/**
 * Posts component displays a list of blog posts (already filtered server-side).
 */
export function Posts({ posts }: PostsProps) {
  return (
    <div className="space-y-6 pb-10">
      {posts.length > 0 ? (
        <div key="posts-list" className="space-y-6">
          {posts.map((post) => (
            <PostRow post={post} key={post.slug} />
          ))}
        </div>
      ) : (
        <div key="no-posts" className="group">
          <div className="border-slate-730 bg-slate-830 hover:border-slate-590 relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/5">
            <div className="flex h-40 flex-col items-center justify-center p-4 sm:h-48 sm:p-6 md:h-auto md:min-h-[200px]">
              <div className="space-y-3 text-center sm:space-y-4">
                <div className="bg-slate-730 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full sm:mb-4 sm:h-16 sm:w-16">
                  <IconFileText
                    size={24}
                    className="text-slate-400 sm:size-8"
                  />
                </div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  No posts found
                </h3>
                <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                  Try adjusting your filters or search query to find what you're
                  looking for.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
