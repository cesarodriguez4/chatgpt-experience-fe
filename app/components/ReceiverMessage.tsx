export const ReceiverMessage = ({message}: {message: string}) =>
    (
       <div className="flex justify-end mr-12">
           <div className="flex flex-col items-end">
               <div className="flex items-center justify-end">
                   <p className="p-4 bg-gray-100 rounded-lg dark:bg-neutral-800/30">{message}</p>
               </div>
           </div>
       </div>
);