import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import ContorlBox from '../components/ControlBox';

interface VideoTagProps {
	src: string;
	poster: string;
	type: string;
	muted: boolean;
	autoPlay: boolean;
	playsInline: boolean;
	loop: boolean;
}
const Home = () => {
	const [playVideo, setPlayVideo] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [onControl, setOnControl] = useState(false);

	const ref = useRef<HTMLVideoElement>(null);

	const addTimeUpdate = () => {
		const observedVideoElement = ref && ref.current;
		if (observedVideoElement) {
			observedVideoElement.addEventListener('timeupdate', function () {
				setCurrentTime(observedVideoElement.currentTime);
			});
			// 컴포넌트가 처음 마운트 될 때 동영상 시작 할지 말지 여부
			setPlayVideo(true);
			observedVideoElement.play();
		}
	};

	useEffect(() => {
		addTimeUpdate();
	}, []);

	const handleControlVisible = () => {
		if (!onControl) {
			setOnControl(true);
			setTimeout(() => {
				setOnControl(false);
			}, 3000);
		}
	};

	return (
		<Container>
      <Position>
			<video
				loop={true}
				muted={true}
				ref={ref}
				playsInline={true}
        onMouseMove={handleControlVisible}
				// controls
			>
				<source
					src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
					type="video/mp4"
				/>
			</video>
			<ContorlBox onControl={onControl} currentTime={currentTime} playVideo={playVideo}/>
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
`