import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import ContorlBox from '../components/ControlBox';

const Home = () => {
	//재생여부
	const [playing, setPlaying] = useState(false);
	//현재 동영상 재생 시간
	const [currentTime, setCurrentTime] = useState(0);
	//컨트롤박스 on/off
	const [showControlBox, setShowControlBox] = useState(false);

	const ref = useRef<HTMLVideoElement>(null);
	const totalTime = (ref && ref.current && ref.current.duration) || 0;
	const startTime = Math.floor(currentTime);
	const videoElement = ref && ref.current;

	const addTimeUpdate = () => {
		const observedVideoElement = ref && ref.current;
		if (observedVideoElement) {
			observedVideoElement.addEventListener('timeupdate', () => {
				setCurrentTime(observedVideoElement.currentTime);
			});
			setPlaying(true);
			observedVideoElement.play();
		}
	};

	useEffect(() => {
		addTimeUpdate();
	}, []);

	const onProgressChange = (percent: number) => {
		if (videoElement) {
			const playingTime = (videoElement.duration / 100) * percent;
			videoElement.currentTime = playingTime;
			setCurrentTime(playingTime);
		}
	};

	const handleControlVisible = () => {
		if (!showControlBox) {
			setShowControlBox(true);
			setTimeout(() => {
				setShowControlBox(false);
			}, 3000);
		}
	};

	const handlePlaying = () => {
		if (playing) {
			setPlaying(false);
			videoElement?.pause();
		} else {
			setPlaying(true);
			videoElement?.play();
		}
	};

	videoElement?.addEventListener('keydown',(e)=>{
		if (e.code === "Space") {
			handlePlaying();
		}
		if (e.code === 'ArrowRight' && videoElement) {
			videoElement.currentTime = currentTime + 5;
			setCurrentTime(currentTime + 5);
		}
		if (e.code === 'ArrowLeft' && videoElement) {
			videoElement.currentTime = currentTime - 5;
			setCurrentTime(currentTime - 5);
		}
	})

	// const handleKeyPress = (e: { code: string }) => {
	// 	if (e.code === "Space") {
	// 		handlePlaying();
	// 	}
	// 	if (e.code === 'ArrowRight' && videoElement) {
	// 		videoElement.currentTime = currentTime + 5;
	// 		setCurrentTime(currentTime + 5);
	// 	}
	// 	if (e.code === 'ArrowLeft' && videoElement) {
	// 		videoElement.currentTime = currentTime - 5;
	// 		setCurrentTime(currentTime - 5);
	// 	}
	// };

	return (
		<Container>
			<Position onMouseMove={handleControlVisible}>
				<video
					loop={true}
					muted={true}
					ref={ref}
					playsInline={true}
				>
					<source
						src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
						type="video/mp4"
					/>
				</video>
				<ContorlBox
					onProgressChange={onProgressChange}
					showControlBox={showControlBox}
					currentTime={currentTime}
					playing={playing}
					startTime={startTime}
					totalTime={totalTime}
					videoElement={videoElement}
					handlePlaying={handlePlaying}
				/>
			</Position>
		</Container>
	);
};

export default Home;

const Container = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Position = styled.div`
	position: relative;
`;
