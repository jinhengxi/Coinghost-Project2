import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import ContorlBox from '../components/ControlBox';

const Home = () => {
	const [playing, setPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [showControlBox, setShowControlBox] = useState(false);
	const [fullScreen, setFullScreen] = useState(false);

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

	const handleFullScreen = () => {
		setFullScreen(!fullScreen);
	};

	videoElement?.addEventListener('keydown', (e) => {
		if (e.code === 'Space') {
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
	});

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
		<Container isFullScreen={fullScreen}>
			<Position onMouseMove={handleControlVisible}>
				<video loop={true} muted={true} ref={ref} playsInline={true}>
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
					handleFullScreen={handleFullScreen}
					isFullScreen={fullScreen}
				/>
			</Position>
		</Container>
	);
};

export default Home;

const Container = styled.main<{ isFullScreen: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;

	video {
		width: ${({ isFullScreen }) => (isFullScreen && '100vw')};
		height: ${({ isFullScreen }) => (isFullScreen && '100vh')};
		object-fit: ${({ isFullScreen }) => (isFullScreen && 'cover')};
	}
`;

const Position = styled.div`
	position: relative;
`;
