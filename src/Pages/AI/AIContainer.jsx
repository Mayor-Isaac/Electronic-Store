import React from 'react'
import useFetch from '../../hooks/useFetch';
import { getAIConversations } from '../../services/aiAPI';
import { RiRobot2Fill } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { CiImageOn } from 'react-icons/ci';
import { formatDate } from '../../utils/formatDate';

export default function AIContainer() {
    const { isPending, error, data } = useFetch({
      queryFn: getAIConversations,
      key: "aiConversations",
    });

    console.log("data===>",data);
    
  return (
    <div className="flex-1 h-full overflow-hidden flex flex-col gap-3 text-[14px]">
      <div className="flex-1 overflow-y-auto">
        {data?.map((conversation, index) => (
          <div key={index} className="p-4 flex flex-col gap-2.5">
            <div className="max-w-3/4 w-fit ml-auto px-4 py-3 rounded-[8px] text-[#112A46] bg-[#ACC8E5]">
              {conversation?.question}
            </div>
            <div className="flex items-center gap-4">
              <RiRobot2Fill size={30} />
              <div className="max-w-3/4 w-fit px-4 py-3 rounded-[8px] bg-[#243D47]">
                {conversation?.answer}
              </div>
            </div>
            <p className="text-[#91B8C9] text-right text-[12px]">
              {formatDate(conversation?.timestamp)}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 p-4 ">
        <div className="flex-1 border bg-[#243D47] rounded-[8px] px-4 py-3 text-[#91B8C9] relative">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="bg-transparent outline-none w-full"
          />
          <CiImageOn
            size={25}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[#91B8C9] cursor-pointer hover:scale-105 transition ease-in-out"
          />
        </div>
        <div className="flex items-center justify-center p-4 rounded-full bg-[#ACC8E5] hover:bg-[#fff] hover:text-[#ACC8E5] cursor-pointer transition ease-in-out">
          <FiSend size={20} />
        </div>
      </div>
    </div>
  );
}
