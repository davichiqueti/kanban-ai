

interface SortCardDropdownProps {
    setSort: (open: boolean) => void;
}


export default function SortCardDropdown({ setSort }: SortCardDropdownProps){


    return(
        <div
            className="absolute right-0 bg-white border rounded shadow-md p-2"
            onMouseEnter={() => setSort(true)}
            onMouseLeave={() => setSort(false)}
        >
            textooo

        </div>
    )
}
