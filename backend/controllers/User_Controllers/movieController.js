const Movie = require('../../models/Movie');
const { fetchFromTMDB } = require('../../services/tmdb.service');

// Add Movie
exports.addMovie = async (req, res) => {
  const { title, genre, releaseDate, rating, description, duration, posterUrl, showtimes } = req.body;
  try {
    const newMovie = new Movie({
      title,
      genre,
      releaseDate,
      rating,
      description,
      duration,
      posterUrl,
      showtimes, // Accept showtimes from request body
    });
    await newMovie.save();
    res.status(201).json({ message: 'Movie added successfully', movieId: newMovie._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addShowtimes = async (req, res) => {
  const { id } = req.params;
  const { showtimes } = req.body; // Array of showtimes
  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    // Add new showtimes, avoiding duplicates
    const updatedShowtimes = [...new Set([...movie.showtimes, ...showtimes])];
    movie.showtimes = updatedShowtimes;
    await movie.save();

    res.status(200).json({ message: 'Showtimes added successfully', showtimes: movie.showtimes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Movie Details
exports.getMovieDetails = async (req, res) => {
  const { id } = req.params; // Use ObjectId instead of a custom field
  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrendingMovie=async(req,res)=>
{
  try{
    const data=await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US')
    const randomMovie = data.results[Math.floor(Math.random()*data.results?.length)];
    res.json({success:true,content:randomMovie});
  } catch(error)
  {
    res.status(500).json({success:false, message:"Internal Server Error"});
  }
};

exports.getTMDBMovieTrailers=async(req,res)=>
{
  const {id}=req.params;
  try{
    const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
    res.json({sucess:true,trailers:data.results});
  } catch(error)
  {
    if(error.message.included("404"))
      {
        return res.status(404).send(null);
      }
      res.status(500).json({success:false,message:"Internal Server Error"});
  }
}

exports.getTMDBMovieDetails=async(req,res)=>
{
  const {id}=req.params;
  try{
    const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
    res.status(200).json({success:true,content:data});
  } catch(error)
  {
    if(error.message.included("404"))
    {
      return res.status(404).send(null);
    }
    res.status(500).json({success:false,message:"Internal Server Error"});
  }
}

exports.searchMovie = async(req,res) =>
{
  const{query}=req.params;
  try{
    const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
    if(response.results.length===0)
    {
      return res.status(404).send(null);
    }
    res.status(200).json({success:true,content:response.results});
  } catch(error)
  {
    console.log("Error in search Movie",error.message);
    res.status(500).json({success:false,message:"Internal Server Error"});
  }
}