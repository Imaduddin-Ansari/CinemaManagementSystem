import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL="http://cinema-backend:3000/api";

export const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTrendingContent = async () => {
            try {
                const res = await axios.get(`${API_URL}/movies/toprated`, {
                    withCredentials: true,
                  });
                  
                console.log("API Response:", res.data);
                setTrendingContent(res.data.content);
                setLoading(false); // Data has been fetched, set loading to false
            } catch (err) {
                setError('Failed to fetch trending content');
                setLoading(false); // Even if there's an error, stop loading
            }
        };

        getTrendingContent();
    }, []); // Empty array means this effect only runs once on mount

    return { trendingContent, loading, error };
};
