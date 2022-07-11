import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import ContorlBox from '../components/ControlBox';

const Home = () => {
	const [playing, setPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [showControlBox, setShowControlBox] = useState(false);
	const [fullScreen, setFullScreen] = useState(false);

	const [ad, setAd] = useState(false);
	const [pausedTime, setPausedTime] = useState(0);
	const [src, setSrc] = useState(VideoSrc);

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

	const handleKeyPress = (e: { code: string }) => {
		if (e.code === 'Space') {
			handlePlaying();
		}
		if (e.code === 'ArrowRight' && videoElement) {
			videoElement.currentTime = currentTime + 5;
		}
		if (e.code === 'ArrowLeft' && videoElement) {
			videoElement.currentTime = currentTime - 5;
		}
	};

	const addAd = () => {
		if (videoElement) {
			if (Math.floor(videoElement.currentTime) === 5 && !ad) {
				setPausedTime(videoElement.currentTime);
				videoElement.pause();
				setAd(true);
			}
			if (videoElement?.ended) {
				setSrc(`${VideoSrc}#t=${pausedTime}`);
				videoElement.load();
				videoElement.play();
				// setPausedTime(0)
			}
		}
	};

	useEffect(() => {
		if (ad && videoElement) {
			setSrc(AdVideoSrc);
			videoElement.load();
			videoElement.play();
		}
	}, [ad, videoElement]);

	return (
		<Container isFullScreen={fullScreen}>
			<Position onMouseMove={handleControlVisible}>
				<video
					muted={true}
					ref={ref}
					tabIndex={0}
					onKeyDown={handleKeyPress}
					onTimeUpdate={addAd}
				>
					<source src={src} type="video/mp4" />
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
	width: 100%;

	video {
		width: ${({ isFullScreen }) => (isFullScreen ? '100vw' : '70vw')};
		height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : '70vh')};
		object-fit: ${({ isFullScreen }) => isFullScreen && 'cover'};
		outline: none;
	}
`;

const Position = styled.div`
	position: relative;
`;

const VideoSrc =
	'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const AdVideoSrc =
	'https://ak.picdn.net/shutterstock/videos/1065170830/preview/stock-footage-nature-river-waterfall-forest-sun-morning-magical.webm';
