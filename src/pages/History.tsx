import { NavBar } from '@/components/navbar'

function History() {
    const history: Array<Record<string, Record<string, string>>>=[
        {
            "09-03-2025": {
                conversation1: "abc",
                conversation2: "xyz",
                },
            "08-03-2025": {
                conversation1: "wcs",
                conversation2: "ýeaq",
            },
    }];
    return (
        <>
        <NavBar/>
        
        <div className="flex flex-col justify-center items-center">
            <h1 className="p-10 text-2xl font-medium m-4">History</h1>
            {history.map((dayHistory,index) => (
                <div key={index}>
                    {Object.keys(dayHistory).map((day, dayIndex) => (
                        <div className='border-2 p-2 m-2 rounded-lg' key={dayIndex}>
                            <h2 className="font-medium">{day}</h2>
                            {Object.entries(dayHistory[day]).map(([key,value], conversationIndex)=> (
                                <p className="pl-3" key={conversationIndex} >
                                    {key}: {value}
                              </p>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
        </>
        
    );
}

export default History;