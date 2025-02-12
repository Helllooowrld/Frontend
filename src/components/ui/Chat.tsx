const ChatComponent = () => {
  return (
    <div className="container mx-auto shadow-lg rounded-lg shadow-teal-400">
      <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
        <div className="font-semibold text-2xl">KhwopaChat</div>

        <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
          RA
        </div>
      </div>
      <div className="flex flex-row justify-between bg-white">
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col py-4 px-2 h-[calc(100vh-360px)] overflow-y-auto">
            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-teal-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white max-w-2xl">
                Welcome to group everyone !
              </div>
              <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                RA
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-teal-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white max-w-2xl">
                Welcome to group everyone !
              </div>
              <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                RA
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-teal-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white max-w-2xl">
                Welcome to group everyone !
              </div>
              <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                RA
              </div>
            </div>


            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-teal-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white max-w-2xl">
                Welcome to group everyone !
              </div>
              <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                RA
              </div>
            </div><div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-teal-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                at praesentium, aut ullam delectus odio error sit rem.
                Architecto nulla doloribus laborum illo rem enim dolor odio
                saepe, consequatur quas?
              </div>
              <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                RA
              </div>
            </div>



            <div className="flex justify-start mb-4">
              <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                BA
              </div>
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl max-w-2xl text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                at praesentium, aut ullam delectus odio error sit rem.
                Architecto nulla doloribus laborum illo rem enim dolor odio
                saepe, consequatur quas?
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <div>
                <div className="mr-2 py-3 px-4 bg-teal-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Magnam, repudiandae.
                </div>

                <div className="mt-4 mr-2 py-3 px-4 bg-teal-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Debitis, reiciendis!
                </div>
              </div>
              <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                RA
              </div>
            </div>
            <div className="flex justify-start mb-4">
              <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                BA
              </div>
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                happy holiday guys!
              </div>
            </div>
          </div>
          <div className="py-5">
            <input
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
