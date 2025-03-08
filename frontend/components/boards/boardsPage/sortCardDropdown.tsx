

interface SortCardDropdownProps {
    setSort: (open: boolean) => void;
    handleSort: (type: string) => void
}


export default function SortCardDropdown({ setSort, handleSort }: SortCardDropdownProps) {


    return (
        <div
            className="absolute right-0 bg-white border rounded shadow-md min-w-max"
            onMouseEnter={() => setSort(true)}
            onMouseLeave={() => setSort(false)}
        >
            <div 
                className="px-4 py-2 hover:bg-blue-400 hover:text-white cursor-pointer" 
                onClick={() => handleSort("creation")}
            >
                <p>Creation date</p>
            </div>
            <div 
                className="px-4 py-2 hover:bg-blue-400 hover:text-white cursor-pointer" 
                onClick={() => handleSort("due")}
            >
                <p>Due date</p>
            </div>
            <div 
                className="px-4 py-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                onClick={() => handleSort("priority")}
            >
                <p>Priority</p>
            </div>

        </div>
    )
}
