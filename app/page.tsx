export default function Home() {
  return (
    <main className="bg-gray-200 h-screen flex items-center justify-center p-5  dark:bg-gray-700">
      <div className="bg-white w-full shadow-lg rounded-2xl p-5 max-w-screen-sm dark:bg-gray-600">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-gray-600 font-semibold -mb-1 dark:text-gray-200">
              In transit
            </span>
            <span className="text-4xl font-semibold dark:text-white">
              Coolblue
            </span>
          </div>
          <div className="size-12 bg-orange-500 rounded-full"></div>
        </div>
        <div className="my-2 flex items-center gap-2">
          <span className="text-white bg-green-400 uppercase px-2.5 py-1.5 text-xs font-medium rounded-full hover:bg-green-500 hover:scale-105 transition">
            Today
          </span>
          <span className="dark:text-white">9:30-10:30u</span>
        </div>
        <div className="relative">
          <div className="bg-gray-200 w-full h-2 rounded-full absolute"></div>
          <div className="bg-green-400 w-2/3 h-2 rounded-full absolute"></div>
        </div>
        <div className="flex justify-between items-center mt-5 dark:text-gray-300">
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className="text-gray-400 dark:text-gray-400">Delivered</span>
        </div>
      </div>
    </main>
  );
}
