/**
 * Fallback skeleton loading for the blog page.
 */
export const BlogLoadingFallback = () => {
  return (
    <div className="relative min-h-screen pt-16">
      <div className="container mx-auto px-4 py-10">
        {/* Mobile search and filter controls - invisible but preserves height */}
        <div className="mb-8 lg:hidden">
          <div className="flex gap-3">
            <div className="h-12 flex-1 opacity-0"></div>
            <div className="h-12 w-12 opacity-0"></div>
          </div>
        </div>

        {/* Desktop layout with grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-14 lg:gap-10">
          {/* Left sidebar - invisible but preserves space */}
          <aside className="hidden lg:col-span-3 lg:block xl:col-span-3">
            <div className="sticky top-24">
              <div className="opacity-0">
                {/* Profile section */}
                <div className="mb-8">
                  <div className="mb-6 flex justify-center">
                    <div className="h-32 w-32"></div>
                  </div>
                  <div className="mx-auto mb-2 h-6 w-3/4"></div>
                  <div className="mx-auto mb-1 h-4 w-1/2"></div>
                  <div className="mx-auto mb-2 h-4 w-2/3"></div>

                  {/* Social links */}
                  <div className="mt-6 flex justify-center gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-10 w-10"></div>
                    ))}
                  </div>
                </div>

                {/* Blog title */}
                <div className="mb-6">
                  <div className="mb-2 h-8 w-20"></div>
                  <div className="h-1 w-20"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-full"></div>
                    <div className="h-3 w-4/5"></div>
                  </div>
                </div>

                {/* Navigation buttons */}
                <div className="space-y-2">
                  <div className="h-12 w-full"></div>
                  <div className="h-12 w-full"></div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content - invisible but preserves height */}
          <main className="lg:col-span-8 xl:col-span-8">
            <div className="space-y-6 pb-10 opacity-0">
              {[...Array(1)].map((_, i) => (
                <div key={i}>
                  <div className="flex flex-col md:flex-row">
                    {/* Image placeholder */}
                    <div className="h-48 w-full md:h-auto md:w-1/3"></div>

                    {/* Content placeholder */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="h-6 w-4/5"></div>
                            <div className="h-6 w-3/5"></div>
                          </div>
                          <div className="h-5 w-5"></div>
                        </div>

                        <div className="space-y-2">
                          <div className="h-4 w-full"></div>
                          <div className="h-4 w-4/5"></div>
                          <div className="h-4 w-3/5"></div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-4">
                        {/* Meta info */}
                        <div className="flex items-center gap-6">
                          <div className="h-4 w-24"></div>
                          <div className="h-4 w-20"></div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {[...Array(3)].map((_, j) => (
                            <div key={j} className="h-6 w-16"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Right sidebar - invisible but preserves space */}
          <aside className="hidden lg:col-span-3 lg:block xl:col-span-3">
            <div className="sticky top-24">
              <div className="opacity-0">
                {/* Search */}
                <div className="mb-3">
                  <div className="h-12 w-full"></div>
                </div>

                {/* Filters */}
                <div className="space-y-4">
                  {/* Tags section */}
                  <div className="border-b border-transparent pb-4">
                    <div className="mb-3 h-6 w-16"></div>
                    <div className="flex flex-wrap gap-2">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-7 w-20"></div>
                      ))}
                    </div>
                  </div>

                  {/* Years section */}
                  <div className="border-b border-transparent pb-4">
                    <div className="mb-3 h-6 w-16"></div>
                    <div className="flex flex-wrap gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-7 w-16"></div>
                      ))}
                    </div>
                  </div>

                  {/* Featured checkbox */}
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4"></div>
                    <div className="h-4 w-32"></div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-6 flex gap-3">
                  <div className="h-12 flex-1"></div>
                  <div className="h-12 flex-1"></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
