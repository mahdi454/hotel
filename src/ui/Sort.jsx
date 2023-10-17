import { useSearchParams } from "react-router-dom";
import Select from "./Select";
function Sort({ field, options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy=searchParams.get("sortBy") || ""

    function handleSelect(e){
        searchParams.set(field,e.target.value)
        setSearchParams(searchParams)
    }


    return (
      <Select options={options} type="white" value={sortBy} onChange={handleSelect}/>
    )
}

export default Sort