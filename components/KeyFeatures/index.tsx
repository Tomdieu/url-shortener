export default function KeyFeatures() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 dark:bg-stone-900">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 text-sm md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our key features provide you with everything you need for easy and effective URL management.
                </p>
              </div>
            </div>
            {/* <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="kf">
                <h3 className="text-base md:text-lg font-bold">Shorten URLs</h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  Create shorter, more manageable URLs with our simple and easy-to-use interface.
                </p>
              </div>
              <div className="kf">
                <h3 className="text-base md:text-lg font-bold">Track Clicks</h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  Monitor URL performance and gather insights with our robust analytics tools.
                </p>
              </div>
              <div className="kf">
                <h3 className="text-base md:text-lg font-bold">Share URLs</h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  Share your URLs across all platforms with a single click.
                </p>
              </div>
            </div> */}
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
  <div className="kf flex flex-col justify-between h-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h3 className="text-base md:text-lg font-bold">Shorten URLs</h3>
    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
      Create shorter, more manageable URLs with our simple and easy-to-use interface.
    </p>
  </div>
  <div className="kf flex flex-col justify-between h-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h3 className="text-base md:text-lg font-bold">Track Clicks</h3>
    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
      Monitor URL performance and gather insights with our robust analytics tools.
    </p>
  </div>
  <div className="kf flex flex-col justify-between h-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h3 className="text-base md:text-lg font-bold">Share URLs</h3>
    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
      Share your URLs across all platforms with a single click.
    </p>
  </div>
</div>

          </div>
        </section>
    )
}