import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navbar } from "../../components/Navbar";
import axios from 'axios';
import {ChevronLeft, ChevronRight} from 'lucide-react'
import ReactPlayer from 'react-player'
import { ORIGINAL_IMG_BASE_URL } from '../../utils/constants';

function formatReleaseDate(date)
{
    return new Date(date).toLocaleDateString("en-US",{
        year:"numeric",
        month:"long",
        day:"numeric",
    })
}

export const WatchPage = () => {
  const {id}=useParams();
  const [trailers,setTrailers]=useState([]);
  const[currentTrailerIdx,setCurrentTrailerIdx]=useState(0);
  const [loading,setLoading]=useState(true);
  const [content,setContent]=useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  useEffect(()=>{
    const getTrailers=async()=>{
        try{
            const res=await axios.get(`http://localhost:3000/api/movies/${id}/trailers`);
            setTrailers(res.data.trailers);
        } catch(error)
        {
            if(error.message.includes('404'))
            {
                setTrailers([]);
            }
        }
    };
    getTrailers();

  },[id]);

  useEffect(()=>{
    const getMovieDetails=async()=>{
        try{
            const res=await axios.get(`http://localhost:3000/api/movies/${id}/details`);
            setContent(res.data.content);
        } catch(error)
        {
            if(error.message.includes('404'))
            {
                setContent([]);
            }
        } finally {
            setLoading(false);
        }
    };
    getMovieDetails();

  },[id]);

  const handleNext=()=>{
    if(currentTrailerIdx<trailers.length-1)
        {
            setCurrentTrailerIdx(currentTrailerIdx+1)
        }
  }
  const handlePrev=()=>{
    if(currentTrailerIdx>0)
    {
        setCurrentTrailerIdx(currentTrailerIdx-1)
    }
  }

  if(loading) return (
    <div className='min-h-screen bg-black pg-10'>

    </div>
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-black to-red-950'>
        <Navbar onSearch={handleSearch}/>
        <div className='absolute top-24 bg-gradient-to-br from-black to-red-950 min-h-screen w-full left-0 text-white font-poppins'>
            <div className='mx-auto container px-4 py-8 h-full '>
                {trailers.length > 0 && (
                    <div className='flex justify-between items-center mb-4'>
                        <button className={`bg-red-800 hover:bg-red-900 text-white py-2 px-4 rounded ${currentTrailerIdx===0? 'opacity-50 curser-not-allowed' : ""}`}
                         disabled={currentTrailerIdx==0}
                         onClick={handlePrev}
                         >
                            <ChevronLeft size={24}
                            />
                        </button>
                        <button className={`bg-red-800 hover:bg-red-900 text-white py-2 px-4 rounded ${currentTrailerIdx===trailers.length-1? 'opacity-50 curser-not-allowed' : ""}`}
                         disabled={currentTrailerIdx===trailers.length-1}
                         onClick={handleNext}
                         >
                            <ChevronRight size={24}
                            />
                        </button>
                    </div>
                )}
                <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
                {trailers.length > 0 && (
                    <ReactPlayer 
                    controls={true}
                    width={"100%"}
                    height={"70vh"}
                    className="mx-auto overflow-hidden"
                    url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                    />
                )}

                {trailers?.length===0 && (
                    <h2 className='text-xl text-center mt-5'>
                        No Trailers Available For {" "}
                        <span className='font-bold text-red-600'>{content?.title || content?.name}</span>
                    </h2>
                )}
                </div>

                {/* Movie Details */}
                <div className='flex flex-col items-center justify-between max-w-6xl mx-auto'>
                        <div className='ml-32 mb-4 md:mb-0 flex flex-col md:flex-row gap-8'>
                            <div className='mb-4 md:mb-0'>
                                <h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>
                                <p className='mt-2 text-lg'>
                                    {formatReleaseDate(content?.release_date)} |
                                    {" "}
                                    {content?.adult ? (
                                        <span className='text-red-600'>18+</span>
                                    ) : (
                                        <span className='text-green-600'>PG-13</span>
                                    )}
                                </p>
                                <p className='mt-4 text-lg'>
                                    {content?.overview}
                                </p>
                            </div>
                            <div>
                                <img src={ORIGINAL_IMG_BASE_URL + content?.poster_path} alt="Poster Image" className='h-4/5 rounded-md' />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}
