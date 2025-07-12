import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function Notes() {
    const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/note`;
    const [data, setData] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl);

                if (!response.ok) {
                    throw new Error("Faild to fetch data")
                }

                const data = await response.json();
                setData(data);
                setIsLoading(false);


            } catch (error) {
                setError("Error fetching data.please try again later");
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);



    return (
        <div>

            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>


        </div>
    );
}

export default Notes;
