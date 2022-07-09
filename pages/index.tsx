import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import ContorlBox from '../components/ControlBox';

const Home = () => {
	const [playing, setPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [showControlBox, setShowControlBox] = useState(false);
	const [fullScreen, setFullScreen] = useState(false);
	const [VideoSrc, setVideoSrc] = useState('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')

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


	//기존 영상 멈추고 현재 플레이 시간 저장 / 새로운 영상 로드, 재생 / 끝난 거 확인 / 시간 넣어 다시 재생
	// setTimeout(()=>{
	// 	if(videoElement){
	// 		setVideoSrc('https://ak.picdn.net/shutterstock/videos/1065170830/preview/stock-footage-nature-river-waterfall-forest-sun-morning-magical.webm')
	// 		videoElement.load()
	// 		videoElement.play()
	// 	}
	// },10000)

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

	const changeVideo = ()=>{
		
	}

	return (
		<Container isFullScreen={fullScreen}>
			<Position onMouseMove={handleControlVisible}>
				<video
					loop={true}
					muted={true}
					ref={ref}
					playsInline={true}
					tabIndex={0}
					onKeyDown={handleKeyPress}
				>
					<source
						src={VideoSrc}
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
		width: ${({ isFullScreen }) => isFullScreen && '100vw'};
		height: ${({ isFullScreen }) => isFullScreen && '100vh'};
		object-fit: ${({ isFullScreen }) => isFullScreen && 'cover'};
		outline: none;
	}
`;

const Position = styled.div`
	position: relative;
`;
