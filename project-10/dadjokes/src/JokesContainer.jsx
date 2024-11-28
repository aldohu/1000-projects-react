import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JokesContainer.css';

const JokesContainer = () => {
	const [jokes, setJokes] = useState([]);
	const [likes, setLikes] = useState([]); // State to track likes
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const savedJokes = JSON.parse(localStorage.getItem('jokes')) || [];
		const savedLikes = JSON.parse(localStorage.getItem('likes')) || [];
		setJokes(savedJokes);
		setLikes(savedLikes);
	}, []);

	// Save jokes and likes to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem('jokes', JSON.stringify(jokes));
		localStorage.setItem('likes', JSON.stringify(likes));
	}, [jokes, likes]);
	useEffect(() => {
		const fetchJokes = async () => {
			try {
				setLoading(true);
				const jokePromises = Array.from({ length: 10 }, () =>
					axios.get('https://icanhazdadjoke.com/', {
						headers: { Accept: 'application/json' },
					}),
				);

				const jokeResponses = await Promise.all(jokePromises);
				const jokesData = jokeResponses.map((res) => res.data.joke);
				setJokes(jokesData);
				setLikes(Array(jokesData.length).fill(0)); // Initialize likes with 0 for each joke
			} catch (err) {
				setError('Failed to fetch jokes. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchJokes();
	}, []);

	const getJokes = async () => {
		try {
			setLoading(true);

			const jokePromises = Array.from({ length: 10 }, () =>
				axios.get('https://icanhazdadjoke.com/', {
					headers: { Accept: 'application/json' },
				}),
			);

			const jokeResponses = await Promise.all(jokePromises);
			const newJokes = jokeResponses.map((res) => res.data.joke);

			setJokes((prevJokes) => {
				const combinedJokes = [...prevJokes];
				const combinedLikes = [...likes];

				// Add new jokes if not already in the list
				newJokes.forEach((joke) => {
					if (!prevJokes.includes(joke)) {
						combinedJokes.push(joke);
						combinedLikes.push(0); // Initialize likes for new jokes
					}
				});

				// Filter jokes with likes
				const jokesWithLikes = combinedJokes
					.map((joke, index) => ({ joke, like: combinedLikes[index] }))
					.filter((item) => item.like > 0);

				// Fill remaining slots with unliked jokes
				const unlikedJokes = combinedJokes
					.map((joke, index) => ({ joke, like: combinedLikes[index] }))
					.filter((item) => item.like === 0);

				// Combine liked and unliked jokes, limit to 10
				const finalJokes = [...jokesWithLikes, ...unlikedJokes].slice(0, 10);

				// Update jokes and likes in sync
				const updatedJokes = finalJokes.map((item) => item.joke);
				const updatedLikes = finalJokes.map((item) => item.like);

				setLikes(updatedLikes);
				return updatedJokes;
			});
		} catch (err) {
			setError('Failed to fetch jokes. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	const incrementLike = (index) => {
		setLikes((prevLikes) =>
			prevLikes.map((like, i) => (i === index ? like + 1 : like)),
		);
	};
	const decrementLike = (index) => {
		setLikes((prevLikes) =>
			prevLikes.map((like, i) => (i === index ? Math.max(0, like - 1) : like)),
		);
	};

	if (loading) return <div>Loading jokes...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="jokes-container">
			<div className="header">
				<h1>Dad Jokes</h1>
				<div className="smiley-favicon">😂</div>
				<button
					className="joke-button"
					onClick={getJokes}
				>
					Get a Joke
				</button>
			</div>
			<ul className="joke-list">
				{jokes.map((joke, index) => (
					<li
						key={index}
						style={{ color: '#FF7F50', fontSize: '1rem', fontWeight: 'bold' }}
					>
						<button
							className="like-button"
							onClick={() => incrementLike(index)}
						>
							👍 {likes[index]}
						</button>
						<button
							className="dislike-button"
							onClick={() => decrementLike(index)}
						>
							👎
						</button>
						{joke}
					</li>
				))}
			</ul>
		</div>
	);
};

export default JokesContainer;
