export const SenderMessage = ({message}: {message: string}) =>
     (
        <div className="flex justify-end w-full">
            <div className="flex flex-col items-end">
                <div className="flex items-center justify-end">
                    <p className="p-4 bg-gray-200 rounded-lg border dark:bg-neutral-800/30">{message}</p>
                </div>
            </div>
        </div>
);