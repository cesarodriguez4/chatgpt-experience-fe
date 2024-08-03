'use client';

import Typewriter from 'typewriter-effect';
export const ReceiverMessage = ({message}: {message: string}) =>
    (
       <div className="flex justify-end mr-12">
           <div className="flex flex-col items-end">
               <div className="flex items-center justify-end">
                   <div className="p-4 bg-gray-100 rounded-lg dark:bg-neutral-800/30">
                          <Typewriter
                            options={
                                {
                                    loop: false,
                                    delay: 10,
                                }
                            }
                            onInit={(typewriter) => {
                                typewriter.typeString(message)
                                    .start();
                            }
                            }
                          />
                    </div>
               </div>
           </div>
       </div>
);