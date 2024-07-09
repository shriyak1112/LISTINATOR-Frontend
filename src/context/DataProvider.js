import React from 'react'
import { createContext , useState} from 'react'



export const DataContext = createContext(null);

const DataProvider = ({children}) => {
    const [notes,setNotes] =useState([]);
    const [archiveNotes,setArchiveNotes] =useState([]);
    const [showDelete, setShowDelete] = useState(localStorage.getItem("showDelete") === "true" ? true : false);
    const[showRem,setShowRem]=useState( localStorage.getItem("showRem") === "true" ? true : false);
  return (
    <DataContext.Provider value = {{
       notes,
       setNotes,
       archiveNotes,
       setArchiveNotes,
        showDelete,
        setShowDelete,
        showRem,
        setShowRem

    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;

